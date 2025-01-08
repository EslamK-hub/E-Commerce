import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <ChartNoAxesCombined />
                    <h1>asasasasas</h1>
                </div>
            </aside>
        </Fragment>
    );
}
