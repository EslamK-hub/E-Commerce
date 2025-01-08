import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import ShoppingLayout from "./components/shopping/layout";
import ShoppingHome from "./pages/shopping/home";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingAccount from "./pages/shopping/account";
import ShoppingListing from "./pages/shopping/listing";
import CheckAuth from "./components/common/checkAuth";
import NotFound from "./pages/not-found";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/features/authSlice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
    const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
    );
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);
  
    if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

    return (
        <div className="flex flex-col overflow-hidden bg-white">
            <Routes>
                <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
                    <Route path="login" element={<AuthLogin />} />
                    <Route path="register" element={<AuthRegister />} />
                </Route>
                <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                </Route>
                <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="checkout" element={<ShoppingCheckout />} />
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route path="account" element={<ShoppingListing />} />
                </Route>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/unauth-page" element={<UnAuthPage/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
