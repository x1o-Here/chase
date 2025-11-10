import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ReceiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReceiveDialog = ({ open, onOpenChange }: ReceiveDialogProps) => {
  const walletAddress = "john.anderson@chase.com";
  const walletPhone = "+1 (555) 123-4567";

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive Money</DialogTitle>
          <DialogDescription>
            Share your wallet details to receive money
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Email Address</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md text-sm">
                {walletAddress}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(walletAddress, "Email")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Phone Number</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 bg-muted rounded-md text-sm">
                {walletPhone}
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(walletPhone, "Phone number")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Share either your email or phone number with the sender
          </p>
        </div>
        <Button onClick={() => onOpenChange(false)} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};
