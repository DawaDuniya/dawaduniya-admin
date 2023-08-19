import prismadb from "@/lib/prismadb";
import {  OrderClient } from "./components/client";
import { PrescriptionColumn } from "./components/columns";
import {format} from "date-fns";
import { formatter } from "@/lib/utils";


const PrescriptionPage = async({
    params
}:{
    params:{storeId:string}
}) => {
    const prescriptions= await prismadb.prescription.findMany({
        where:{
            storeId:params.storeId
        },
       orderBy:{
            createdAt:'desc'
        }
    })

    const formattedPrescription: PrescriptionColumn[] = prescriptions.map((item)=>({
        id: item.id,
        name: item.name,
        phoneNumber: item.phoneNumber,
        imageURL: item.imageURL,  
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return ( 
        <div className="flex-col ">
            <div className="flex-1 space-x-4p-8 p-6">
                <OrderClient data={formattedPrescription}/>
            </div>
        </div>
    );
}
 
export default PrescriptionPage;