
import React from 'react';
import { QrCode } from 'lucide-react';
import { SidebarLayout } from '@/components/ui/sidebar-layout';

const Home = () => {
  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <QrCode size={64} className="text-primary mr-2" />
            <h1 className="text-4xl font-bold">QR Code Genesis System</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Register and generate unique QR codes for easy access to your information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">About the System</h2>
            <p className="text-muted-foreground">
              Our QR Code Genesis System allows you to register your information and generate a 
              personalized QR code. This QR code can be used for quick identification, event 
              check-ins, and sharing your contact information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click on "Register Now" from the sidebar</li>
              <li>Complete the registration form with your details</li>
              <li>Submit your information</li>
              <li>Download your unique QR code</li>
            </ol>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Home;
