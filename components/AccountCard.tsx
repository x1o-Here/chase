import { CreditCard, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AccountCardProps {
  ownerName: string;
  accountNumber: string;
}

export const AccountCard = ({ ownerName, accountNumber }: AccountCardProps) => {
  const maskedNumber = `****${accountNumber.slice(-4)}`;
  
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Savings Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 opacity-80" />
          <span className="text-sm font-medium">{ownerName}</span>
        </div>
        <div>
          <p className="text-xs opacity-80 mb-1">Account Number</p>
          <p className="text-lg font-mono tracking-wider">{maskedNumber}</p>
        </div>
      </CardContent>
    </Card>
  );
};