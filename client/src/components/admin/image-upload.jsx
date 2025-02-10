import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

ProductImageUpload.propTypes = {
    imageFile: PropTypes.object,
    setImageFile: PropTypes.func.isRequired,
    uploadedImageUrl: PropTypes.string,
    setUploadedImageUrl: PropTypes.func.isRequired,
    imageLoadingState: PropTypes.bool,
    setImageLoadingState: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
    isCustomStyling: PropTypes.bool,
};

export default function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
    setFormData,
    isCustomStyling = false,
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
            setUploadedImageUrl(URL.createObjectURL(selectedFile));
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile);
            setUploadedImageUrl(URL.createObjectURL(droppedFile));
        }
    }

    function handleRemoveImage() {
        setImageFile(null);
        setUploadedImageUrl("");
        setFormData((prevData) => ({
            ...prevData,
            image: null,
        }));
        if (inputRef.current) {
            inputRef.current.value = null;
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/products/upload-image`,
            data
        );
        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
            <Label className="text-lg font-semibold mb-2 block">
                Upload Image
            </Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-lg p-4"
            >
                <Input
                    id="image-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />
                {uploadedImageUrl ? (
                    imageLoadingState ? (
                        <Skeleton className="h-10 bg-gray-100"></Skeleton>
                    ) : (
                        <div className="relative">
                            <img
                                src={uploadedImageUrl}
                                alt="Uploaded"
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                                onClick={handleRemoveImage}
                            >
                                <XIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    )
                ) : (
                    <Label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center h-32 cursor-pointer"
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & Drop or click to upload image</span>
                    </Label>
                )}
            </div>
        </div>
    );
}
