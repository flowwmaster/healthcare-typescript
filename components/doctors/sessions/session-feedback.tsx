"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";

interface SessionFeedback {
  rating: number;
  comment: string;
  date: Date;
}

interface SessionFeedbackProps {
  feedback: SessionFeedback | null | undefined;
}

export function SessionFeedback({ feedback }: SessionFeedbackProps) {
  if (!feedback) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No feedback received yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-yellow-500">
            <StarIcon className="h-4 w-4 mr-1 fill-current" />
            {feedback.rating.toFixed(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">out of 5.0</span>
        </div>

        {feedback.comment && (
          <div>
            <p className="text-sm font-medium mb-1">Comment</p>
            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
