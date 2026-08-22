import data from "./profile.json";

export type Publication = {
  title: string;
  venue: string;
  year: number;
  type: "Journal" | "Conference" | "Book" | "Chapter";
  index?: string;
  link?: string;
};

export type GalleryImage = {
  src: string;
  caption: string;
};

export const profile = data.profile;
export const stats = data.stats;
export const orbitTopics = data.orbitTopics;
export const researchAreas = data.researchAreas;
export const publications: Publication[] = data.publications as Publication[];
export const patents = data.patents;
export const awards = data.awards;
export const timeline = data.timeline;
export const memberships = data.memberships;
export const skills = data.skills;
export const gallery: GalleryImage[] = data.gallery || [];
