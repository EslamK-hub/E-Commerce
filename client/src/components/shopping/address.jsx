import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
    addAddress,
    deleteAddress,
    getAllAddress,
    updateAddress,
} from "@/store/features/shop/addressSlice";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./address-card";
import PropTypes from "prop-types";

Address.propTypes = {
    setCurrentSelectedAddress: PropTypes.func,
    selectedId: PropTypes.object,
};

const initialAddressFormData = {
    address: "",
    city: "",
    pinCode: "",
    phone: "",
    notes: "",
};

export default function Address({ setCurrentSelectedAddress, selectedId }) {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentUpdatedId, setCurrentUpdatedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();

    function handleManageAddress(e) {
        e.preventDefault();

        if (addressList.length >= 3 && currentUpdatedId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: "You can only have 3 addresses",
                variant: "destructive",
            });
            return;
        }

        currentUpdatedId !== null
            ? dispatch(
                  updateAddress({
                      userId: user?.id,
                      addressId: currentUpdatedId,
                      formData,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(getAllAddress(user?.id));
                      setFormData(initialAddressFormData);
                      setCurrentUpdatedId(null);
                      toast({ title: "Address updated successfully" });
                  }
              })
            : dispatch(
                  addAddress({
                      ...formData,
                      userId: user?.id,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(getAllAddress(user?.id));
                      setFormData(initialAddressFormData);
                      toast({ title: "Address added successfully" });
                  }
              });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    function handleUpdateAddress(getCurrentAddress) {
        setCurrentUpdatedId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            pinCode: getCurrentAddress?.pinCode,
            phone: getCurrentAddress?.phone,
            notes: getCurrentAddress?.notes,
        });
        toast({ title: "Address deleted successfully" });
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
            deleteAddress({
                userId: user?.id,
                addressId: getCurrentAddress._id,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getAllAddress(user?.id));
            }
        });
    }

    useEffect(() => {
        dispatch(getAllAddress(user?.id));
    }, [dispatch]);

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((addressItem) => (
                          <AddressCard
                              key={addressItem?._id}
                              addressInfo={addressItem}
                              handleDeleteAddress={handleDeleteAddress}
                              handleUpdateAddress={handleUpdateAddress}
                              setFormData={setFormData}
                              setCurrentSelectedAddress={
                                  setCurrentSelectedAddress
                              }
                              selectedId={selectedId}
                          ></AddressCard>
                      ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentUpdatedId !== null
                        ? "Update Address"
                        : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentUpdatedId !== null ? "Update" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                ></CommonForm>
            </CardContent>
        </Card>
    );
}
