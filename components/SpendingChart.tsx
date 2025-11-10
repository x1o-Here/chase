'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Timestamp } from "firebase/firestore";

interface Transaction {
  id: string | number;
  amount: number;
  date: Date | Timestamp;
  isCredit: boolean;
}

interface SpendingChartProps {
  transactions: Transaction[];
  initialBalance?: number;
}

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--primary))",
  },
};

export default function SpendingChart({ transactions, initialBalance = 0 }: SpendingChartProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => toJSDate(a.date).getTime() - toJSDate(b.date).getTime()
  );

  let runningBalance = initialBalance;
  const chartData: { date: string; balance: number }[] = [];

  sortedTransactions.forEach(tx => {
    const txDate = toJSDate(tx.date);
    runningBalance += tx.isCredit ? tx.amount : -tx.amount;

    // Format date as "20 Sep 2025"
    const formattedDate = txDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    chartData.push({ date: formattedDate, balance: runningBalance });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              className="text-xs"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorBalance)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

function toJSDate(date: Date | Timestamp): Date {
  return date instanceof Timestamp ? date.toDate() : date;
}