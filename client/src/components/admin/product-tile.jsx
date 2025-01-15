import PropTypes from "prop-types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

AdminProductTile.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        salePrice: PropTypes.number,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    setOpenCreateProductDialog: PropTypes.func.isRequired,
    setCurrentEditedId: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductDialog,
    setCurrentEditedId,
    handleDelete,
}) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${
                                product?.salePrice > 0 ? "line-through" : ""
                            } text-lg font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold">
                                ${product?.salePrice}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button
                        onClick={() => {
                            setFormData({
                                ...product,
                                image: product.image || "",
                            });
                            setOpenCreateProductDialog(true);
                            setCurrentEditedId(product._id);
                        }}
                    >
                        Edit
                    </Button>

                    <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    );
}
