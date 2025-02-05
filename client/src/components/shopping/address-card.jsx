import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";

AddressCard.propTypes = {
    addressInfo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        pinCode: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
    }),
    handleDeleteAddress: PropTypes.func,
    handleUpdateAddress: PropTypes.func,
    setCurrentSelectedAddress: PropTypes.func,
    selectedId: PropTypes.object,
};

export default function AddressCard({
    addressInfo,
    handleDeleteAddress,
    handleUpdateAddress,
    setCurrentSelectedAddress,
    selectedId,
}) {
    return (
        <Card
            onClick={
                setCurrentSelectedAddress
                    ? () => setCurrentSelectedAddress(addressInfo)
                    : null
            }
            className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id ? "border-red-900 border-[4px]" : "border-black"}`}
        >
            <CardContent className={`${selectedId === addressInfo?._id ? "border-black" : ""} grid p-4 gap-4`}>
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>PinCode : {addressInfo?.pinCode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="grid grid-cols-0 md:grid-cols-2 p-3 gap-1">
                <Button
                    className="w-full"
                    onClick={() => handleUpdateAddress(addressInfo)}
                >
                    Update
                </Button>
                <Button
                    className="w-full"
                    onClick={() => handleDeleteAddress(addressInfo)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
