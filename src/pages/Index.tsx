
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import BillSubmissionForm from "@/components/BillSubmissionForm";
import YourBills from "@/components/YourBills";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reimbursement Portal</h1>
          <p className="text-muted-foreground">Manage and track your expense claims</p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          Create New Claim
        </Button>
      </div>

      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="bills">Your Bills</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bills">
          <YourBills />
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Bills</CardTitle>
              <CardDescription>All your approved expense claims</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No approved bills found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Bills</CardTitle>
              <CardDescription>Bills awaiting validation or approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No pending bills found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <BillSubmissionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
