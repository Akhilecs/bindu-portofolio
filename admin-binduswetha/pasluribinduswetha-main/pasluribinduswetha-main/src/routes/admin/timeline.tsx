import { createFileRoute } from "@tanstack/react-router";
import { readProfileData, writeProfileData } from "@/lib/api";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/timeline")({
  loader: async () => await readProfileData(),
  component: TimelineManager,
});

const timelineEventSchema = z.object({
  year: z.string().min(2),
  title: z.string().min(2),
  detail: z.string().min(2),
});

const timelineFormSchema = z.object({
  timeline: z.array(timelineEventSchema),
});

type TimelineFormValues = z.infer<typeof timelineFormSchema>;

function TimelineManager() {
  const data = Route.useLoaderData();

  const form = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineFormSchema),
    defaultValues: {
      timeline: data.timeline || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "timeline",
    control: form.control,
  });

  async function onSubmit(values: TimelineFormValues) {
    try {
      await writeProfileData({ data: { timeline: values.timeline } });
      toast.success("Timeline updated successfully!");
    } catch (error) {
      toast.error("Failed to update timeline.");
      console.error(error);
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Manage Timeline</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => append({ year: "", title: "", detail: "" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-card border rounded-lg p-4 shadow-sm relative pr-12">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Title / Position</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Professor, ECE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2025–" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.detail`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution / Details</FormLabel>
                        <FormControl>
                          <Input placeholder="University Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            
            {fields.length === 0 && (
              <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
                No timeline events added yet.
              </div>
            )}
          </div>

          <div className="sticky bottom-0 p-4 bg-background border-t -mx-4 md:-mx-6 mt-6 flex justify-end">
            <Button type="submit" size="lg">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
