"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  name: string;
  phone: string;
  address: string;
  isPaid: boolean;
  quantity: number;
  totalPrice: string;
  products: string;
  createdAt:string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey:"name",
    header: "Customer Name"
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
