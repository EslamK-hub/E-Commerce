import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
    Airplay,
    BabyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CloudLightning,
    Heater,
    Images,
    Shirt,
    ShirtIcon,
    ShoppingBasket,
    UmbrellaIcon,
    WashingMachine,
    WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllFilteredProducts,
    getProductDetails,
} from "@/store/features/shop/productsSlice";
import ShoppingProductTile from "@/components/shopping/product-tile";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { useNavigate } from "react-router-dom";
import { addCart, getCartItems } from "@/store/features/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const categoriesWidthIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
];

export default function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts
    );
    const { user } = useSelector((state) => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const slides = [bannerOne, bannerTwo, bannerThree];
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentSlide((nextSlide) => (nextSlide + 1) % slides.length);
    };

    useEffect(() => {
        dispatch(
            getAllFilteredProducts({
                filterParams: {},
                sortParams: "price-lowtohigh",
            })
        );
    }, [dispatch]);

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section]: [getCurrentItem.id],
        };
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate("/shop/listing");
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(getProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    function handleAddToCart(getCurrentProductId) {
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
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        alt={index}
                        key={index}
                        className={`${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        loading="lazy"
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronLeftIcon className="w-4 h-4"></ChevronLeftIcon>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
                </Button>
            </div>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Shop By Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categoriesWidthIcon.map((categoryItem) => (
                            <Card
                                key={categoryItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        categoryItem,
                                        "category"
                                    )
                                }
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                                    <span className="font-bold">
                                        {categoryItem.label}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Shop By Brand
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {brandsWithIcon.map((brandItem) => (
                            <Card
                                key={brandItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        brandItem,
                                        "brand"
                                    )
                                }
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                                    <span className="font-bold">
                                        {brandItem.label}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Feature Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList && productList.length > 0
                            ? productList.map((productItem) => (
                                  <ShoppingProductTile
                                      key={productItem?._id}
                                      product={productItem}
                                      handleGetProductDetails={
                                          handleGetProductDetails
                                      }
                                      handleAddToCart={handleAddToCart}
                                  />
                              ))
                            : null}
                    </div>
                </div>
            </section>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            ></ProductDetailsDialog>
        </div>
    );
}
