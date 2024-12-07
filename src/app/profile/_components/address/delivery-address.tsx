"use client";

import { Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TAddress } from "@/types";
import { useState } from "react";
import { AddressInput } from "./address-input";

const DeliveryAddress = () => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingAddress, setEditingAddress] = useState<TAddress | null>(null);

    // Example addresses - in a real app, these would come from an API or database
    const addresses: TAddress[] = [
        {
            _id: "1",
            country: "Australia",
            latitude: -37.671811500000004,
            longitude: 144.846079,
            name: "Home",
            place: "Melbourne",
            postcode: "3045",
            region: "Victoria",
            streetAndNumber: "Melbourne Airport (MEL)",
        },
        {
            _id: "2",
            country: "United Kingdom",
            latitude: 53.335612,
            longitude: -2.852171,
            name: "Office",
            place: "Liverpool",
            postcode: "L24 1YD",
            region: "England",
            streetAndNumber: "Liverpool John Lennon Airport (LPL)",
        },
    ];

    return (
        <div className="w-full mt-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Delivery Address
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage your delivery addresses here.
                    </p>
                </div>
                {(!isAddingNew || !editingAddress) && (
                    <Button
                        className="gap-2"
                        onClick={() => setIsAddingNew(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Add New Address
                    </Button>
                )}
            </div>

            {(isAddingNew || editingAddress) && (
                <Card className="p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            {editingAddress
                                ? "Edit Address"
                                : "Add New Address"}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setIsAddingNew(false);
                                setEditingAddress(null);
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <AddressInput editingAddress={editingAddress} />
                </Card>
            )}

            <div className="grid gap-4 mb-6">
                {addresses.map((address) => (
                    <Card key={address._id} className="relative">
                        <CardContent className="p-6">
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setEditingAddress(address)}
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">
                                        Edit address
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">
                                        Delete address
                                    </span>
                                </Button>
                            </div>
                            <div className="grid gap-1">
                                <div className="text-lg font-medium">
                                    {address.name}
                                </div>
                                <div className="text-base text-gray-500">
                                    {address.streetAndNumber}
                                    <br />
                                    {address.place}, {address.region}{" "}
                                    {address.postcode}, <br /> {address.country}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DeliveryAddress;
