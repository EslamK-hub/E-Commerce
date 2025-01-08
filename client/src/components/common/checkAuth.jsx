import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    console.log("Current Path:", location.pathname);
    console.log("User Role:", user?.role);

    // أثناء التحميل أو إذا كانت البيانات غير مكتملة
    if (!isAuthenticated && !user) {
        return <div>Loading...</div>; // أو عرض Skeleton
    }

    // التحقق إذا لم يكن المستخدم مسجلاً دخوله
    if (
        !isAuthenticated &&
        !(
            location.pathname.startsWith("/auth/login") ||
            location.pathname.startsWith("/auth/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    // التحقق إذا كان المستخدم مسجلاً ويحاول الوصول إلى صفحات تسجيل الدخول
    if (
        isAuthenticated &&
        (location.pathname.startsWith("/auth/login") ||
            location.pathname.startsWith("/auth/register"))
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }

    // منع الوصول إلى صفحات الإدارة للمستخدمين غير المسؤولين
    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.startsWith("/admin")
    ) {
        return <Navigate to="/unauth-page" />;
    }

    // منع الوصول إلى صفحات التسوق للمسؤولين
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.startsWith("/shop")
    ) {
        return <Navigate to="/admin/dashboard" />;
    }

    // السماح بالوصول إذا كانت الشروط مستوفاة
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
