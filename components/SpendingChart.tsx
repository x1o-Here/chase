'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Timestamp } from "firebase/firestore";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
    color: "hsl(var(--accent))",
  },
};

export default function SpendingChart({ transactions, initialBalance = 0 }: SpendingChartProps) {
  if (!transactions.length) return null;

  // Sort transactions by date ascending
  const sortedTransactions = [...transactions].sort(
    (a, b) => toJSDate(a.date).getTime() - toJSDate(b.date).getTime()
  );

  // First and last transaction dates
  const firstTransactionDate = toJSDate(sortedTransactions[0].date);
  const lastTransactionDate = toJSDate(sortedTransactions[sortedTransactions.length - 1].date);

  const today = new Date();

  // Month/year state default to current month/year
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Filter transactions for the selected month/year
  const monthlyTransactions = useMemo(() => {
    return sortedTransactions.filter(tx => {
      const txDate = toJSDate(tx.date);
      return txDate.getMonth() === selectedMonth && txDate.getFullYear() === selectedYear;
    });
  }, [sortedTransactions, selectedMonth, selectedYear]);

  // Compute starting balance for the selected month (carry over previous months)
  const startingBalance = useMemo(() => {
    let balance = initialBalance;
    sortedTransactions.forEach(tx => {
      const txDate = toJSDate(tx.date);
      if (txDate < new Date(selectedYear, selectedMonth, 1)) {
        balance += tx.isCredit ? tx.amount : -tx.amount;
      }
    });
    return balance;
  }, [sortedTransactions, initialBalance, selectedMonth, selectedYear]);

  // Determine max date to show (today for current month, end of month for past months)
  const maxDateToShow = useMemo(() => {
    if (selectedYear === today.getFullYear() && selectedMonth === today.getMonth()) {
      return today;
    } else {
      // Last day of month
      return new Date(selectedYear, selectedMonth + 1, 0);
    }
  }, [selectedMonth, selectedYear, today]);

  /// Build chart data
  const chartData = useMemo(() => {
    let runningBalance = startingBalance;

    const txMap: Record<string, number> = {};
    monthlyTransactions.forEach(tx => {
      const dateKey = toJSDate(tx.date).toISOString().split("T")[0];
      const delta = tx.isCredit ? tx.amount : -tx.amount;
      txMap[dateKey] = (txMap[dateKey] || 0) + delta;
    });

    const dates = getDatesInMonthUpTo(selectedYear, selectedMonth, maxDateToShow);

    return dates.map(date => {
      const dateKey = date.toISOString().split("T")[0];
      if (txMap[dateKey]) runningBalance += txMap[dateKey];

      return {
        date: date.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
        balance: runningBalance
      };
    });
  }, [monthlyTransactions, selectedMonth, selectedYear, startingBalance, maxDateToShow]);

  // Month/year dropdowns starting from first transaction
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const years = Array.from(
    { length: today.getFullYear() - firstTransactionDate.getFullYear() + 1 },
    (_, i) => firstTransactionDate.getFullYear() + i
  );

  const monthsForYear = (year: number) => {
    if (year === firstTransactionDate.getFullYear() && year === today.getFullYear()) {
      return monthNames.slice(firstTransactionDate.getMonth(), today.getMonth() + 1);
    } else if (year === firstTransactionDate.getFullYear()) {
      return monthNames.slice(firstTransactionDate.getMonth());
    } else if (year === today.getFullYear()) {
      return monthNames.slice(0, today.getMonth() + 1);
    }
    return monthNames;
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle>Account Balance</CardTitle>

        <div className="flex gap-2">
          {/* Month Dropdown */}
          <Select value={selectedMonth.toString()} onValueChange={val => setSelectedMonth(Number(val))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue>{monthNames[selectedMonth]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {monthsForYear(selectedYear).map((month, idx) => (
                  <SelectItem key={idx} value={(monthNames.indexOf(month)).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Year Dropdown */}
          <Select value={selectedYear.toString()} onValueChange={val => setSelectedYear(Number(val))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue>{selectedYear}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
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
              stroke="hsl(var(--accent))"
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

// Helper to get all dates in a month up to maxDate
function getDatesInMonthUpTo(year: number, month: number, maxDate: Date) {
  const date = new Date(year, month, 1);
  const dates: Date[] = [];
  while (date.getMonth() === month && date <= maxDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

function toJSDate(date: Date | Timestamp): Date {
  return date instanceof Timestamp ? date.toDate() : date;
}