import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, HelpCircle, FileText, Lock } from "lucide-react";

const SelfService = () => {
  const serviceOptions = [
    { icon: Settings, label: "Account Settings", description: "Manage your account preferences" },
    { icon: Lock, label: "Security", description: "Update passwords and security settings" },
    { icon: FileText, label: "Statements", description: "View and download statements" },
    { icon: HelpCircle, label: "Help & Support", description: "Get help with your account" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Self Service
          </h1>
          <p className="text-muted-foreground">
            Manage your account and access support
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {serviceOptions.map((option) => (
            <Card key={option.label} className="hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfService;
