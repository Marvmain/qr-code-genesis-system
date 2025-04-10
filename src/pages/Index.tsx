
import React, { useState } from 'react';
import RegistrationForm, { UserData } from '@/components/RegistrationForm';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import RegisteredUsersList from '@/components/RegisteredUsersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode } from "lucide-react";

const Index = () => {
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleRegister = (userData: UserData) => {
    setRegisteredUsers(prev => [...prev, userData]);
    setCurrentUser(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center mb-2">
            <QrCode size={32} className="text-primary mr-2" />
            <h1 className="text-3xl font-bold text-center">QR Code Genesis System</h1>
          </div>
          <p className="text-center text-muted-foreground">Register users and generate unique QR codes</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="register" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="register">Registration</TabsTrigger>
            <TabsTrigger value="users">Registered Users</TabsTrigger>
          </TabsList>
          <TabsContent value="register" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <RegistrationForm onRegister={handleRegister} />
              </div>
              <div>
                <QRCodeGenerator userData={currentUser} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="users">
            <RegisteredUsersList users={registeredUsers} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-auto py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 QR Code Genesis System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
