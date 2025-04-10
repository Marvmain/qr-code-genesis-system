
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserData } from './RegistrationForm';
import { useToast } from "@/components/ui/use-toast";

interface QRCodeGeneratorProps {
  userData: UserData | null;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ userData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (userData) {
      generateQRCode(userData);
    }
  }, [userData]);

  const generateQRCode = async (data: UserData) => {
    try {
      // Create a JSON string from the user data
      const dataString = JSON.stringify(data);
      
      // Generate QR code as data URL
      const url = await QRCode.toDataURL(dataString, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 300,
        color: {
          dark: '#3B82F6', // Blue dots
          light: '#FFFFFF', // White background
        },
      });
      
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${userData?.id || 'user'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "QR code downloaded successfully.",
    });
  };

  if (!userData) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Your QR Code</CardTitle>
        <CardDescription>Scan this QR code to access your information.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {qrCodeUrl ? (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="mx-auto"
            />
          </div>
        ) : (
          <div className="w-72 h-72 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Generating QR code...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={downloadQRCode} 
          disabled={!qrCodeUrl}
          className="w-full md:w-auto"
        >
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
