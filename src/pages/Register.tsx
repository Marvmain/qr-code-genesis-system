import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '@/hooks/useSupabase';

export interface DetailedUserData {
  id: string;
  name: string;
  sex: string;
  affiliation: string;
  address: string;
  email: string;
  phone: string;
  sector: string[];
  sector2: string[];
  createdAt: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveUser, loading } = useSupabase();
  
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    affiliation: '',
    address: '',
    email: '',
    phone: '',
    sector: [] as string[],
    sector2: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleCheckboxChange = (value: string, checked: boolean, field: 'sector' | 'sector2') => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, [field]: [...prev[field], value] };
      } else {
        return { ...prev, [field]: prev[field].filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    const userData: DetailedUserData = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Save to Supabase
    const { success, error } = await saveUser(userData);

    if (success) {
      toast({
        title: "Registration Successful",
        description: "Your information has been registered successfully.",
      });

      // Navigate to QR code page
      navigate('/qr-code', { state: { userData } });
    } else {
      toast({
        title: "Registration Failed",
        description: error || "There was a problem registering. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>Please fill in your information to register and generate a QR code.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="sex">Sex</Label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'sex')}>
                      <SelectTrigger id="sex">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="affiliation">Affiliation</Label>
                  <Input 
                    id="affiliation" 
                    name="affiliation" 
                    placeholder="Company or Organization" 
                    value={formData.affiliation}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    placeholder="Your complete address" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sector Information</h3>
                
                <div className="space-y-2">
                  <Label className="text-base">Sector 1</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['NGA', 'PRIVATE', 'LGU', 'ACADEME', 'OTHERS'].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`sector-${item}`} 
                          checked={formData.sector.includes(item)}
                          onCheckedChange={(checked) => handleCheckboxChange(item, checked === true, 'sector')}
                        />
                        <Label htmlFor={`sector-${item}`} className="font-normal">{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">Sector 2</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Youth', 'PWD', 'IP Community', 'Senior Citizen', 'Others'].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`sector2-${item}`} 
                          checked={formData.sector2.includes(item)}
                          onCheckedChange={(checked) => handleCheckboxChange(item, checked === true, 'sector2')}
                        />
                        <Label htmlFor={`sector2-${item}`} className="font-normal">{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto">Submit Registration</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default Register;
