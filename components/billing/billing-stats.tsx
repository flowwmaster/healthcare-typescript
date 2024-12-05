"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export function BillingStats() {
  // Mock data - replace with API call
  const stats = {
    totalRevenue: 125000,
    pendingPayments: 15000,
    overduePayments: 5000,
    monthlyGrowth: 12.5,
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{stats.totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            {stats.monthlyGrowth}% from last month
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Payments
          </CardTitle>
          <CreditCard className="h-4 w-4 text-yellow" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{stats.pendingPayments.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Awaiting processing</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Overdue Payments
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{stats.overduePayments.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthlyGrowth}%</div>
          <p className="text-xs text-muted-foreground">Revenue increase</p>
        </CardContent>
      </Card>
    </div>
  );
}
