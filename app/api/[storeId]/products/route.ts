import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
name, 
description,
price, 
categoryId,
images,
isFeatured,
isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if ((!images)||(!images.length)) {
      return new NextResponse("Images are Required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is Required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        isFeatured,
        isArchived,
        images:{
          createMany:{
            data:[
              ...images.map((image: {url:string})=>image)
            ]
          }
        },
        storeId: params.storeId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("categoryId")||undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store id is Required", { status: 400 });
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isFeatured: isFeatured? true : undefined,
        isArchived: false,
      },
      include:{
        images:true,
        category:true,
      },
      orderBy:{
        createdAt: 'desc',
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
