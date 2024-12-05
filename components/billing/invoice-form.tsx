"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus, Trash } from "lucide-react";

const formSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  dueDate: z.string().min(1, "Due date is required"),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        rate: z.number().min(0, "Rate must be positive"),
      })
    )
    .min(1, "At least one item is required"),
  notes: z.string().optional(),
});

type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number;
};

export function InvoiceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, rate: 0 },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      items: [{ description: "", quantity: 1, rate: 0 }],
      notes: "",
    },
  });

  // Mock data - replace with API call
  const patients = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Emma Wilson" },
  ];

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Implement invoice creation logic here
      console.log(values);

      toast({
        title: "Success",
        description: "Invoice created successfully",
      });

      router.push("/admin/billing");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Items</h3>
                <Button type="button" variant="outline" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Service description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-24">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-32">
                    <FormField
                      control={form.control}
                      name={`items.${index}.rate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate (₹)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => removeItem(index)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <div className="text-lg font-medium">
                  Total: ₹{calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Invoice"}
        </Button>
      </form>
    </Form>
  );
}
