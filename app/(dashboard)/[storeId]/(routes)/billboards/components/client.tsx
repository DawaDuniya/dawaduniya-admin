"use client"
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react/";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { BillboardColumn, columns } from "./columns";



interface BillboardClientProps{
    data: BillboardColumn[];
}

export const BillboardClient :React.FC<BillboardClientProps>= ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return ( <>
    <div className="flex items-center justify-between">
        <Heading
        title={`Billboard (${data.length})`}
        description="Manage Billboards for your store"
        />
        <Button variant={"outline"} onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-5 w-5"/>
            Add New
        </Button>
    </div>
    <Separator/>

    <DataTable searchKey="label" columns={columns} data={data}/>
    <Heading title="API" description="API calls for Billboard"/>
    <Separator/>
    <ApiList entityName="billboards" entityIdName="billboardId"/>
    </> );
}
 