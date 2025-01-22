import ProductFilter from "@/components/shopping/filter";
import ShoppingProductTile from "@/components/shopping/product-tile";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getAllFilteredProducts, getProductDetails } from "@/store/features/shop/productsSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join("&");
}

export default function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    useEffect(() => {
        if (filters !== null && sort !== null)
            dispatch(
                getAllFilteredProducts({
                    filterParams: filters,
                    sortParams: sort,
                })
            );
    }, [dispatch, sort, filters]);

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {
        let copyFilters = { ...filters };
        const indexOfCurrentSection =
            Object.keys(copyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            copyFilters = {
                ...copyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                copyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexOfCurrentOption === -1)
                copyFilters[getSectionId].push(getCurrentOption);
            else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
        setFilters(copyFilters);
        sessionStorage.setItem("filters", JSON.stringify(copyFilters));
    }

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, []);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(getProductDetails(getCurrentProductId))
    }
    
    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])
    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter
                filters={filters}
                handleFilter={handleFilter}
            ></ProductFilter>
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold mr-2">
                        All Products
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {productList?.length} Products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <ArrowUpDownIcon className="h-4 w-4"></ArrowUpDownIcon>
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[200px]"
                            >
                                <DropdownMenuRadioGroup
                                    value={sort}
                                    onValueChange={handleSort}
                                >
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            key={sortItem.id}
                                            value={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {productList && productList.length > 0
                        ? productList.map((product) => (
                              <ShoppingProductTile
                                  key={product._id}
                                product={product}
                                handleGetProductDetails={handleGetProductDetails}
                              ></ShoppingProductTile>
                          ))
                        : null}
                </div>
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}></ProductDetailsDialog>
        </div>
    );
}
