import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TransferDialog = ({ open, onOpenChange }: TransferDialogProps) => {
  // Internal transfer state
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  // External transfer state
  const [sourceAccount, setSourceAccount] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [transferType, setTransferType] = useState<"domestic" | "international">("domestic");
  const [externalAmount, setExternalAmount] = useState("");

  const accounts = [
    { id: "1", name: "Savings Account", balance: 12500.50 },
    { id: "2", name: "Checking Account", balance: 3420.75 },
    { id: "3", name: "Investment Account", balance: 45800.00 },
  ];

  const handleInternalTransfer = () => {
    if (!fromAccount || !toAccount || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (fromAccount === toAccount) {
      toast.error("Cannot transfer to the same account");
      return;
    }

    const fromAccountName = accounts.find(acc => acc.id === fromAccount)?.name;
    const toAccountName = accounts.find(acc => acc.id === toAccount)?.name;

    toast.success(`Transferred $${amount} from ${fromAccountName} to ${toAccountName}`);

    resetInternalForm();
    onOpenChange(false);
  };

  const handleExternalTransfer = () => {
    const requiredFields = [sourceAccount, beneficiaryName, bankName, accountNumber, externalAmount];
    
    if (transferType === "domestic" && !routingNumber) {
      requiredFields.push(routingNumber);
    }
    
    if (transferType === "international" && (!swiftCode || !bankAddress)) {
      toast.error("SWIFT code and bank address are required for international transfers");
      return;
    }

    if (requiredFields.some(field => !field)) {
      toast.error("Please fill in all required fields");
      return;
    }

    const sourceAccountName = accounts.find(acc => acc.id === sourceAccount)?.name;

    toast.success(`$${externalAmount} transfer to ${beneficiaryName} at ${bankName} is being processed. You'll receive a confirmation shortly.`);

    resetExternalForm();
    onOpenChange(false);
  };

  const resetInternalForm = () => {
    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  const resetExternalForm = () => {
    setSourceAccount("");
    setBeneficiaryName("");
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");
    setSwiftCode("");
    setBankAddress("");
    setExternalAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
          <DialogDescription>
            Transfer between your accounts or to external banks
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="internal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="internal">My Accounts</TabsTrigger>
            <TabsTrigger value="external">External Bank</TabsTrigger>
          </TabsList>

          {/* Internal Transfer Tab */}
          <TabsContent value="internal" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="from-account">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} (${account.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-account">To Account</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger id="to-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} (${account.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-amount">Amount ($)</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleInternalTransfer} className="flex-1">
                Transfer
              </Button>
            </div>
          </TabsContent>

          {/* External Bank Transfer Tab */}
          <TabsContent value="external" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="source-account">From Account</Label>
              <Select value={sourceAccount} onValueChange={setSourceAccount}>
                <SelectTrigger id="source-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} (${account.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transfer Type</Label>
              <Tabs value={transferType} onValueChange={(v) => setTransferType(v as "domestic" | "international")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="domestic">Domestic</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiary-name">Beneficiary Name</Label>
              <Input
                id="beneficiary-name"
                placeholder="Full name of recipient"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input
                id="bank-name"
                placeholder="Name of beneficiary's bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input
                id="account-number"
                placeholder="Beneficiary account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            {transferType === "domestic" && (
              <div className="space-y-2">
                <Label htmlFor="routing-number">Routing Number</Label>
                <Input
                  id="routing-number"
                  placeholder="9-digit routing number"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  maxLength={9}
                />
              </div>
            )}

            {transferType === "international" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
                  <Input
                    id="swift-code"
                    placeholder="8 or 11 character SWIFT code"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                    maxLength={11}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-address">Bank Address</Label>
                  <Input
                    id="bank-address"
                    placeholder="Full address of the bank"
                    value={bankAddress}
                    onChange={(e) => setBankAddress(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="external-amount">Amount ($)</Label>
              <Input
                id="external-amount"
                type="number"
                placeholder="0.00"
                value={externalAmount}
                onChange={(e) => setExternalAmount(e.target.value)}
              />
            </div>

            <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
              <p className="font-medium mb-1">Processing Time:</p>
              <p>{transferType === "domestic" ? "1-2 business days" : "3-5 business days"}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleExternalTransfer} className="flex-1">
                Transfer
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
