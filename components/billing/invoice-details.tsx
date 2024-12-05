"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Download, Send } from "lucide-react";

interface InvoiceDetailsProps {
  invoiceId: string;
}

export function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  // Mock data - replace with API call
  const invoice = {
    id: invoiceId,
    number: "INV-001",
    date: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "pending",
    patient: {
      name: "John Smith",
      email: "john@example.com",
      address: "123 Main St, City, Country",
    },
    items: [
      {
        description: "Therapy Session",
        quantity: 4,
        rate: 100,
        amount: 400,
      },
      {
        description: "Consultation",
        quantity: 1,
        rate: 150,
        amount: 150,
      },
    ],
    subtotal: 550,
    tax: 55,
    total: 605,
  };

  const handleSendInvoice = async () => {
    // Implement send invoice logic
    console.log("Sending invoice:", invoiceId);
  };

  const handleDownloadInvoice = async () => {
    // Implement download invoice logic
    console.log("Downloading invoice:", invoiceId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">Invoice #{invoice.number}</h2>
          <p className="text-muted-foreground">
            Created: {format(invoice.date, "MMMM dd, yyyy")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSendInvoice}>
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
          <Button variant="outline" onClick={handleDownloadInvoice}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Status</span>
              <Badge
                variant={
                  invoice.status === "paid"
                    ? "success"
                    : invoice.status === "pending"
                    ? "warning"
                    : "destructive"
                }
              >
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Due Date</span>
              <span>{format(invoice.dueDate, "MMMM dd, yyyy")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{invoice.patient.name}</p>
            <p className="text-muted-foreground">{invoice.patient.email}</p>
            <p className="text-muted-foreground">{invoice.patient.address}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Rate</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">₹{item.rate}</td>
                    <td className="px-6 py-4">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Subtotal
                  </td>
                  <td className="px-6 py-4">₹{invoice.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Tax (10%)
                  </td>
                  <td className="px-6 py-4">₹{invoice.tax}</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan={3} className="px-6 py-4 text-right">
                    Total
                  </td>
                  <td className="px-6 py-4">₹{invoice.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
