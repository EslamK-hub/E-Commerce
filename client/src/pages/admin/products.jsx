import ProductImageUpload from "@/components/admin/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    getAllProducts,
} from "@/store/features/admin/productsSlice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

export default function AdminProducts() {
    const [openCreateProductDialog, setOpenCreateProductDialog] =
        useState(false);
    const [formData, setFormData] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(
            addProduct({
                ...formData,
                image: uploadedImageUrl,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllProducts());
                setOpenCreateProductDialog(false);
                setImageFile(null);
                setFormData(initialState);
                toast({
                    title: "Product added successfully",
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={() => setOpenCreateProductDialog(false)}
            >
                <SheetContent
                    aria-describedby={undefined}
                    side="right"
                    className="overflow-auto"
                >
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                    ></ProductImageUpload>
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                        ></CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}
