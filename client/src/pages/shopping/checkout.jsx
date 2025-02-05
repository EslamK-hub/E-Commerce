import Address from "@/components/shopping/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/features/shop/orderSlice";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const { approvalURL } = useSelector((state) => state.shopOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const totalCartAmount =
        cartItems.items && cartItems.items.length > 0
            ? cartItems.items.reduce(
                  (sum, currentItem) =>
                      sum +
                      (currentItem?.salePrice > 0
                          ? currentItem?.salePrice
                          : currentItem?.price) *
                          currentItem?.quantity,
                  0
              )
            : 0;

    function handleInitiatePaypalPayment() {
        if (cartItems.length === 0) {
            toast({
                title: "Your cart is empty. Please add items to proceed.",
                variant: "destructive",
            });
            return;
        }

        if (currentSelectedAddress === null) {
            toast({
                title: "Please select one address to proceed.",
                variant: "destructive",
            });
            return;
        }

        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((singleCartItem) => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price:
                    singleCartItem?.salePrice > 0
                        ? singleCartItem?.salePrice
                        : singleCartItem?.price,
                quantity: singleCartItem?.quantity,
            })),
            addressInfo: {
                addressId: currentSelectedAddress?._id,
                address: currentSelectedAddress?.address,
                city: currentSelectedAddress?.city,
                pinCode: currentSelectedAddress?.pinCode,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes,
            },
            orderStatus: "pending",
            paymentMethod: "paypal",
            paymentStatus: "pending",
            totalAmount: totalCartAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: "",
            payerId: "",
        };

        dispatch(createOrder(orderData)).then((data) => {
            if (data?.payload?.success) {
                setIsPaymentStart(true);
            } else {
                setIsPaymentStart(false);
            }
        });
    }

    if (approvalURL) {
        window.location.href = approvalURL;
    }
    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={img}
                    alt="Image"
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    selectedId={currentSelectedAddress}
                ></Address>
                <div className="flex flex-col gap-4">
                    {cartItems && cartItems.items && cartItems.items.length > 0
                        ? cartItems.items.map((item) => (
                              <UserCartItemsContent
                                  key={item.productId}
                                  cartItem={item}
                              ></UserCartItemsContent>
                          ))
                        : null}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">
                                ${totalCartAmount}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button
                            onClick={handleInitiatePaypalPayment}
                            className="w-full"
                        >
                            {isPaymentStart
                                ? "Processing Paypal Payment..."
                                : "Checkout with Paypal"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
