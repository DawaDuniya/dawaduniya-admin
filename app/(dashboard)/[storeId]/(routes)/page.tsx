import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStocksCount } from "@/actions/get-stocks-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCardIcon, IndianRupee, Package } from "lucide-react/";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  const totalRevenue =await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStocksCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId)
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-16">
        <Heading title="Dashboard" description="Overview of Dawa Duniya"/>
        <Separator/>
        <div className="grid gap-4 grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <IndianRupee className="h-6 w-6 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatter.format(totalRevenue)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales
                </CardTitle>
                <CreditCardIcon className="h-6 w-6 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +{salesCount}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-6 w-6 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stockCount}
                    </div>
                </CardContent>
            </Card>

        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
            <CardContent className="pl-2">
              <Overview data={graphRevenue}/>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
