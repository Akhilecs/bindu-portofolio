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

export const Route = createFileRoute("/admin/publications")({
  loader: async () => await readProfileData(),
  component: PublicationsManager,
});

const publicationSchema = z.object({
  title: z.string().min(2),
  venue: z.string().min(2),
  year: z.coerce.number().min(1900).max(2100),
  type: z.enum(["Journal", "Conference", "Book", "Chapter"]),
  index: z.string().optional(),
  link: z.string().optional(),
});

const publicationsFormSchema = z.object({
  publications: z.array(publicationSchema),
});

type PublicationsFormValues = z.infer<typeof publicationsFormSchema>;

function PublicationsManager() {
  const data = Route.useLoaderData();

  const form = useForm<PublicationsFormValues>({
    resolver: zodResolver(publicationsFormSchema),
    defaultValues: {
      publications: data.publications || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "publications",
    control: form.control,
  });

  async function onSubmit(values: PublicationsFormValues) {
    try {
      await writeProfileData({ data: { publications: values.publications } });
      toast.success("Publications updated successfully!");
    } catch (error) {
      toast.error("Failed to update publications.");
      console.error(error);
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Manage Publications</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => append({ title: "", venue: "", year: new Date().getFullYear(), type: "Journal" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Publication
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
                    name={`publications.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Publication Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`publications.${index}.venue`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue / Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Journal of..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`publications.${index}.year`}
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
                    <FormField
                      control={form.control}
                      name={`publications.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="Journal">Journal</option>
                              <option value="Conference">Conference</option>
                              <option value="Book">Book</option>
                              <option value="Chapter">Chapter</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`publications.${index}.index`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Index (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="SCOPUS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`publications.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://doi.org/..." {...field} />
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
                No publications added yet.
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
