import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

export default function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <ShoppingHeader></ShoppingHeader>
            <main className="flex flex-1 w-full">
                <Outlet></Outlet>
            </main>
        </div>
    );
}
