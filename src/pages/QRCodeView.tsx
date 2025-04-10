
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Button } from "@/components/ui/button";
import { DetailedUserData } from './Register';
import { Home } from 'lucide-react';

const QRCodeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData as DetailedUserData;

  if (!userData) {
    return (
      <SidebarLayout>
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">No Registration Data</h2>
          <p className="text-muted-foreground mb-6">
            There is no registration data available. Please complete the registration form first.
          </p>
          <Button onClick={() => navigate('/register')}>
            Go to Registration
          </Button>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Registration Complete</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for registering! Here is your personalized QR code.
        </p>
        
        <QRCodeGenerator userData={userData} />
        
        <div className="mt-8">
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <Home size={18} />
            Back to Home
          </Button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default QRCodeView;
