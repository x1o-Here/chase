import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Timestamp } from "firebase/firestore";

interface Transaction {
  id: string | number;
  title: string;
  description: string;
  category?: string;
  amount: number;
  date: Date | Timestamp;
  isCredit: boolean;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const isPositive = transaction.isCredit;
            const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

            const date = transaction.date instanceof Date 
              ? transaction.date 
              : transaction.date.toDate();
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isPositive ? 'bg-success/10' : 'bg-success'}`}>
                    <Icon className={`h-5 w-5 ${isPositive ? 'text-accent' : 'text-red-300'}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {/* <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge> */}
                      <span className="text-xs text-muted-foreground">
                        {date.toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    isPositive ? 'text-success' : 'text-foreground'
                  }`}
                >
                  {isPositive ? '+' : '-'}{transaction.amount.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
