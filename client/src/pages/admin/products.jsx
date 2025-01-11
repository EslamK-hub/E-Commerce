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
import { Fragment, useState } from "react";

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

    function onSubmit() {}
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
                    <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}></ProductImageUpload>
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
