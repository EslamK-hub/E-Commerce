import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar></AdminSidebar>
            <div className="flex flex-1 flex-col">
                <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
                    <AdminHeader></AdminHeader>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
}
