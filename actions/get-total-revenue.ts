import prismadb from "@/lib/prismadb"

export const getTotalRevenue= async (storeId: string)=>{
    const paidOrders = await prismadb.book.findMany({
        where:{
            storeId,
            isPaid: true,
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })
    const totalRevenue = paidOrders.reduce((total,order)=>{
        const orderTotal = order.orderItems.reduce((orderSum, item)=>{
            return orderSum +order.orderedQuantity * item.product.price.toNumber()
        },0)
        return total + orderTotal;
    },0);

    return totalRevenue;
}