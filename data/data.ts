export const Experiece = [
  {
    id: "item-1",
    title: "Aterkia Diponegoro",
    image: "/images/aterkia.png",
    alt: "Aterkia",
    position: "Machine Learning Engineer & Web Developer",
    description:
      "Contributed to the development of an integrated ship monitoring system that enables real-time data observation and analysis. I was responsible for designing and building a specialized dataset tailored to operational and mission-specific requirements, ensuring accurate data representation and reliable system performance. This work involved combining machine learning concepts with web-based visualization to support informed decision-making and enhance overall system efficiency.",
  },
  {
    id: "item-2",
    title: "Diskominfo Kota Semarang",
    image: "/images/kominfo.png",
    alt: "Diskominfo Kota Semarang",
    position: "Fullstack Developer",
    description:
      "Worked as a Fullstack Developer on a public road infrastructure reporting platform aimed at improving pothole management and urban maintenance. I implemented YOLOv8-based computer vision to automatically detect road potholes from image data, integrating machine learning models into a web application. This project combined frontend and backend development with AI-driven automation to deliver an efficient, scalable, and user-friendly reporting system for government use.",
  },
  {
    id: "item-3",
    title: "Bangkit Academy",
    image: "/images/bangkit.png",
    alt: "Bangkit Academy",
    position: "Machine Learning Path",
    description:
      "Selected as a participant in the Machine Learning Path at Bangkit Academy, a competitive program led by Google, GoTo, Tokopedia, and Traveloka. Throughout the program, I focused on applying machine learning techniques to solve real-world problems, gaining hands-on experience in data preprocessing, model training, evaluation, and deployment. The curriculum emphasized industry-relevant tools and best practices, strengthening both my technical skills and my readiness for a professional career in machine learning and AI.",
  },
  {
    id: "item-4",
    title: "Teaching Assistant - Diponegoro University",
    image: "/images/undip.png",
    alt: "Asisten Praktikum",
    position: "Teaching Assistant",
    description:
      "Served as a Teaching Assistant for the Digital Systems and Mobile Device Programming courses. I assisted students in understanding fundamental concepts such as digital logic, combinational and sequential circuits, as well as mobile application development principles. My responsibilities included guiding practical lab sessions, helping debug code and hardware simulations, and supporting students in completing assignments and projects, while fostering an effective and collaborative learning environment.",
  },
];

export const Project = [
  {
    id: 1,
    title: "Dopamind+",
    image: "/images/dopamind.png",
    link: "https://dopamind.site",
    description:
      "Bangkit Academy capstone app that tracks users' mood through daily diary entries and provides mental health insights.",
    stack: ["Android", "Kotlin", "Firebase", "ML", "TensorFlow Lite"],
    role: "ML / App Contributor",
    highlights: [
      "Daily journal → mood tracking & summary",
      "Insight dashboard + personalized recommendation",
      "Optimized model for on-device inference",
    ],
    repo: null,
  },
  {
    id: 2,
    title: "Codelingo",
    image: "/images/codelingo1.png",
    link: "https://codelingo-dev.vercel.app/",
    description:
      "Coding platform for elementary students that teaches fundamentals through games and challenges.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
    role: "Full-stack (mostly Frontend)",
    highlights: [
      "Gamified lessons & quiz flow",
      "Responsive UI for kids-friendly UX",
      "Progress tracking per lesson",
    ],
    repo: null,
  },
  {
    id: 3,
    title: "The Ace",
    image: "/images/the-ace.png",
    link: "https://theace-2024.vercel.app/",
    description:
      "Competition registration website for Computer Engineering UNDIP, streamlining event sign-ups.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
    role: "Frontend Developer",
    highlights: [
      "Registration flow + validation",
      "Admin-friendly data management",
      "Mobile-first responsive layout",
    ],
    repo: null,
  },
  {
    id: 4,
    title: "Ship Monitoring",
    image: "/images/monitoring.png",
    link: "/",
    description:
      "Real-time ship monitoring for autonomous applications: speed, direction, angle, and mission status.",
    stack: ["React", "Leaflet", "Firebase RTDB", "WebSocket"],
    role: "Software / Monitoring UI",
    highlights: [
      "Realtime telemetry visualization",
      "Map tracking + path history",
      "Mission state & alert indicators",
    ],
    repo: null,
  },
  {
    id: 5,
    title: "KKI 2025",
    image: "/images/_FNK0371.JPG",
    link: "/",
    description:
      "Computer Vision algorithm development for Indonesian Ship Contest (KKI) 2025.",
    stack: ["Python", "OpenCV", "YOLO", "Edge/Robotics"],
    role: "Computer Vision Engineer",
    highlights: [
      "Robust detection under outdoor lighting",
      "Optimized inference pipeline for realtime",
      "Integrated CV output to autonomy stack",
    ],
    repo: null,
  },
  {
    id: 6,
    title: "Capstone Project Drone",
    image: "/images/drone-us.jpeg",
    link: "/",
    description:
      "Custom YOLOv8 for real-time drone-based fire & smoke detection on Raspberry Pi 5 with Hailo-8L.",
    stack: ["YOLOv8", "Python", "Raspberry Pi 5", "Hailo-8L", "ONNX"],
    role: "Computer Vision / Edge AI",
    highlights: [
      "Edge inference (no cloud dependency)",
      "Fire vs smoke classification with confidence thresholding",
      "Benchmarking latency & FPS improvements",
    ],
    repo: null,
  },
  {
    id: 7,
    title: "Backend E-commerce with Golang",
    image: "/images/golang.png",
    link: "https://github.com/princeofverry/e-commerce-backend-go",
    description:
      "Golang E-commerce backend with JWT auth, CRUD, cart/checkout, orders, payment integration, and WebSocket updates.",
    stack: ["Go", "Gin", "GORM", "MySQL", "JWT", "WebSocket"],
    role: "Backend Engineer",
    highlights: [
      "JWT auth + role-based endpoints",
      "Checkout → order lifecycle management",
      "Realtime order status via WebSocket",
    ],
    repo: "https://github.com/princeofverry/e-commerce-backend-go",
  },
];

export const Award = [
  {
    id: 1,
    name: "3rd UI/UX Competition: Developed Nourish+, a health app tackling maternal and child mortality and stunting.",
    year: "2023",
  },
  {
    id: 2,
    name: "Top 5 Web Design Techomfest with Sinau Web App",
    year: "2024",
  },
  {
    id: 3,
    name: "Awardee of PPK Ormawa Funding for Digital Waste Bank Initiative (BEM FT)",
    year: "2024",
  },
  {
    id: 4,
    name: "Top 16 Indonesian Ship Contest (KKI), where I developed a comprehensive monitoring system for the ship and created a specialized dataset to support our mission goals.",
    year: "2024",
  },
  {
    id: 5,
    name: "1st Place Fun Race Indonesian Ship Contest (KKI)",
    year: "2025",
  },
  {
    id: 6,
    name: "Honorable Mention 2 (Juara Harapan 2) ASV Indonesian Ship Contest (KKI)",
    year: "2025",
  },
];

export const techStack = [
  {
    name: "Arduino",
    image: "/images/arduino.png",
  },
  {
    name: "Firebase",
    image: "/images/firebase.png",
  },
  {
    name: "JavaScript",
    image: "/images/javascript.png",
  },
  {
    name: "Python",
    image: "/images/python.png",
  },
  {
    name: "React",
    image: "/images/react.png",
  },
  {
    name: "Tailwind",
    image: "/images/tailwind.png",
  },
  {
    name: "Tensorflow",
    image: "/images/tensorflow.png",
  },
  {
    name: "TypeScript",
    image: "/images/typescript.png",
  },
  {
    name: "Golang",
    image: "/images/golang.png",
  },
  // {
  //   name: "NextJs",
  //   image: "/images/nextJS.png",
  // },
  {
    name: "Postgre",
    image: "/images/postgre.png",
  },
  // {
  //   name: "Flask",
  //   image: "/images/flask.png",
  // },
  {
    name: "OpenCV",
    image: "/images/opencv.png",
  },
];

export const NAVIGATION_LINKS = [
  // { label: "About", href: "#" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Object Detection", href: "/yolo" },
];

export const socialLinks = [
  {
    icon: "Instagram",
    href: "https://instagram.com/princeofverry",
    label: "Instagram",
  },
  {
    icon: "Linkedin",
    href: "https://linkedin.com/in/verry-kurniawan",
    label: "LinkedIn",
  },
  { icon: "Github", href: "https://github.com/princeofverry", label: "GitHub" },
  { icon: "Mail", href: "mailto:vexykrwn@gmail.com", label: "Email" },
];

export const marqueeTexts = [
  "Let's Collaborate",
  "Build Together",
  "Create Amazing Things",
  "Innovate & Grow",
];
