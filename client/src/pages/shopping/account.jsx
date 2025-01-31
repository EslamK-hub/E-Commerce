import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImage from "../../assets/account.jpg";
import ShoppingOrders from "@/components/shopping/orders";
import Address from "@/components/shopping/address";

export default function ShoppingAccount() {
    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={accImage}
                    alt="Image"
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                <div className=" flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders"><ShoppingOrders></ShoppingOrders></TabsContent>
                        <TabsContent value="address"><Address></Address></TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
