
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { QrCode, Home } from "lucide-react";

interface SidebarLayoutProps {
  children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="border-b border-border/40">
            <div className="flex items-center gap-2 px-2">
              <QrCode size={24} className="text-primary" />
              <h1 className="text-lg font-semibold">QR Code Genesis</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 text-sm font-medium p-2 rounded-md hover:bg-gray-100">
                <Home size={20} />
                <span>Home</span>
              </Link>
              
              <Card className="w-full shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Register now to generate your unique QR code.
                  </p>
                  <Link to="/register">
                    <Button className="w-full">Register Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/40 p-4">
            <div className="text-xs text-muted-foreground text-center">
              © 2025 QR Code Genesis System
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
