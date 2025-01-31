import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

ShoppingOrderDetailsView.propTypes = {
    orderDetails: PropTypes.shape({
        _id: PropTypes.string,
        orderDate: PropTypes.string,
        totalAmount: PropTypes.number,
        orderStatus: PropTypes.string,
        paymentMethod: PropTypes.string,
        paymentStatus: PropTypes.string,
        cartItems: PropTypes.arrayOf(
            PropTypes.shape({
                productId: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
            })
        ),
        addressInfo: PropTypes.shape({
            address: PropTypes.string,
            city: PropTypes.string,
            pinCode: PropTypes.string,
            phone: PropTypes.string,
            notes: PropTypes.string,
        }),
    }),
};

export default function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector((state) => state.auth);
    console.log(orderDetails);
    return (
        <DialogContent
            className="sm:max-w-[600px]"
            aria-describedby={undefined}
        >
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>
                            <Badge
                                className={`py-1 px-3 ${
                                    orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : "bg-black"
                                }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator></Separator>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <DialogTitle>Order Details</DialogTitle>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems &&
                            orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                      <li
                                          key={item?._id}
                                          className="flex items-center justify-between"
                                      >
                                          <div>
                                              <span>{item?.title} </span>
                                              <span>({item?.quantity})</span>
                                          </div>
                                          <span>${item?.price}</span>
                                      </li>
                                  ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.username}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pinCode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}
