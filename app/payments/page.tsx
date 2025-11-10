'use client'

import SpendingChart from "@/components/SpendingChart";
import { TransactionsList } from "@/components/TransactionsList";
import db from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";

interface Transaction{
  id: string;
  title: string;
  description: string;
  amount: number;
  category?: string;
  isCredit: boolean;
  date: Date;
}

export default function Payments() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "transactions"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const txs: Transaction[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];

        setTransactions(txs);
        console.log(txs);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Payments & Transactions
          </h1>
          <p className="text-muted-foreground">
            Manage your payments and view transaction history
          </p>
        </div>

        {/* Spending Chart */}
        <SpendingChart transactions={transactions} />

        {/* Transaction History */}
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
};