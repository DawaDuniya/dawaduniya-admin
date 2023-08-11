import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import {format} from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductsColumn } from "./components/columns";


const ProductsPage = async({
    params
}:{
    params:{storeId:string}
}) => {
    const products= await prismadb.product.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            category:true,
        }
        ,
        orderBy:{
            createdAt:'desc'
        }
    })

    const formattedProducts: ProductsColumn[] = products.map((item)=>({
        id: item.id,
        name: item.name,
        description: item.description,
        price: formatter.format(item.price.toNumber()),
        // size: item.size.value,
        category: item.category.name,
        isArchived:item.isArchived,
        // color: item.color.value,
        isFeatured: item.isFeatured ,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return ( 
        <div className="flex-col ">
            <div className="flex-1 space-x-4p-8 p-6">
                <ProductClient data={formattedProducts}/>
            </div>
        </div>
    );
}
 
export default ProductsPage;