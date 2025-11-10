'use client'

import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '@/lib/firebase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number(),
    category: z.string().optional(),
    type: z.enum(["credit", "debit"]),
    date: z.date()
})

export default function TransactionForm({ type } : { type: "credit" | "debit" }) {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            amount: 0,
            category: '',
            type: type,
            date: new Date()
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            // Add transaction to Firestore
            await addDoc(collection(db, "transactions"), {
                title: data.title,
                amount: data.amount,
                category: data.category || "",
                isCredit: data.type === "credit",
                date: data.date,
                createdAt: serverTimestamp(),
            });

            toast.success("Transaction added successfully!");
            form.reset({ ...form.getValues(), title: "", amount: 0, category: "" });
        } catch (error) {
            console.error("Error adding transaction:", error);
            toast.error("Failed to add transaction. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter title (e.g., Cash Deposit)"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    placeholder="Enter amount"
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) => field.onChange(e.target.value === "" ? "" : e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DatePicker
                    form={form}
                    name="date"
                    label="Date"
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter category (optional)"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Transaction"}
                </Button>
            </form>
        </Form>
    )
}