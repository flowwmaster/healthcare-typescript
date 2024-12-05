"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { InvoiceForm } from "@/components/billing/invoice-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();

  return (
    <DashboardShell>
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Billing
      </Button>
      <DashboardHeader
        heading="Create Invoice"
        text="Generate a new invoice for services"
      />
      <InvoiceForm />
    </DashboardShell>
  );
}
