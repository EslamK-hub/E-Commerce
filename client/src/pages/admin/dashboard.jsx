import ProductImageUpload from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import {
    addFeatureImage,
    getFeatureImages,
} from "@/store/features/common/featureSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state) => state.commonFeature);

    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                isCustomStyling={true}
            />
            <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
                Upload
            </Button>
            <div className="flex flex-col gap-4 mt-5">
                {featureImageList && featureImageList.length > 0
                    ? featureImageList.map((featureImageItem) => (
                          <div key={featureImageItem?._id} className="relative">
                              <img
                                  src={featureImageItem?.image}
                                  alt="Image"
                                  className="w-full h-[300px] object-cover rounded-t-lg"
                              />
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
