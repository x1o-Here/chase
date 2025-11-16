'use client'

import { AccountCard } from "@/components/AccountCard";
import { BalanceCard } from "@/components/BalanceCard";
import { ReceiveDialog } from "@/components/RecieveDialog";
import { SendDialog } from "@/components/SendDialog";
import SpendingChart from "@/components/SpendingChart";
import { TransactionsList } from "@/components/TransactionsList";
import { TransferDialog } from "@/components/TransferDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WalletCard from "@/components/WalletCard";
import db from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ArrowDownRight, ArrowUpRight, Repeat } from "lucide-react";
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

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  
  const accountData = {
    displayName: "Muthula",
    ownerName: "L M H Alwis",
    accountNumber: "3604617988",
  };

  const [balances, setBalances] = useState({
    currentBalance: 0,
    availableFunds: 0,
    overdraftLimit: 0,
  });

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

        const computedBalances = calculateBalances(txs);
        setBalances(computedBalances);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container max-w-6xl mx-auto bg-white px-4 py-6 space-y-6">
      <div className="min-h-screen bg-white flex flex-col space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {accountData.displayName}
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview
          </p>
        </div>

        {/* Account Card */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-4">
          <AccountCard 
            ownerName={accountData.ownerName}
            accountNumber={accountData.accountNumber}
            className="col-span-3 lg:col-span-2"
            setTransferDialogOpen={setTransferDialogOpen}
          />

          <WalletCard 
            className="col-span-3 lg:col-span-1"
            setSendDialogOpen={setSendDialogOpen}
            setReceiveDialogOpen={setReceiveDialogOpen}

          />
        </div>

        {/* Balance Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <BalanceCard
            title="Current Balance"
            amount={balances.currentBalance}
            subtitle="Updated just now"
            variant="success"
          />
          <BalanceCard
            title="Available Funds"
            amount={balances.availableFunds}
            subtitle="Ready to use"
          />
          <BalanceCard
            title="Overdraft Limit"
            amount={balances.overdraftLimit}
            subtitle="Protection available"
            variant="warning"
          />
        </div>

        {/* Spending Chart */}
        <SpendingChart transactions={transactions} />

        {/* Recent Transactions */}
        <TransactionsList transactions={transactions} />
      </div>

      <SendDialog open={sendDialogOpen} onOpenChange={setSendDialogOpen} />
      <ReceiveDialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen} />
      <TransferDialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen} />
    </div>
  );
}

function calculateBalances(transactions: Transaction[]) {
  const now = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(now.getDate() - 3);

  let currentBalance = 0;
  let availableFunds = 0;

  transactions.forEach((tx) => {
    const amount = tx.amount;
    if (tx.isCredit) {
      currentBalance += amount;
    } else {
      currentBalance -= amount;
    }
  });

  // Available funds: deduct any isCredit=false transactions in last 3 days
  const recentDebits = transactions
    .filter((tx) => !tx.isCredit)
    .filter((tx) => tx.date >= threeDaysAgo);
  
  let recentDebitTotal = 0;
  recentDebits.forEach((tx) => {
    recentDebitTotal += tx.amount;
  });

  availableFunds = currentBalance - recentDebitTotal;

  // Overdraft = 10% of available funds
  const overdraftLimit = availableFunds * 0.1;

  return { currentBalance, availableFunds, overdraftLimit };
}