import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

export default function OnboardingPage({ onComplete }: { onComplete?: () => void }) {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    console.log("Onboarding complete", { name, profilePic });
    onComplete?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-display">Complete Your Profile</CardTitle>
          <CardDescription>Let your partner know who you are</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profilePic} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {name ? name[0].toUpperCase() : <Upload className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Label htmlFor="profile-pic" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 hover-elevate">
                  <Upload className="h-5 w-5" />
                  <span>Upload Profile Picture</span>
                </div>
                <Input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  data-testid="input-profile-pic"
                />
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-name"
            />
          </div>
          <Button 
            className="w-full rounded-full" 
            onClick={handleComplete}
            disabled={!name || !profilePic}
            data-testid="button-complete"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
