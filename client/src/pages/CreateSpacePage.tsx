import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useSpace } from "@/hooks/useSpace";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function CreateSpacePage({ onWaitingForPartner }: { onWaitingForPartner?: () => void }) {
  const [spaceName, setSpaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { createSpace, space } = useSpace(user?.id ?? null);
  const { toast } = useToast();

  useEffect(() => {
    if (space) {
      onWaitingForPartner?.();
    }
  }, [space, onWaitingForPartner]);

  const handleCreate = async () => {
    if (!spaceName || !user) return;

    setLoading(true);
    const { error } = await createSpace(spaceName, user.id);
    setLoading(false);

    if (error) {
      toast({
        title: "Failed to create space",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-display">Create Your Space</CardTitle>
          <CardDescription>Give your couple space a name</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spaceName">Space Name</Label>
            <Input
              id="spaceName"
              type="text"
              placeholder="Our Space"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              data-testid="input-space-name"
            />
          </div>
          <Button 
            className="w-full rounded-full" 
            onClick={handleCreate}
            disabled={!spaceName || loading}
            data-testid="button-create"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Space"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
