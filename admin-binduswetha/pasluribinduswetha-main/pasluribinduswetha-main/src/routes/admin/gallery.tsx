import { createFileRoute } from "@tanstack/react-router";
import { readProfileData, writeProfileData, uploadImage } from "@/lib/api";
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
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/gallery")({
  loader: async () => await readProfileData(),
  component: GalleryManager,
});

const galleryImageSchema = z.object({
  src: z.string().min(2, "Filename is required"),
  caption: z.string().min(2, "Caption is required"),
  base64: z.string().optional(), // Used temporarily for new uploads
});

const galleryFormSchema = z.object({
  gallery: z.array(galleryImageSchema),
});

type GalleryFormValues = z.infer<typeof galleryFormSchema>;

function GalleryManager() {
  const data = Route.useLoaderData();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      gallery: data.gallery || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "gallery",
    control: form.control,
  });

  const handleFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      // Set the filename securely based on the uploaded file
      const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      form.setValue(`gallery.${index}.src`, filename);
      form.setValue(`gallery.${index}.base64`, base64);
    };
    reader.readAsDataURL(file);
  };

  async function onSubmit(values: GalleryFormValues) {
    try {
      setIsUploading(true);
      
      // Process file uploads first
      for (const item of values.gallery) {
        if (item.base64) {
          await uploadImage({ data: { filename: item.src, base64: item.base64 } });
          // Clear base64 after upload so we don't save huge strings to profile.json
          delete item.base64;
        }
      }

      await writeProfileData({ data: { gallery: values.gallery } });
      toast.success("Gallery updated successfully!");
    } catch (error) {
      toast.error("Failed to update gallery.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Gallery</h2>
          <p className="text-muted-foreground mt-1">
            Upload new photos or update captions.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={() => append({ src: "", caption: "" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => {
              const srcValue = form.watch(`gallery.${index}.src`);
              const base64Value = form.watch(`gallery.${index}.base64`);
              
              // Determine preview source (either newly selected base64 or existing path)
              const previewSrc = base64Value || (srcValue ? `/gallery/${srcValue}` : null);
              
              return (
                <div key={field.id} className="bg-card border rounded-lg p-4 shadow-sm relative pr-12 flex flex-col sm:flex-row gap-6 items-start">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-shrink-0 w-full sm:w-48 aspect-[4/3] bg-muted rounded-md flex flex-col items-center justify-center overflow-hidden border relative group">
                    {previewSrc ? (
                      <img 
                        src={previewSrc} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBsLTQgNCIvPjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                    )}
                    
                    {/* Overlay for file upload */}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity">
                      <Upload className="h-6 w-6 mb-2" />
                      <span className="text-xs font-medium">{previewSrc ? 'Change Image' : 'Upload Image'}</span>
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(index, e)}
                      />
                    </label>
                  </div>

                  <div className="flex-grow space-y-4 w-full">
                    <FormField
                      control={form.control}
                      name={`gallery.${index}.src`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Filename (Auto-filled on upload)</FormLabel>
                          <FormControl>
                            <Input placeholder="Upload an image first..." readOnly className="bg-muted/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`gallery.${index}.caption`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caption</FormLabel>
                          <FormControl>
                            <Input placeholder="Describe the moment..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
            
            {fields.length === 0 && (
              <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
                No images added to the gallery yet.
              </div>
            )}
          </div>

          <div className="sticky bottom-0 p-4 bg-background border-t -mx-4 md:-mx-6 mt-6 flex justify-end z-10">
            <Button type="submit" size="lg" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
