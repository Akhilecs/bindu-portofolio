import { createFileRoute } from "@tanstack/react-router";
import { readProfileData, writeProfileData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Lightbulb, Award, Briefcase, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    return await readProfileData();
  },
  component: AdminDashboard,
});

const statSchema = z.object({
  label: z.string().min(2),
  value: z.coerce.number(),
  suffix: z.string(),
});

const statsFormSchema = z.object({
  stats: z.array(statSchema),
});

type StatsFormValues = z.infer<typeof statsFormSchema>;

function AdminDashboard() {
  const data = Route.useLoaderData();

  const overviewStats = [
    { title: "Total Publications", value: data.publications?.length || 0, icon: BookOpen },
    { title: "Patents", value: data.patents?.length || 0, icon: Lightbulb },
    { title: "Awards", value: data.awards?.length || 0, icon: Award },
    { title: "Timeline Events", value: data.timeline?.length || 0, icon: Briefcase },
  ];

  const form = useForm<StatsFormValues>({
    resolver: zodResolver(statsFormSchema),
    defaultValues: {
      stats: data.stats || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "stats",
    control: form.control,
  });

  async function onSubmit(values: StatsFormValues) {
    try {
      await writeProfileData({ data: { stats: values.stats } });
      toast.success("Highlight stats updated successfully!");
    } catch (error) {
      toast.error("Failed to update stats.");
      console.error(error);
    }
  }

  return (
    <div className="flex-1 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard Overview</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Highlight Stats</CardTitle>
                <CardDescription>
                  Manage the statistics shown on the hero section of your portfolio.
                </CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => append({ label: "", value: 0, suffix: "+" })}>
                <Plus className="mr-2 h-4 w-4" /> Add Stat
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start bg-muted/50 p-3 rounded-md relative pr-12">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <FormField
                        control={form.control}
                        name={`stats.${index}.label`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-xs">Label</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Research Papers" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`stats.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="w-24">
                            <FormLabel className="text-xs">Value</FormLabel>
                            <FormControl>
                              <Input type="number" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`stats.${index}.suffix`}
                        render={({ field }) => (
                          <FormItem className="w-16">
                            <FormLabel className="text-xs">Suffix</FormLabel>
                            <FormControl>
                              <Input placeholder="+" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  
                  {fields.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground text-sm">
                      No highlight stats added yet.
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">Save Stats</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Admin Dashboard Usage Guide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use the sidebar on the left to navigate through different sections of your portfolio.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Any changes you save will be instantly reflected on your live site.</li>
              <li>New images for the Gallery must be placed in the `public/gallery` folder before they can be added here.</li>
              <li>All data is saved locally to `profile.json`.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
