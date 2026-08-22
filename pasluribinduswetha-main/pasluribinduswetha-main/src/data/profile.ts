export const profile = {
  name: "Dr. Pasuluri Bindu Swetha",
  role: "Professor of ECE · Dean, Innovation (CIIE)",
  tagline: "Academician · Researcher · Innovation Ambassador",
  summary:
    "Passionate learner with over 17 years of experience in teaching, administration, innovation and research. Recognised as Best Innovation Ambassador, Young Innovator and Best Researcher, I build innovation ecosystems and guide students toward real-world problem solving.",
  location: "Kurnool, Andhra Pradesh, India",
  linkedin: "https://www.linkedin.com/in/dr-p-bindu-swetha-40a0951a9/",
  orcid: "0000-0003-0617-6755",
  scopus: "57208226387",
  vidwan: "335484",
  openalex: "A5123041120",
};

export const stats = [
  { value: 51, suffix: "+", label: "Research Papers" },
  { value: 24, suffix: "+", label: "Conference Papers" },
  { value: 15, suffix: "", label: "Patents" },
  { value: 10, suffix: "", label: "Books / Chapters" },
  { value: 45, suffix: "+", label: "Certifications" },
  { value: 90, suffix: "+", label: "IIC Events" },
];

export const orbitTopics = [
  "VLSI & Embedded Systems",
  "Vedic Arithmetic Multipliers",
  "AI & Machine Learning",
  "Signal & Image Processing",
  "Biomedical Electronics",
  "Innovation & Mentoring",
];

export const researchAreas = [
  {
    title: "VLSI Design & Embedded Systems",
    icon: "Cpu",
    desc: "Advanced research in low-power architecture and optimization for modern integrated circuits.",
    keywords: ["Low-power CMOS", "GDI logic", "45nm design", "3D IC power optimisation"],
  },
  {
    title: "Vedic Mathematics & Multipliers",
    icon: "Sigma",
    desc: "Pioneering high-speed, low-power arithmetic multiplier architectures based on ancient Vedic algorithms.",
    keywords: ["Nikhilam algorithm", "Urdhva Tiryakbhyam", "Wallace-tree hybrids", "High-speed Arithmetic"],
  },
  {
    title: "Signal & Image Processing",
    icon: "AudioWaveform",
    desc: "Developing robust signal processing frameworks for next-generation telecommunication and image compression.",
    keywords: ["FIR filter architectures", "DSP for 5G/6G", "Image Compression", "Wavelet Analysis"],
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    icon: "BrainCircuit",
    desc: "Exploring advanced AI models, deep learning architectures, and quantum-inspired reinforcement learning.",
    keywords: ["Quantum-inspired RL", "Neuromorphic computing", "CNN-based fusion", "Cancer Prediction"],
  },
  {
    title: "Biomedical Electronics",
    icon: "HeartPulse",
    desc: "Designing highly sensitive, low-noise instrumentation for continuous health monitoring and diagnostics.",
    keywords: ["ECG acquisition", "Low-noise instrumentation amplifiers", "Wearables", "Mental Stress Monitoring"],
  },
  {
    title: "Innovation & Ecosystem Mentoring",
    icon: "Lightbulb",
    desc: "Building academic innovation ecosystems and mentoring students for real-world product development.",
    keywords: ["IIC ecosystems", "EPICS course design", "Student product mentoring", "AgriTech Hackathons"],
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: number;
  type: "Journal" | "Conference" | "Book" | "Chapter";
  index?: string;
  link?: string;
};

export const publications: Publication[] = [
  {
    title: "Machine learning assigned chirp-based modulation for high mobility beyond 5G and 6G communication environments",
    venue: "IGI Global",
    year: 2026,
    type: "Chapter",
    index: "SCOPUS",
  },
  {
    title: "Digital Twin AI-Assisted Optimization of Delay-Doppler Communication Systems for Smart Industrial Automation",
    venue: "IGI Global",
    year: 2026,
    type: "Chapter",
    index: "SCOPUS",
  },
  {
    title: "Quantum inspired reinforcement learning models for adaptive decision-making in neuromorphic computational systems",
    venue: "Emerging Hybrid Models for Neuromorphic AI & Quantum Computing, IGI Global",
    year: 2026,
    type: "Chapter",
    index: "DOI 10.4018/979-8-3373-7779-7.ch006",
    link: "https://www.igi-global.com/chapter/quantum-inspired-reinforcement-learning-models-for-adaptive-decision-making-in-neuromorphic-computational-systems/404176",
  },
  {
    title: "Cyber secure IoT framework for monitoring fiber reinforced polymer composites using embedded sensors",
    venue: "STM Journals & Composites",
    year: 2026,
    type: "Journal",
    index: "ESCI / WOS",
  },
  {
    title: "CMOA-CP: Chaotic Mother Optimization for Cancer Prediction",
    venue: "ICSCSS 2026, 4th Intl. Conf. on Sustainable Computing and Smart Systems",
    year: 2026,
    type: "Conference",
    index: "SCOPUS",
  },
  {
    title: "AI-driven Enterprise solution architecture for scalable cloud-native systems",
    venue: "ICICIT 2026, 6th Intl. Conf. on Inventive Computation & Information Technologies",
    year: 2026,
    type: "Conference",
    index: "SCOPUS",
  },
  {
    title: "Combined AES-256 Encryption with MATLAB and Verilog HDL Biometric Authentication",
    venue: "IEEE ICMCSI 2026, Nepal",
    year: 2026,
    type: "Conference",
    index: "SCOPUS",
  },
  {
    title: "A Scalable 64-Bit Hybrid Multiplier Combining Vedic Arithmetic and Wallace Tree Compression",
    venue: "IEEE ICMCSI 2026, Nepal",
    year: 2026,
    type: "Conference",
    index: "SCOPUS",
  },
  {
    title: "Enhancing Lossless Image Compression through Smart Partitioning, Selective Encoding, and Wavelet Analysis",
    venue: "SSRG Intl. Journal of Electronics & Communication Engineering, 11(5)",
    year: 2024,
    type: "Journal",
    index: "SCOPUS",
    link: "https://doi.org/10.14445/23488549/IJECE-V11I5P120",
  },
  {
    title: "Analysis of Carrier to Noise Density Ratio, Satellite Visibility and Skyplot of Multiple GNSS Constellations",
    venue: "IEEE ESCI 2024, Pune",
    year: 2024,
    type: "Conference",
    index: "SCOPUS",
  },
  {
    title: "Design of high-performance GDI logic based 8-tap FIR filter at 45nm CMOS using Nikhilam Multiplier",
    venue: "IJISAE",
    year: 2022,
    type: "Journal",
    index: "SCOPUS",
  },
  {
    title: "Design of Vedic multiplier based FIR filter for signal processing applications",
    venue: "Journal of Physics: Conference Series, IOP Publishing",
    year: 2021,
    type: "Journal",
    index: "SCOPUS / SCIE",
  },
  {
    title: "Design of a low noise and low-power Instrumentation amplifier for electrocardiogram acquisition",
    venue: "Informatica Journal, 32(11)",
    year: 2021,
    type: "Journal",
    index: "WOS / SCIE",
  },
  {
    title: "VLSI Design for Efficient RSD-Based ECC Processor Using Karatsuba Algorithm",
    venue: "International Journal of Engineering & Technology (UAE)",
    year: 2018,
    type: "Journal",
    index: "SCOPUS",
  },
  {
    title: "Architecting Intelligence: A framework for scalable engineering enterprise systems",
    venue: "Vinsa Publishing",
    year: 2026,
    type: "Book",
  },
  {
    title: "Data Science and Business Analytics: Concepts, Tools and Industry Applications",
    venue: "Garuda Publishers · ISBN 978-81-685207-5-2",
    year: 2026,
    type: "Book",
  },
  {
    title: "MongoDB Essentials: From Fundamentals to Advanced Applications",
    venue: "Independently Published · ISBN 979-8276436449",
    year: 2025,
    type: "Book",
  },
  {
    title: "Foundation of VLSI Design",
    venue: "RK Publications · ISBN 978-93-48020-25-3",
    year: 2024,
    type: "Book",
  },
  {
    title: "Microprocessors & Microcontrollers",
    venue: "South Asian Academic Publications · ISBN 978-93-92153-38-9",
    year: 2022,
    type: "Book",
  },
  {
    title: "Electronic Devices and Circuits",
    venue: "MANTECH Publications · ISBN 978-81-948050-2-1",
    year: 2021,
    type: "Book",
  },
  {
    title: "An Introduction to Verilog HDL – A Beginner's Guide",
    venue: "Mahi Publications · ISBN 978-81-940137-3-0",
    year: 2019,
    type: "Book",
  },
];

export const patents = [
  { title: "AI Assisted VLSI power optimization frameworks for 3D ICs", no: "202641032677", year: 2026, status: "Granted" },
  { title: "Ultra-low power wearable electronics with low leakage CMOS architecture", no: "202641032657", year: 2026, status: "Granted" },
  { title: "Design of portable ECG monitoring device", no: "484281-001", year: 2025, status: "Design Patent" },
  { title: "A novel FIR filter using GDI logic and Nikhilam-based Vedic multipliers", no: "202541106031", year: 2025, status: "Published" },
  { title: "Fusion of natural, medical and satellite images based on CNNs", no: "202541108582", year: 2025, status: "Filed" },
  { title: "Digital Multi-core SIMD Implementation for H.264/AVC Encoder", no: "202441018654", year: 2024, status: "Filed" },
  { title: "Crosstalk-induced delay faults in VLSI circuits using AI fan", no: "202441018656", year: 2024, status: "Filed" },
  { title: "Smart Billing System – Streamlining using RFID technology", no: "202441046363", year: 2024, status: "Filed" },
  { title: "Analog & Digital filters in biomedical applications using Nikhilam multipliers", no: "202241040065", year: 2022, status: "Filed" },
  { title: "Wearable device to monitor and control mental stress during isolation", no: "202041017124", year: 2020, status: "Filed" },
  { title: "Smart Multi-Functional Traffic Light using Organic Solar cell", no: "201911030347", year: 2019, status: "Filed" },
  { title: "Fuzzy Logic based Intelligent Electric Solar Dryer for Fruits", no: "201941032820", year: 2019, status: "Filed" },
];

export const awards = [
  { title: "Inspiring Woman Educationist of the Year", by: "Femme Times – Super 50 Women Awards", year: 2026 },
  { title: "Pratibha Puraskar Award (Education)", by: "Shalivahana Charitable Trust, Hyderabad", year: 2026 },
  { title: "International Distinguished Academic Leader Award", by: "Global Edu-Conclave", year: 2025 },
  { title: "Best Mentor Award", by: "Scientific International Publishing House", year: 2024 },
  { title: "Best Women Researcher Award", by: "ESN Publisher, IIT Madras Research Park", year: 2024 },
  { title: "Best Teacher Award", by: "Lead India, Vision Digital India", year: 2021 },
];

export const timeline = [
  { year: "2002–06", title: "B.Tech, ECE", detail: "JNTU Hyderabad, Telangana" },
  { year: "2007–25", title: "Assistant Professor, ECE", detail: "Vardhaman College of Engineering" },
  { year: "2010–12", title: "M.Tech, VLSI Design", detail: "Sathyabama Institute of Science & Technology" },
  { year: "2017–23", title: "Ph.D., Electronics Engineering", detail: "Sathyabama Institute of Science and Technology (Defended: Aug 8, 2023)" },
  { year: "2023–", title: "Director of Operations", detail: "Tech Arc business systems (Freelance)" },
  { year: "2024–", title: "Chief Innovation Officer", detail: "MAE Digital solutions (Freelance)" },
  { year: "2025–", title: "CIE", detail: "G Pullaiah College of Engineering and Technology" },
  { year: "2025–", title: "Professor & Dean, Innovation", detail: "Ravindra College of Engineering for Women (CIIE)" },
  { year: "2025–", title: "Innovation & Strategic Advisor", detail: "Lit Ruach Tech Innovations Pvt Ltd" },
];

export const memberships = [
  "Member of IEEE",
  "Life Member of ISTE",
  "Associate Member, Institute of Engineers (IE-India)",
  "Professional member — MUACEE, MIAENG, IFERP & ERDA",
  "Distinguished Professional Fellow, DFM–ISVE Ranchi",
];

export const skills = [
  "Adaptability",
  "Interpersonal Skills",
  "Critical Thinking",
  "Innovative Teaching",
  "Design & Ideas Mentoring",
  "EPICS Projects",
  "Student Development & Counselling",
];
