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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/skills")({
  loader: async () => await readProfileData(),
  component: SkillsManager,
});

const skillsFormSchema = z.object({
  skills: z.array(z.object({ value: z.string().min(2) })),
  memberships: z.array(z.object({ value: z.string().min(2) })),
});

type SkillsFormValues = z.infer<typeof skillsFormSchema>;

function SkillsManager() {
  const data = Route.useLoaderData();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: (data.skills || []).map((s: string) => ({ value: s })),
      memberships: (data.memberships || []).map((m: string) => ({ value: m })),
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    name: "skills",
    control: form.control,
  });

  const { fields: membershipFields, append: appendMembership, remove: removeMembership } = useFieldArray({
    name: "memberships",
    control: form.control,
  });

  async function onSubmit(values: SkillsFormValues) {
    try {
      const skills = values.skills.map(s => s.value);
      const memberships = values.memberships.map(m => m.value);
      await writeProfileData({ data: { skills, memberships } });
      toast.success("Skills & Memberships updated successfully!");
    } catch (error) {
      toast.error("Failed to update.");
      console.error(error);
    }
  }

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Manage Skills & Memberships</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Skills</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ value: "" })}>
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
            </div>
            
            <div className="grid gap-3">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g. Critical Thinking" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {skillFields.length === 0 && (
                <p className="text-muted-foreground text-sm">No skills added.</p>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Memberships</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => appendMembership({ value: "" })}>
                <Plus className="mr-2 h-4 w-4" /> Add Membership
              </Button>
            </div>
            
            <div className="grid gap-3">
              {membershipFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`memberships.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g. Member of IEEE" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeMembership(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {membershipFields.length === 0 && (
                <p className="text-muted-foreground text-sm">No memberships added.</p>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 p-4 bg-background border-t -mx-4 md:-mx-6 mt-6 flex justify-end">
            <Button type="submit" size="lg">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
