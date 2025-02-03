import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog";
import PropTypes from "prop-types";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addCart, getCartItems } from "@/store/features/shop/cartSlice";
import { setProductDetails } from "@/store/features/shop/productsSlice";

ProdDetailsDialog.propTypes = {
    productDetails: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string,
        brand: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        totalStock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default function ProdDetailsDialog({ open, setOpen, productDetails }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { toast } = useToast();
    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let geCartItems = cartItems.items || [];

        if (geCartItems.length) {
            const indexOfCurrentItem = geCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = geCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });
                    return;
                }
            }
        }
        dispatch(
            addCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getCartItems(user?.id));
                toast({
                    title: "Product is added to cart",
                });
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div>
                    <div>
                        <DialogTitle className="text-3xl font-extrabold">
                            {productDetails?.title || "Product Details"}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description ||
                                "No description available."}
                        </DialogDescription>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${
                                productDetails?.salePrice > 0
                                    ? "line-through"
                                    : ""
                            }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                            <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        {productDetails?.totalStock === 0 ? (
                            <Button
                                className="w-full opacity-60 select-none"
                                disabled
                            >
                                Out of Stock
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                onClick={() =>
                                    handleAddToCart(
                                        productDetails?._id,
                                        productDetails?.totalStock
                                    )
                                }
                            >
                                Add To Cart
                            </Button>
                        )}
                    </div>
                    <Separator></Separator>
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>E</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Eslam</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                        <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    </div>
                                    <p className="text-muted-foreground">
                                        This is an awesome product
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <Input placeholder="Write a review..."></Input>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
