
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface LogoUploadProps {
  onLogoChange?: (logoUrl: string) => void;
  currentLogo?: string;
}

const LogoUpload = ({ onLogoChange, currentLogo }: LogoUploadProps) => {
  const [logo, setLogo] = useState<string>(currentLogo || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Logo file must be smaller than 5MB");
        return;
      }

      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setLogo(logoUrl);
        onLogoChange?.(logoUrl);
        toast.success("Logo uploaded successfully!");
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to upload logo");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5 text-blue-600" />
          <span>App Logo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logo && (
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="App Logo" 
              className="max-w-32 max-h-32 object-contain rounded-lg border"
            />
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="gradient"
            className="w-full"
          >
            <UploadIcon className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : logo ? "Change Logo" : "Upload Logo"}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          
          <p className="text-xs text-gray-500 text-center">
            Recommended: 512x512px, PNG or JPG, max 5MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoUpload;
