import ShoppingProductTile from "@/components/shopping/product-tile";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import {
    getSearchResults,
    resetSearchResults,
} from "@/store/features/shop/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addCart, getCartItems } from "@/store/features/shop/cartSlice";
import { getProductDetails } from "@/store/features/shop/productsSlice";
import ProdDetailsDialog from "@/components/shopping/product-details";

export default function SearchProducts() {
    const searchId = useId();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { searchResults } = useSelector((state) => state.shopSearch);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { productDetails } = useSelector((state) => state.shopProducts);
    const { toast } = useToast();

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

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

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(getProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);
    return (
        <div className="container mx-auto md:px-6 px-4 py-8 mt-12">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input
                        value={keyword}
                        name={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search..."
                    ></Input>
                </div>
            </div>
            {!searchResults.length ? (
                <h1 className="text-5xl font-extrabold">No result found!</h1>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {searchResults.map((item) => (
                    <ShoppingProductTile
                        key={searchId}
                        product={item}
                        handleAddToCart={handleAddToCart}
                        handleGetProductDetails={handleGetProductDetails}
                    ></ShoppingProductTile>
                ))}
            </div>
            <ProdDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}
