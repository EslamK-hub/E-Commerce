import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

UserCartWrapper.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.string,
            title: PropTypes.string,
            price: PropTypes.number,
            salePrice: PropTypes.number,
            image: PropTypes.string,
            quantity: PropTypes.number,
        })
    ).isRequired,
    setOpenCartSheet: PropTypes.func
};

export default function UserCartWrapper({ cartItems, setOpenCartSheet }) {
    const navigate = useNavigate();

    const totalCartAmount =
        cartItems && cartItems.length > 0
            ? cartItems.reduce(
                  (sum, currentItem) =>
                      sum +
                      (currentItem?.salePrice > 0
                          ? currentItem?.salePrice
                          : currentItem?.price) *
                          currentItem?.quantity,
                  0
              )
            : 0;
    return (
        <SheetContent aria-describedby={undefined} className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {cartItems && cartItems.length > 0
                    ? cartItems.map((item) => (
                          <UserCartItemsContent
                              key={item.productId}
                              cartItem={item}
                          ></UserCartItemsContent>
                      ))
                    : null}
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={() => {
                navigate("/shop/checkout");
                setOpenCartSheet(false);
            }} className="w-full mt-6">Checkout</Button>
        </SheetContent>
    );
}
