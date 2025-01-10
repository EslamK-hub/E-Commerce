import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

export default function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}></AdminSidebar>
            <div className="flex flex-1 flex-col">
                <AdminHeader setOpen={setOpenSidebar}></AdminHeader>
                <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
