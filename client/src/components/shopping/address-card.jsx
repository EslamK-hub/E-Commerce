import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";

AddressCard.propTypes = {
    addressInfo: PropTypes.shape({
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        pinCode: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
    }),
    handleDeleteAddress: PropTypes.func,
    handleUpdateAddress: PropTypes.func,
    setCurrentSelectedAddress: PropTypes.func,
};

export default function AddressCard({
    addressInfo,
    handleDeleteAddress,
    handleUpdateAddress,
    setCurrentSelectedAddress,
}) {
    return (
        <Card
            onClick={
                setCurrentSelectedAddress
                    ? () => setCurrentSelectedAddress(addressInfo)
                    : null
            }
        >
            <CardContent className="grid p-4 gap-4">
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
