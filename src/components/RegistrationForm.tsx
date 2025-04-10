
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface RegistrationFormProps {
  onRegister: (userData: UserData) => void;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create user data with unique ID
    const userData: UserData = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    onRegister(userData);
    
    toast({
      title: "Registration Successful",
      description: "Your information has been registered successfully.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your information to generate a QR code.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john.doe@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              placeholder="(123) 456-7890" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Register & Generate QR Code</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegistrationForm;
