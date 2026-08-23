import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import fs from "fs/promises";
import path from "path";

// Persistence configuration
const getProfileFilePath = () => process.env.PORTFOLIO_DATA_DIR 
  ? path.resolve(process.env.PORTFOLIO_DATA_DIR, "profile.json") 
  : path.resolve(process.cwd(), "src/data/profile.json");
  
const getGalleryDir = () => process.env.GALLERY_DATA_DIR 
  ? process.env.GALLERY_DATA_DIR 
  : path.resolve(process.cwd(), "public/gallery");

// Authentication functions
export const checkAuthFn = createServerFn({ method: "GET" }).handler(async () => {
  return getCookie("admin_session") === "authenticated";
});

export const loginFn = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const { password } = ctx.data;
  const correctPassword = process.env.ADMIN_PASSWORD || "admin";
  
  if (password === correctPassword) {
    setCookie("admin_session", "authenticated", { 
      maxAge: 60 * 60 * 24 * 7, 
      httpOnly: true, 
      path: "/",
      sameSite: "lax"
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
});

export const readProfileData = createServerFn({ method: "GET" }).handler(async () => {
  const filePath = getProfileFilePath();
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
});

export const writeProfileData = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  // Enforce authentication
  if (getCookie("admin_session") !== "authenticated") {
    throw new Error("Unauthorized");
  }

  const newData = ctx.data;
  const filePath = getProfileFilePath();
  // Merge with existing data to ensure we don't accidentally wipe out fields
  const fileContent = await fs.readFile(filePath, "utf-8");
  const existingData = JSON.parse(fileContent);
  
  const mergedData = { ...existingData, ...newData };
  
  await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2), "utf-8");
  return { success: true };
});

export const uploadImage = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  // Enforce authentication
  if (getCookie("admin_session") !== "authenticated") {
    throw new Error("Unauthorized");
  }

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
