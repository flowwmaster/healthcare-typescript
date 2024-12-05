"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  type?: "signin" | "signout";
}

export function LocationDialog({
  isOpen,
  onClose,
  location,
  type,
}: LocationDialogProps) {
  if (!location) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "signin" ? "Sign In" : "Sign Out"} Location
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video w-full rounded-lg bg-muted">
            {/* Placeholder for map - integrate with your preferred map provider */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Map View: {location.latitude}, {location.longitude}
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium">Address:</p>
            <p className="text-muted-foreground">{location.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Latitude:</p>
              <p className="text-muted-foreground">{location.latitude}</p>
            </div>
            <div>
              <p className="font-medium">Longitude:</p>
              <p className="text-muted-foreground">{location.longitude}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}