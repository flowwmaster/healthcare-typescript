"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

interface SessionNotesProps {
  sessionId: string;
  initialNotes?: string;
  onSave: (notes: string) => Promise<void>;
}

export function SessionNotes({
  sessionId,
  initialNotes = "",
  onSave,
}: SessionNotesProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(notes);
      toast({
        title: "Success",
        description: "Session notes have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save session notes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Add session notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[200px]"
      />
      <Button onClick={handleSave} disabled={isLoading}>
        <Save className="mr-2 h-4 w-4" />
        {isLoading ? "Saving..." : "Save Notes"}
      </Button>
    </div>
  );
}
