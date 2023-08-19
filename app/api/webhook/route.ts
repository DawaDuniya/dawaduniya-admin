import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { log } from "console";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    const customer_name = session?.customer_details?.name;
    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents.filter((c) => c !== null).join(', ');
    log(event.type);

    if (event.type === 'checkout.session.completed') {
        const order = await prismadb.order.update({
            where: {
                id: session?.metadata?.orderId
            },
            data: {
                name:customer_name as string,
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            },
            include: {
                orderItems: true,
            }
        });


        for (const orderItem of order.orderItems) {
            const orderedQuantity = order.orderedQuantity; // Use the correct property
            const product = await prismadb.product.findUnique({
                where: {
                    id: orderItem.productId,
                },
            });

            if (product) {
                const newQuantity = Math.max(product.quantity - orderedQuantity, 0);
                await prismadb.product.update({
                    where: {
                        id: orderItem.productId,
                    },
                    data: {
                        quantity: newQuantity,
                        isArchived: newQuantity === 0 || product.isArchived,
                    }
                });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
