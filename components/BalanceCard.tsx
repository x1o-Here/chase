import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface BalanceCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  variant?: "default" | "success" | "warning";
}

export const BalanceCard = ({ 
  title, 
  amount, 
  subtitle,
  variant = "default" 
}: BalanceCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      default:
        return "";
    }
  };

  const getAmountColor = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${getVariantStyles()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className={`text-2xl font-bold ${getAmountColor()}`}>
            {formatCurrency(amount)}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
