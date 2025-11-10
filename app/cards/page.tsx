import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export default function Cards() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
        <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Cards
          </h1>
          <p className="text-muted-foreground">
            Manage your debit and credit cards
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No cards found</h3>
              <p className="text-muted-foreground text-sm">
                Your cards will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};