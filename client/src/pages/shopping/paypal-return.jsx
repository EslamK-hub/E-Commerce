import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/features/shop/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PaypalReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(
                sessionStorage.getItem("currentOrderId")
            );
            dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId")
                    window.location.href = '/shop/payment-success'
                }
            })
        }
    }, [paymentId, payerId, dispatch]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Process Payment...Please Wait!</CardTitle>
            </CardHeader>
        </Card>
    );
}
