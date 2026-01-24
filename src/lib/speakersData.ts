import ashishVidyarthiImg from "../../Speakers images/Ashish Vidyarthi  1.png";
import vvLaxminarayanImg from "../../Speakers images/shri v.v lakshmi Narayana.png";
import liisaToivonenImg from "../../Speakers images/Liisa_Toivonen-Picsart-AiImageEnhancer-removebg-preview.png";
import biswajitSahaImg from "../../Speakers images/Biswajit Saha.png";

import chinuAgrawalImg from "../../Speakers images/Chinu Agrawal.png";
import swatiPopatImg from "../../Speakers images/5__Dr._Swati_Popat_Vats-removebg.png";
import sonalAndrewsImg from "../../Speakers images/Sonal Profile pic.png";
import anjumBabuKhanImg from "../../Speakers images/Anjum Babu Khan.png";

import balakistaReddyImg from "../../Speakers images/Balakista Reddy 2.png";
import brVishwanathamritaImg from "../../Speakers images/Br. Vishwanathamrita Chaitanya.png";
import profPushpanadhamImg from "../../Speakers images/Prof. Karanam.png";
import jawaharSurisettiImg from "../../Speakers images/Jawahar Surisetti.png";

export type Speaker = {
  name: string;
  title: string;
  image: string;
  accentColor: string;
  bgAccent: string;
  borderAccent: string;
};

export type SpeakerGroup = {
  id: string;
  label: string;
  speakers: Speaker[];
};

const accentStyles = [
  {
    accentColor: "from-primary to-deep-purple",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/30",
  },
  {
    accentColor: "from-secondary to-gold",
    bgAccent: "bg-secondary/10",
    borderAccent: "border-secondary/30",
  },
  {
    accentColor: "from-accent to-teal",
    bgAccent: "bg-accent/10",
    borderAccent: "border-accent/30",
  },
  {
    accentColor: "from-deep-purple to-primary",
    bgAccent: "bg-deep-purple/10",
    borderAccent: "border-deep-purple/30",
  },
  {
    accentColor: "from-gold to-secondary",
    bgAccent: "bg-gold/10",
    borderAccent: "border-gold/30",
  },
  {
    accentColor: "from-teal to-accent",
    bgAccent: "bg-teal/10",
    borderAccent: "border-teal/30",
  },
];

const withAccent = (index: number) => accentStyles[index % accentStyles.length];

export const speakerGroups: SpeakerGroup[] = [
  {
    id: "k12",
    label: "K12 Speakers",
    speakers: [
      {
        name: "Ashish Vidyarthi",
        title: "K12 Keynote Speaker",
        image: ashishVidyarthiImg,
        ...withAccent(0),
      },
      {
        name: "VV Laxminarayan",
        title: "K12 Keynote Speaker",
        image: vvLaxminarayanImg,
        ...withAccent(1),
      },
      {
        name: "Lisa Tasvonen",
        title: "K12 Keynote Speaker",
        image: liisaToivonenImg,
        ...withAccent(2),
      },
      {
        name: "Biswajit Saha",
        title: "K12 Keynote Speaker",
        image: biswajitSahaImg,
        ...withAccent(3),
      },
    ],
  },
  {
    id: "foundational",
    label: "Foundational Years",
    speakers: [
      {
        name: "Chinu Agrawal",
        title: "Foundational Years Speaker",
        image: chinuAgrawalImg,
        ...withAccent(1),
      },
      {
        name: "Swati Popat",
        title: "Foundational Years Speaker",
        image: swatiPopatImg,
        ...withAccent(2),
      },
      {
        name: "Sonal Andrews",
        title: "Foundational Years Speaker",
        image: sonalAndrewsImg,
        ...withAccent(3),
      },
      {
        name: "Anjum Babu Khan",
        title: "Foundational Years Speaker",
        image: anjumBabuKhanImg,
        ...withAccent(4),
      },
    ],
  },
  {
    id: "higher-education",
    label: "Higher Education Institution Speakers",
    speakers: [
      {
        name: "Balakista Reddy",
        title: "Higher Education Institution Speaker",
        image: balakistaReddyImg,
        ...withAccent(2),
      },
      {
        name: "Br. Vishwanathamrita Chaitanya",
        title: "Higher Education Institution Speaker",
        image: brVishwanathamritaImg,
        ...withAccent(3),
      },
      {
        name: "Prof. K. Pushpanadham",
        title: "Higher Education Institution Speaker",
        image: profPushpanadhamImg,
        ...withAccent(4),
      },
      {
        name: "Dr. Jawahar Surisetti",
        title: "Higher Education Institution Speaker",
        image: jawaharSurisettiImg,
        ...withAccent(5),
      },
    ],
  },
];

// All speakers for the full speakers page

// Import all images from the Speakers images folder.
// Vite will replace these with URLs at build time.
const allSpeakerImages = import.meta.glob("/Speakers images/*.{png,jpg,jpeg,avif}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const fileNameOverrides: Record<string, string> = {
  "Ashish Vidyarthi  1.png": "Ashish Vidyarthi",
  "shri v.v lakshmi Narayana.png": "VV Laxminarayan",
  "Liisa_Toivonen-Picsart-AiImageEnhancer-removebg-preview.png": "Lisa Tasvonen",
  "Liisa_Toivonen-Picsart-AiImageEnhancer-removebg-preview 2.png": "Lisa Tasvonen",
  "5__Dr._Swati_Popat_Vats-removebg.png": "Swati Popat",
  "Sonal Profile pic.png": "Sonal Andrews",
  "Jawahar Surisetti.png": "Dr. Jawahar Surisetti",
  "Prof. Karanam.png": "Prof. K. Pushpanadham",
};

const fileNameToDisplayName = (fileName: string): string => {
  if (fileNameOverrides[fileName]) {
    return fileNameOverrides[fileName];
  }

  const withoutExt = fileName.replace(/\.[^/.]+$/, "");

  let name = withoutExt
    .replace(/[_\-]+/g, " ")
    .replace(/\b(removebg|preview|thumb|Picsart AiImageEnhancer|AiImageEnhancer)\b/gi, "")
    .replace(/\b(PNG\d*|PNG|HR|NEW|Oct)\b/gi, "")
    .replace(/\b\d+\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!name) {
    name = "Guest Speaker";
  }

  return name;
};

const existingNames = new Set(
  speakerGroups.flatMap((group) => group.speakers.map((speaker) => speaker.name.toLowerCase())),
);

const extraSpeakers: Speaker[] = [];
let extraIndex = 0;

for (const [path, url] of Object.entries(allSpeakerImages)) {
  const segments = path.split("/");
  const fileName = segments[segments.length - 1] ?? "";
  const name = fileNameToDisplayName(fileName);

  const normalized = name.toLowerCase();
  if (!name || existingNames.has(normalized)) {
    continue;
  }

  extraSpeakers.push({
    name,
    title: "Speaker",
    image: url,
    ...withAccent(extraIndex + speakerGroups.length),
  });

  extraIndex += 1;
}

export const allSpeakers: Speaker[] = [
  ...speakerGroups.flatMap((group) => group.speakers),
  ...extraSpeakers,
];

