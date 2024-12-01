import Table from "@/components/Shared/Table";
import { GetOrderByIdResponse } from "@/apis/orders";
import { QueryObserverResult } from "@tanstack/react-query";

type Costs = {
    subTotal: number;
    discount: number;

    shippingFee?: number;
    total: number;
};

type Props = {
    items: GetOrderByIdResponse["items"];
    costs: Costs;
    refetch: () => Promise<QueryObserverResult<GetOrderByIdResponse, Error>>;
};

export default function ItemTable(props: Props) {
    const { items, costs } = props;

    const rows = items.map((item) => {
        const total = item.variant.retailPrice * item.quantity;

        const productAndVariantElement = (
            <div className="flex items-center gap-4">
                <img src={item.product.images[0]} alt={item.product.name} className="size-12 object-cover rounded-md" />
                <div className="flex flex-col">
                    <span className="font-medium">{item.product.name}</span>
                    <div className="text-xs text-gray-500 flex gap-2">{item.variant.id}</div>
                </div>
            </div>
        );

        return {
            _id: `${item.product._id}-${item.variant.id}`,
            data: [
                productAndVariantElement,
                <div className="text-center">{item.quantity}</div>,
                <div className="text-right">
                    {item.variant.retailPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </div>,
                <div className="text-right">
                    {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </div>,
            ],
        };
    });

    const columns = [
        <div className="text-left">Product Name</div>,
        <div className="text-center">Quantity</div>,
        <div className="text-right">Price</div>,
        <div className="text-right">Total</div>,
    ];

    const sizes = ["35%", "10%", "20%", "20%"];

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">Items</h1>
            <div>
                <Table
                    total={items.length}
                    height="h-auto"
                    isPaginated={false}
                    columns={columns}
                    rows={rows}
                    sizes={sizes}
                />
                <div className="mt-8 w-full">
                    <div className="flex gap-4 justify-end text-lg pr-7">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">Subtotal</span>
                            <span className="font-bold">Discount</span>
                            <span className="font-bold">Shipping Fee</span>
                            <br />
                            <span className="font-bold">Total</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">:</span>
                            <span className="font-bold">:</span>
                            <span className="font-bold">:</span>
                            <br />
                            <span className="font-bold">:</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-right">
                                {costs.subTotal.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                            <span className="text-right">
                                {(costs.discount === 0 ? 0 : -costs.discount).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                            <span className="text-right">
                                {(costs.shippingFee ?? 0).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                            <br />
                            <span className="text-right">
                                {costs.total.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
