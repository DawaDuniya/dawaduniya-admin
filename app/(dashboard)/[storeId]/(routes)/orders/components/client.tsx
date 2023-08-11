"use client"
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react/";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import {  OrderColumn, columns } from "./columns";



interface OrderClientProps{
    data: OrderColumn[];
}

export const OrderClient :React.FC<OrderClientProps>= ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return ( <>
    
        <Heading
        title={`Billboard (${data.length})`}
        description="Manage orders for your store"
        />
    <Separator/>

    <DataTable searchKey="label" columns={columns} data={data}/>
    </> );
}
 