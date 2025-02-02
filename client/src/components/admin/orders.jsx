import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrdersAllUsers,
    getOrderDetailsForAdmin,
    resetOrderDetails,
} from "@/store/features/admin/orderSlice";
import { Badge } from "../ui/badge";

export default function AdminOrdersView() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useSelector(
        (state) => state.adminOrders
    );
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    console.log(orderDetails);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList && orderList.length > 0
                            ? orderList.map((orderItem) => (
                                  <TableRow key={orderItem?._id}>
                                      <TableCell>{orderItem?._id}</TableCell>
                                      <TableCell>
                                          {orderItem?.orderDate.split("T")[0]}
                                      </TableCell>
                                      <TableCell>
                                          <Badge
                                              className={`py-1 px-3 ${
                                                  orderItem?.orderStatus ===
                                                  "confirmed"
                                                      ? "bg-green-500"
                                                      : orderItem?.orderStatus ===
                                                        "rejected"
                                                      ? "bg-red-500"
                                                      : "bg-black"
                                              }`}
                                          >
                                              {orderItem?.orderStatus}
                                          </Badge>
                                      </TableCell>
                                      <TableCell>
                                          ${orderItem?.totalAmount}
                                      </TableCell>
                                      <TableCell>
                                          <Dialog
                                              open={openDetailsDialog}
                                              onOpenChange={() =>
                                                  setOpenDetailsDialog(false)
                                              }
                                              dispatch={resetOrderDetails()}
                                          >
                                              <Button
                                                  onClick={() =>
                                                      handleFetchOrderDetails(
                                                          orderItem?._id
                                                      )
                                                  }
                                              >
                                                  View Details
                                              </Button>
                                              <AdminOrderDetailsView
                                                  orderDetails={orderDetails}
                                              ></AdminOrderDetailsView>
                                          </Dialog>
                                      </TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
