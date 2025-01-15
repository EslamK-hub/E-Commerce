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
    deleteProduct,
    getAllProducts,
    updateProduct,
} from "@/store/features/admin/productsSlice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin/product-tile";

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
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function resetForm() {
        setImageFile(null);
        setFormData(initialState);
        setUploadedImageUrl("");
        setCurrentEditedId(null);
    }

    function onSubmit(e) {
        e.preventDefault();

        if (!uploadedImageUrl && !formData.image) {
            toast({ title: "Please upload an image.", variant: "destructive" });
            return;
        }

        const updatedFormData = {
            ...formData,
            image: uploadedImageUrl || formData.image,
        };

        currentEditedId !== null
            ? dispatch(
                  updateProduct({
                      id: currentEditedId,
                      formData: updatedFormData,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(getAllProducts());
                      resetForm();
                      toast({ title: "Product updated successfully" });
                  }
              })
            : dispatch(
                  addProduct({
                      ...updatedFormData,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(getAllProducts());
                      resetForm();
                      toast({ title: "Product added successfully" });
                  }
              });
    }

    function handleDelete(getCurrentProductId) {
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllProducts());
                toast({ title: "Product deleted successfully" });
            }
        });
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button
                    onClick={() => {
                        resetForm();
                        setOpenCreateProductDialog(true);
                    }}
                >
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                          <AdminProductTile
                              key={productItem._id}
                              setFormData={setFormData}
                              setOpenCreateProductDialog={
                                  setOpenCreateProductDialog
                              }
                              setCurrentEditedId={setCurrentEditedId}
                              product={productItem}
                              handleDelete={handleDelete}
                          ></AdminProductTile>
                      ))
                    : null}
            </div>
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={(isOpen) => {
                    setOpenCreateProductDialog(isOpen);
                    if (!isOpen) {
                        resetForm();
                    } else if (currentEditedId === null) {
                        resetForm();
                    }
                }}
            >
                <SheetContent
                    aria-describedby={undefined}
                    side="right"
                    className="overflow-auto"
                >
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null
                                ? "Edit Product"
                                : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl || formData.image}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                        setFormData={setFormData}
                    />
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={
                                currentEditedId !== null ? "Edit" : "Add"
                            }
                            isBtnDisabled={!isFormValid()}
                        ></CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}
