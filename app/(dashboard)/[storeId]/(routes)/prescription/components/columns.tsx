"use client"

import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PrescriptionColumn = {
  id: string;
  name: string;
  phoneNumber: string;
  imageURL: string;
  createdAt:string;
}

export const columns: ColumnDef<PrescriptionColumn>[] = [
  {
    accessorKey:"name",
    header: "Customer Name"
  },
  
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "imageURL",
    header: "Prescription",
    cell:(row)=>{
        return (
          <a href="${row.imageURL}" target="_blank" rel="noopener noreferrer">View Prescription</a>
        );
    }
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
