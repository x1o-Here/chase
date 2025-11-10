'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TransactionForm from "./components/TransactionForm";

export default function ManagePage() {
    const [activeTab, setActiveTab] = useState<"credit" | "debit">("credit");

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="credit"
                        value={activeTab}
                        onValueChange={(value) => setActiveTab(value as "credit" | "debit")}
                    >
                        <TabsList className="grid grid-cols-2 w-full">
                            <TabsTrigger value="credit">Credit</TabsTrigger>
                            <TabsTrigger value="debit">Debit</TabsTrigger>
                        </TabsList>
                        <TabsContent value="credit">
                            <TransactionForm type="credit" />
                        </TabsContent>
                        <TabsContent value="debit">
                            <TransactionForm type="debit" />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}