import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface WalletCardProps {
    className?: string;
    setSendDialogOpen: (open: boolean) => void;
    setReceiveDialogOpen: (open: boolean) => void;
}

export default function WalletCard({ className, setSendDialogOpen, setReceiveDialogOpen }: WalletCardProps) {
    return (
        <Card className={cn(`border-none py-4 gap-2 shadow-lg`, className)}>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light">
                    ******2819
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-between space-y-8">
                <div className="w-full flex items-center justify-center">
                    <p className="text-7xl font-medium">
                        <span className="text-5xl text-gray-300 mr-2">USD</span>
                        0.00
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-auto flex rounded-full bg-black text-gray-100 hover:bg-gray-100 hover:text-black border-none transition-colors"
                        onClick={() => setSendDialogOpen(true)}
                    >
                        <BanknoteArrowUp strokeWidth={1} />
                        <span className="text-sm font-light">Send</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-auto flex rounded-full bg-blue-300 text-gray-900 hover:bg-gray-900 hover:text-gray-100 border-none transition-colors"
                        onClick={() => setReceiveDialogOpen(true)}
                    >
                        <BanknoteArrowDown strokeWidth={1} />
                        <span className="text-sm font-light">Receive</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}