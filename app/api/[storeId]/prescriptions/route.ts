import prismadb from "@/lib/prismadb";
import {NextResponse } from "next/server";

export async function POST(req:Request,
    {params}:{params:{storeId: string}}
    ) {
    try {
        const body = await req.json()
        const { name, phoneNumber, imageURL, storeId } = body;

      const prescription = await prismadb.prescription.create({
        data: {
          name,
          phoneNumber,
          imageURL,
          store: { connect: { id: storeId } }, // Connect the prescription to the store
        },
      });

      return  NextResponse.json(prescription);
    } catch (error) {
      console.error("Error while creating prescription:", error);
      return new NextResponse("Internal Server Error", {status:500})
    }
  }

