import { createServerFn } from "@tanstack/react-start";
import fs from "fs/promises";
import path from "path";

// In a real environment, this might be a database or process.cwd() would be different.
// For now, this points to the src/data/profile.json in the workspace.
const getProfileFilePath = () => path.resolve(process.cwd(), "src/data/profile.json");
const getGalleryDir = () => path.resolve(process.cwd(), "public/gallery");

export const readProfileData = createServerFn({ method: "GET" }).handler(async () => {
  const filePath = getProfileFilePath();
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
});

export const writeProfileData = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const newData = ctx.data;
  const filePath = getProfileFilePath();
  // We can merge with existing data to ensure we don't accidentally wipe out fields
  const fileContent = await fs.readFile(filePath, "utf-8");
  const existingData = JSON.parse(fileContent);
  
  const mergedData = { ...existingData, ...newData };
  
  await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2), "utf-8");
  return { success: true };
});

export const uploadImage = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const { filename, base64 } = ctx.data as { filename: string, base64: string };
  if (!filename || !base64) throw new Error("Missing filename or base64 data");
  
  // Extract base64 data (remove data:image/png;base64, prefix if present)
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  
  const galleryDir = getGalleryDir();
  
  // Ensure directory exists
  try {
    await fs.mkdir(galleryDir, { recursive: true });
  } catch (err) {
    // Ignore error if it already exists
  }
  
  const filePath = path.resolve(galleryDir, filename);
  await fs.writeFile(filePath, buffer);
  
  return { success: true, path: `/gallery/${filename}` };
});
