"use client"
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react/";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {  PrescriptionColumn, columns } from "./columns";



interface OrderClientProps{
    data: PrescriptionColumn[];
}

export const OrderClient :React.FC<OrderClientProps>= ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return ( <>
    
        <Heading
        title={`Prescriptions (${data.length})`}
        description="Manage prescription for your store"
        />
    <Separator/>

    <DataTable searchKey="name" columns={columns} data={data}/>
    </> );
}
 