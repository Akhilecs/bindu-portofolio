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

export const Route = createFileRoute("/admin/awards")({
  loader: async () => await readProfileData(),
  component: AwardsManager,
});

const awardSchema = z.object({
  title: z.string().min(2),
  by: z.string().min(2),
  year: z.coerce.number().min(1900).max(2100),
});

const awardsFormSchema = z.object({
  awards: z.array(awardSchema),
});

type AwardsFormValues = z.infer<typeof awardsFormSchema>;

function AwardsManager() {
  const data = Route.useLoaderData();

  const form = useForm<AwardsFormValues>({
    resolver: zodResolver(awardsFormSchema),
    defaultValues: {
      awards: data.awards || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "awards",
    control: form.control,
  });

  async function onSubmit(values: AwardsFormValues) {
    try {
      await writeProfileData({ data: { awards: values.awards } });
      toast.success("Awards updated successfully!");
    } catch (error) {
      toast.error("Failed to update awards.");
      console.error(error);
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Manage Awards</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => append({ title: "", by: "", year: new Date().getFullYear() })}>
              <Plus className="mr-2 h-4 w-4" /> Add Award
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
                    name={`awards.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Award Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Best Researcher Award" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`awards.${index}.by`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Awarded By</FormLabel>
                        <FormControl>
                          <Input placeholder="Organization Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`awards.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
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
                No awards added yet.
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
