import {
    BadgeCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import PropTypes from "prop-types";

AdminSidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    aria-describedby={undefined}
                    side="left"
                    className="w-64"
                >
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5">
                                <ChartNoAxesCombined size={30} />
                                <span className="text-2xl font-extrabold">
                                    Admin Panel
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <ChartNoAxesCombined size={30} />
                    <span className="text-2xl font-extrabold">Admin Panel</span>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard size={24} />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket size={24} />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheck size={24} />,
    },
];

MenuItems.propTypes = {
    setOpen: PropTypes.func.isRequired,
};

function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}
