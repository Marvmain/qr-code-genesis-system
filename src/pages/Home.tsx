
import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { DetailedUserData } from './Register';
import { useSupabase } from '@/hooks/useSupabase';

const Home = () => {
  const [registrations, setRegistrations] = useState<DetailedUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { getUsers } = useSupabase();

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data, success } = await getUsers();
      if (success && data) {
        setRegistrations(data);
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, []);

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <QrCode size={64} className="text-primary mb-4" />
          <h1 className="text-3xl font-bold">QR Code Genesis System</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Create personalized QR codes for your events, products, or services. 
            Register your information and generate a unique QR code instantly.
          </p>
          <div className="mt-6">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                <QrCode size={18} />
                Register Now
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 flex justify-center">
              <p>Loading registrations...</p>
            </CardContent>
          </Card>
        ) : registrations.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>Recent users who have registered in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Affiliation</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{reg.name}</td>
                        <td className="py-3 px-4">{reg.email}</td>
                        <td className="py-3 px-4">{reg.affiliation || 'N/A'}</td>
                        <td className="py-3 px-4">{new Date(reg.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <Link to="/qr-code" state={{ userData: reg }}>
                            <Button variant="outline" size="sm">View QR</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No registrations found. Be the first to register!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </SidebarLayout>
  );
};

export default Home;
