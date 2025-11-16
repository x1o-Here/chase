import { Copy, CreditCard, Repeat, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import AccountSelect from "./AccountSelect";
import { Button } from "./ui/button";

interface AccountCardProps {
  ownerName: string;
  accountNumber: string;
  className?: string;
  setTransferDialogOpen: (open: boolean) => void;
}

export const AccountCard = ({ ownerName, accountNumber, className, setTransferDialogOpen }: AccountCardProps) => {
  const maskedNumber = `****${accountNumber.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch (err) {
    }
  };
  
  return (
    <Card className={cn(`border-0 shadow-lg grid grid-cols-2`, className)}>
      <div>
        <CardHeader className="pb-3">
          <CardTitle>
            <AccountSelect />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-2xl font-medium">{ownerName}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Savings Account</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-mono tracking-wider">{maskedNumber}</p>
              <Button
                size="icon-sm"
                variant="ghost"
                className="rounded-full text-gray-300 hover:text-gray-500 hover:bg-transparent transition"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="h-full p-4 flex flex-col justify-end">
        <Button
          variant="outline"
          className="w-full h-auto flex rounded-full bg-black text-gray-100 hover:bg-gray-100 hover:text-black border-none transition-colors"
          onClick={() => setTransferDialogOpen(true)}
        >
          <Repeat strokeWidth={1} />
          <span className="text-sm font-light">Transfer</span>
        </Button>  
      </div>      
    </Card>
  );
};