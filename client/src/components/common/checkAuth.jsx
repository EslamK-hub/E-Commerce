import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop/home" />;
            }
        }
    }

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/auth/login") ||
            location.pathname.includes("/auth/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    if (
        isAuthenticated &&
        (location.pathname.includes("/auth/login") ||
            location.pathname.includes("/auth/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }

    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.includes("/admin")
    ) {
        return <Navigate to="/unauth-page" />;
    }

    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("/shop")
    ) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}

CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string,
        role: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
};
