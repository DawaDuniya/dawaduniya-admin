"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumn = {
  id: string;
  name: string;
  price: string;
  category:string;
  isArchived: boolean;
  isFeatured:boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand Name",
  },
  {
    accessorKey: "subtitle",
    header: "Compoition",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: 'price',
    header:'Price',
  },
  
  {
    accessorKey:'category',
    header: 'Category'
  },
  {
    accessorKey:'isArchived',
    header: 'Archived'
  },
  // {
  //   accessorKey:'color',
  //   header: 'Color',
  //   cell: ({row})=>(
  //     <div className="flex items-center gap-x-2">
  //       {row.original.color}
  //       <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}/>
  //     </div>
  //   )
  // },
  {
    accessorKey:'isFeatured',
    header: 'Featured'
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id:"action",
    cell:({row})=><CellAction data={row.original}/>
  }
]
