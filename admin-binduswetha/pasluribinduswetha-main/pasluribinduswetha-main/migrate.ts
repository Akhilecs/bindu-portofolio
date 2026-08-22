import fs from "fs";
import path from "path";
import { profile, stats, orbitTopics, researchAreas, publications, patents, awards, timeline, memberships, skills } from "./src/data/profile";

const data = {
  profile,
  stats,
  orbitTopics,
  researchAreas,
  publications,
  patents,
  awards,
  timeline,
  memberships,
  skills
};

const jsonPath = path.resolve(process.cwd(), "src/data/profile.json");
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log("Migration complete!");
