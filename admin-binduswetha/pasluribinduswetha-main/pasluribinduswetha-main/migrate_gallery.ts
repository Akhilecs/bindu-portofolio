import fs from "fs";
import path from "path";

const jsonPath = path.resolve(process.cwd(), "src/data/profile.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

data.gallery = [
  { src: "g1.jpg", caption: "Innovation delegation visit to T-Works, Hyderabad" },
  { src: "g2.jpg", caption: "Prototyping lab review — electric mobility platform" },
  { src: "g3.jpg", caption: "Industry–academia collaboration at T-Works" },
  { src: "g4.jpg", caption: "Advanced fabrication facility walkthrough" },
  { src: "g6.jpg", caption: "National AgriTech Hackathon 2025" },
  { src: "amaravathispoken.jpeg", caption: "Amaravathi Spoken Tutorial" },
  { src: "appeciation.jpeg", caption: "Appreciation and Recognition" },
  { src: "explain.jpeg", caption: "Explaining Core Concepts" },
  { src: "judging.jpeg", caption: "Judging Innovation Hackathon" },
  { src: "research.jpeg", caption: "Research Activities" },
  { src: "tablemeet.jpeg", caption: "Strategic Roundtable Meeting" },
  { src: "tp.jpeg", caption: "Technical Presentation" }
];

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log("Gallery added to profile.json");
