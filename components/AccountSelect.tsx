'use client'

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Account = {
    type: string;
    number: string;
};

const accounts: Record<string, Account> = {
    "7988": { type: "Savings Account", number: "****7988" },
};

export default function AccountSelect() {
    const [value, setValue] = useState("7988");
    const selectedAccount = accounts[value];

    return (
        <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-[180px] font-light rounded-full pl-4">
                {selectedAccount?.number}
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {Object.entries(accounts).map(([id, acc]) => (
                        <SelectItem key={id} value={id}>
                            <div className="flex flex-col leading-tight group text-black">
                                <span className="text-sm font-normal">{acc.type}</span>
                                <span className="text-xs font-light text-gray-500">{acc.number}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
