import { Award, Presentation, Store } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryCategory {
  name: string;
  icon: string; // Store icon name as string
  color: string;
  images: GalleryImage[];
}

export interface GalleryYear {
  year: string; // unique ID
  displayName: string;
  categories: GalleryCategory[];
}

// Icon mapping for rendering
export const iconMap = {
  Award: Award,
  Presentation: Presentation,
  Store: Store,
};

export const defaultGalleryData: GalleryYear[] = [
  {
    year: "2026-jan",
    displayName: "7th Edition Jan 2026",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2026-jan/Awards/DSC00104.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC02017.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05299.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05304.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05308.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05315.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05335.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05339.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC05981.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC06017.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC06033.JPG", alt: "Awards Ceremony 2026" },
          { src: "/gallery/2026-jan/Awards/DSC06046.JPG", alt: "Awards Ceremony 2026" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2026-jan/conference/DSC05041.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05099.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05120.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05130.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05135.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05168.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05194.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05208.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05221.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05235.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05245.JPG", alt: "Conference 2026" },
          { src: "/gallery/2026-jan/conference/DSC05280.JPG", alt: "Conference 2026" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2026-jan/Expo/IMG_7253.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7274.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7277.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7284.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7291.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7293.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7299.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7306.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7315.JPG", alt: "Expo 2026" },
          { src: "/gallery/2026-jan/Expo/IMG_7319.JPG", alt: "Expo 2026" },
        ],
      },
    ],
  },
  {
    year: "2024-25-jan",
    displayName: "6th Edition Jan 2025",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2024-25-jan/Awards/a10.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a11.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a14.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a16.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a4.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a40.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a5.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a6.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a8.jpg", alt: "Awards Ceremony 2024-25" },
          { src: "/gallery/2024-25-jan/Awards/a9.jpg", alt: "Awards Ceremony 2024-25" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2024-25-jan/Conference/10.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/18.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/21.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/27.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/3.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/4.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/6.jpg", alt: "Conference 2024-25" },
          { src: "/gallery/2024-25-jan/Conference/8.jpg", alt: "Conference 2024-25" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2024-25-jan/Expo/0S4A9011.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9023.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9026.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9031.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9036.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9042.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9048.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9050.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9057.jpg", alt: "Expo 2024-25" },
          { src: "/gallery/2024-25-jan/Expo/0S4A9067.jpg", alt: "Expo 2024-25" },
        ],
      },
    ],
  },
  {
    year: "2024-jan",
    displayName: "5th Edition Jan 2024",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2024-jan/Awards/a1.jpg", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a14.jpg", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a24.jpg", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a27.JPG", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a29.JPG", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a33.JPG", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a37.jpg", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a45.jpg", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a48.JPG", alt: "Awards Ceremony 2024" },
          { src: "/gallery/2024-jan/Awards/a49.JPG", alt: "Awards Ceremony 2024" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2024-jan/Conference/c10.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c11.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c2.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c3.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c4.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c5.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c6.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c7.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c8.jpg", alt: "Conference 2024" },
          { src: "/gallery/2024-jan/Conference/c9.jpg", alt: "Conference 2024" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2024-jan/Expo/e1.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e10.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e2.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e3.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e4.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e5.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e6.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e7.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e8.jpg", alt: "Expo 2024" },
          { src: "/gallery/2024-jan/Expo/e9.jpg", alt: "Expo 2024" },
        ],
      },
    ],
  },
  {
    year: "2023-24-dec",
    displayName: "5th Edition Dec 2023",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2023-24-dec/Awards/a12.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a16.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a25.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a38.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a40.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a41.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a43.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a47.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a48.jpg", alt: "Awards Ceremony 2023-24" },
          { src: "/gallery/2023-24-dec/Awards/a52.jpg", alt: "Awards Ceremony 2023-24" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2023-24-dec/Conference/c1.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c2.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c3.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c4.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c5.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c6.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c7.jpg", alt: "Conference 2023-24" },
          { src: "/gallery/2023-24-dec/Conference/c8.jpg", alt: "Conference 2023-24" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2023-24-dec/Expo/e1.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e10.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e2.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e3.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e4.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e5.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e6.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e7.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e8.jpg", alt: "Expo 2023-24" },
          { src: "/gallery/2023-24-dec/Expo/e9.jpg", alt: "Expo 2023-24" },
        ],
      },
    ],
  },
  {
    year: "2023",
    displayName: "4th Edition Nov 2023 Delhi Edition",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2023/Awards/a14.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a18.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a20.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a22.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a24.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a28.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a34.jpg", alt: "Awards Ceremony 2023" },
          { src: "/gallery/2023/Awards/a36.jpg", alt: "Awards Ceremony 2023" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2023/Coference/a1.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/a11.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/a12.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/a2.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/a4.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/a9.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/c9.jpg", alt: "Conference 2023" },
          { src: "/gallery/2023/Coference/e4.jpg", alt: "Conference 2023" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2023/Expo/e10.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e15.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e18.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e19.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e20.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e21.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e7.jpg", alt: "Expo 2023" },
          { src: "/gallery/2023/Expo/e9.jpg", alt: "Expo 2023" },
        ],
      },
    ],
  },
  {
    year: "2022",
    displayName: "3rd Edition",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2022/Awards/a14.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a2.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a25.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a26.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a27.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a3.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a5.jpg", alt: "Awards Ceremony 2022" },
          { src: "/gallery/2022/Awards/a7.jpg", alt: "Awards Ceremony 2022" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2022/Conference/a101.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a28.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a29.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a30.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a42.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a56.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/a60.jpg", alt: "Conference 2022" },
          { src: "/gallery/2022/Conference/c1.jpg", alt: "Conference 2022" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2022/Expo/e1.jpeg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e10.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e11.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e19.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e3.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e4.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e5.jpg", alt: "Expo 2022" },
          { src: "/gallery/2022/Expo/e7.jpg", alt: "Expo 2022" },
        ],
      },
    ],
  },
  {
    year: "2019",
    displayName: "EDU EXPO GLOBAL 2026 Edition",
    categories: [
      {
        name: "Awards",
        icon: "Award",
        color: "from-gold/20 to-gold/5",
        images: [
          { src: "/gallery/2019/Awards/a1.jpg", alt: "Awards Ceremony 2019" },
          { src: "/gallery/2019/Awards/a2.jpg", alt: "Awards Ceremony 2019" },
          { src: "/gallery/2019/Awards/a4.jpg", alt: "Awards Ceremony 2019" },
          { src: "/gallery/2019/Awards/a5.jpg", alt: "Awards Ceremony 2019" },
          { src: "/gallery/2019/Awards/a6.jpg", alt: "Awards Ceremony 2019" },
          { src: "/gallery/2019/Awards/a7.jpg", alt: "Awards Ceremony 2019" },
        ],
      },
      {
        name: "Conference",
        icon: "Presentation",
        color: "from-primary/20 to-primary/5",
        images: [
          { src: "/gallery/2019/Conference/a18.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a19.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a20.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a21.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a24.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a26.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a27.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a28.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a29.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a40.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a51.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/a68.jpg", alt: "Conference 2019" },
          { src: "/gallery/2019/Conference/c1.jpg", alt: "Conference 2019" },
        ],
      },
      {
        name: "Expo",
        icon: "Store",
        color: "from-accent/20 to-accent/5",
        images: [
          { src: "/gallery/2019/expo/e10.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e15.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e16.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e17.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e19.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e24.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e26.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e27.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e30.jpg", alt: "Expo 2019" },
          { src: "/gallery/2019/expo/e32.jpg", alt: "Expo 2019" },
        ],
      },
    ],
  },
];

// Legacy localStorage functions (kept for backward compatibility)
// New code should use galleryApi.ts instead
export const loadGalleryData = (): GalleryYear[] => {
  const stored = localStorage.getItem("gallery_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultGalleryData;
    }
  }
  return defaultGalleryData;
};

export const saveGalleryData = (data: GalleryYear[]): void => {
  localStorage.setItem("gallery_data", JSON.stringify(data));
};
