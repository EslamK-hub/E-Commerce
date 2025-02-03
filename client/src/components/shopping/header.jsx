import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout } from "@/store/features/authSlice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { getCartItems } from "@/store/features/shop/cartSlice";
import { Label } from "../ui/label";

export default function ShoppingHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <House className="h-6 w-6" />
                    <span className="font-bold">Sahilli</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-full max-w-xs"
                        aria-describedby={undefined}
                    >
                        <SheetTitle>
                            <Link
                                to="/shop/home"
                                className="flex items-center gap-2"
                            >
                                <House className="h-6 w-6" />
                                <span className="font-bold">Sahilli</span>
                            </Link>
                        </SheetTitle>
                        <MenuItems></MenuItems>
                        <HeaderRightContent></HeaderRightContent>
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems></MenuItems>
                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent></HeaderRightContent>
                </div>
            </div>
        </header>
    );
}

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter =
            getCurrentMenuItem.id !== "home" &&
            getCurrentMenuItem.id !== "products"
                ? { category: [getCurrentMenuItem.id] }
                : null;
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        location.pathname.includes("listing") && currentFilter !== null
            ? setSearchParams(
                  new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
              )
            : navigate(getCurrentMenuItem.path);
    }
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row mt-8 lg:mt-0">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                    onClick={() => handleNavigate(menuItem)}
                    className="text-sm font-medium cursor-pointer"
                    key={menuItem.id}
                >
                    {menuItem.label}
                </Label>
            ))}
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    useEffect(() => {
        dispatch(getCartItems(user?.id));
    }, [dispatch]);
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet
                open={openCartSheet}
                onOpenChange={() => setOpenCartSheet(false)}
            >
                <Button
                    onClick={() => setOpenCartSheet(true)}
                    variant="outline"
                    size="icon"
                >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">User cart</span>
                </Button>
                <UserCartWrapper
                    setOpenCartSheet={setOpenCartSheet}
                    cartItems={
                        cartItems &&
                        cartItems.items &&
                        cartItems.items.length > 0
                            ? cartItems.items
                            : []
                    }
                ></UserCartWrapper>
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>
                        Logged in as {user?.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                        <UserCog className="mr-2 h-4 w-4"></UserCog>
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"></LogOut>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
