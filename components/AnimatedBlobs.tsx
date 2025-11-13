"use client";

import { useGlassMode } from "@/lib/glass-mode-context";
import { useTheme } from "@/lib/theme-context";

export default function AnimatedBlobs() {
  const { isGlassModeEnabled } = useGlassMode();
  const { theme } = useTheme();

  if (!isGlassModeEnabled) {
    return null;
  }

  const primaryColor = theme.colors.primary;

  // Convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const blobColor = hexToRgba(primaryColor, 0.18);
  const outlineColor = hexToRgba(primaryColor, 0.25);

  // Define blob shapes with wavy, organic paths inspired by the reference SVG
  // Using many small curve segments to create smooth, flowing variations with pronounced up/down movement
  const blobShapes = [
    // Large blob - organic wavy shape with many curve segments creating flowing variations
    {
      path: "M100,50 C105,40 115,35 125,40 C135,45 140,60 135,75 C130,90 115,100 100,105 C85,110 70,108 60,100 C50,92 45,80 50,70 C55,60 70,55 85,58 C100,61 110,65 105,75 C100,85 90,90 80,85 C70,80 65,70 70,60 C75,50 85,48 95,52 C100,54 102,56 100,50 Z",
      size: 450,
      animationClass: "blob-animation-1",
      initialX: "10%",
      initialY: "10%",
    },
    // Medium blob - vertical wavy shape with smooth up/down variations
    {
      path: "M100,30 C110,25 120,30 125,45 C130,60 125,80 115,95 C105,110 90,120 75,115 C60,110 50,95 55,80 C60,65 75,55 90,60 C105,65 115,75 110,90 C105,105 95,115 80,110 C65,105 55,90 60,75 C65,60 80,50 95,55 C100,57 102,60 100,30 Z",
      size: 300,
      animationClass: "blob-animation-2",
      initialX: "70%",
      initialY: "20%",
    },
    // Small blob - compact organic shape with flowing curves
    {
      path: "M100,50 C105,40 115,45 120,55 C125,65 120,80 110,90 C100,100 85,105 75,100 C65,95 60,85 65,75 C70,65 85,60 95,65 C105,70 110,80 105,90 C100,100 90,105 80,100 C70,95 65,85 70,75 C75,65 85,60 95,65 C100,70 102,72 100,50 Z",
      size: 220,
      animationClass: "blob-animation-3",
      initialX: "20%",
      initialY: "60%",
    },
    // Medium-large blob - elongated wavy shape with pronounced variations
    {
      path: "M50,100 C40,90 35,75 45,65 C55,55 70,50 85,55 C100,60 110,75 105,90 C100,105 85,115 70,110 C55,105 45,95 50,85 C55,75 70,70 85,75 C100,80 110,90 105,105 C100,120 85,125 70,120 C55,115 45,105 50,100 Z",
      size: 380,
      animationClass: "blob-animation-4",
      initialX: "60%",
      initialY: "70%",
    },
    // Small-medium blob - diagonal organic shape with smooth curves
    {
      path: "M60,60 C70,50 85,55 90,70 C95,85 85,100 70,105 C55,110 40,100 45,85 C50,70 65,65 80,70 C95,75 100,90 90,105 C80,120 60,115 55,100 C50,85 60,75 75,80 C90,85 95,95 85,100 C75,105 65,100 60,95 C55,90 57,75 60,60 Z",
      size: 270,
      animationClass: "blob-animation-5",
      initialX: "80%",
      initialY: "50%",
    },
  ];

  return (
    <div className="blob-container">
      {blobShapes.map((blob, index) => (
        <svg
          key={index}
          className={`blob ${blob.animationClass}`}
          width={blob.size}
          height={blob.size}
          viewBox="0 0 200 200"
          style={{
            left: blob.initialX,
            top: blob.initialY,
          }}
        >
          <path
            d={blob.path}
            fill={blobColor}
            stroke={outlineColor}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

