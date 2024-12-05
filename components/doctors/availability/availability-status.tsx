"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AvailabilityStatusProps {
  doctorId: string;
  initialStatus: boolean;
  onStatusChange: (status: boolean) => Promise<void>;
}

export function AvailabilityStatus({
  doctorId,
  initialStatus,
  onStatusChange,
}: AvailabilityStatusProps) {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await onStatusChange(checked);
      setIsOnline(checked);
      toast({
        title: "Success",
        description: `Status updated to ${checked ? "Online" : "Offline"}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isOnline}
            onCheckedChange={handleStatusChange}
            disabled={isLoading}
            id="availability-mode"
          />
          <Label htmlFor="availability-mode">
            {isOnline ? "Online" : "Offline (Vacation Mode)"}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          {isOnline
            ? "You are currently available for new appointments"
            : "You are currently not accepting new appointments"}
        </p>
      </CardContent>
    </Card>
  );
}
