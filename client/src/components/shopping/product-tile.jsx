import PropTypes from "prop-types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { filterOptions } from "@/config";

ShoppingProductTile.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        brand: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        totalStock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    handleGetProductDetails: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
};

export default function ShoppingProductTile({
    product,
    handleGetProductDetails,
    handleAddToCart,
}) {
    const categoryLabel =
        filterOptions.category.find((c) => c.id === product?.category)?.label ||
        product?.category;

    const brandLabel =
        filterOptions.brand.find((b) => b.id === product?.brand)?.label ||
        product?.brand;

    return (
        <Card className="w-full max-w-sm max-auto">
            <div
                className="cursor-pointer"
                onClick={() => handleGetProductDetails(product?._id)}
            >
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {product?.totalStock === 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Out of Stock
                        </Badge>
                    ) : product?.totalStock < 10 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            {`Only ${product?.totalStock} items left`}
                        </Badge>
                    ) : product?.salePrice > 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[16px] text-muted-foreground">
                            {categoryLabel}
                        </span>
                        <span className="text-[16px] text-muted-foreground">
                            {brandLabel}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${
                                product?.salePrice > 0 ? "line-through" : ""
                            } text-lg font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-semibold text-primary">
                                ${product?.salePrice}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {product?.totalStock === 0 ? (
                    <Button className="w-full opacity-60 select-none" disabled>
                        Out of Stock
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                        className="w-full"
                    >
                        Add to cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
