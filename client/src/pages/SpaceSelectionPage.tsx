import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";

export default function SpaceSelectionPage({ onCreateSpace, onJoinSpace }: { onCreateSpace?: () => void; onJoinSpace?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Connect with Your Partner</h1>
          <p className="text-muted-foreground">Choose how you want to start</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover-elevate cursor-pointer" onClick={onCreateSpace}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl font-display">Create a Space</CardTitle>
              <CardDescription>Start a new couple space and get a unique code</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full rounded-full" 
                data-testid="button-create-space"
              >
                Create Space
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer" onClick={onJoinSpace}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl font-display">Join a Space</CardTitle>
              <CardDescription>Enter your partner's code to connect</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full rounded-full" 
                variant="outline"
                data-testid="button-join-space"
              >
                Join Space
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
