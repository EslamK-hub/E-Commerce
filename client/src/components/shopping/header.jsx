import { LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
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
    const [scroll, setScroll] = useState(0);

    window.addEventListener("scroll", () => {
        setScroll(window.scrollY);
    });

    return (
        <header
            className={`${
                scroll > 0 ? "bg-white shadow-md" : null
            } fixed top-0 z-40 w-full transition-all duration-300`}
        >
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="w-[80px]" />
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
                                className="flex items-center "
                            >
                                <img
                                    src="/logo.svg"
                                    alt="Logo"
                                    className="w-[80px]"
                                />
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
    const setSearchParams = useSearchParams()[1];
    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter =
            getCurrentMenuItem.id !== "home" &&
            getCurrentMenuItem.id !== "products" &&
            getCurrentMenuItem.id !== "search"
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
                    className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
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
    }, [dispatch, user?.id]);
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet
                open={openCartSheet}
                onOpenChange={() => setOpenCartSheet(false)}
            >
                <div className="relative cursor-pointer">
                    <ShoppingCart
                        className="h-6 w-6 text-black"
                        onClick={() => setOpenCartSheet(true)}
                    />
                    <span className="absolute top-[-9px] right-[-7px] text-[12px] font-semibold bg-primary w-5 h-5 text-center rounded-full text-white flex items-center justify-center">
                        {cartItems?.items?.length || 0}
                    </span>
                    <span className="sr-only">User cart</span>
                </div>
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
