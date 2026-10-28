'use client';

import React from 'react';

export interface CityOption {
  id: string;
  name: string;
  landmark: string;
  queryValue: string;
}

// 1. Mumbai — Gateway of India
export function MumbaiIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base steps */}
      <path d="M6 56H58" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 52H54" stroke={strokeColor} strokeWidth="1.5" />
      
      {/* Left wing */}
      <rect x="12" y="32" width="10" height="20" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M14 42C14 38 20 38 20 42V52H14V42Z" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M10 32H24" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M13 28H21V32H13V28Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Left outer turret */}
      <rect x="11" y="22" width="3" height="6" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M11 22C11 20 14 18 14 18C14 18 17 20 17 22" stroke={strokeColor} strokeWidth="1.5" />

      {/* Right wing */}
      <rect x="42" y="32" width="10" height="20" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M44 42C44 38 50 38 50 42V52H44V42Z" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M40 32H54" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M43 28H51V32H43V28Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Right outer turret */}
      <rect x="50" y="22" width="3" height="6" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M50 22C50 20 53 18 53 18C53 18 56 20 56 22" stroke={strokeColor} strokeWidth="1.5" />

      {/* Central Grand Arch Tower */}
      <rect x="22" y="24" width="20" height="28" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Grand Arch */}
      <path d="M26 52V40C26 34 38 34 38 40V52" stroke={strokeColor} strokeWidth="1.75" />
      <path d="M29 52V42C29 38 35 38 35 42V52" stroke={strokeColor} strokeWidth="1.25" strokeDasharray="1.5 1.5" />

      {/* Center Top Parapet & Turrets */}
      <path d="M20 24H44" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20H40V24H24V20Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Inner Minarets */}
      <path d="M22 24V14C22 13 24 12 25 12C26 12 28 13 28 14V24" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M36 24V14C36 13 38 12 39 12C40 12 42 13 42 14V24" stroke={strokeColor} strokeWidth="1.5" />
      {/* Central dome pediment */}
      <path d="M29 20C29 17 32 15 32 15C32 15 35 17 35 20" stroke={strokeColor} strokeWidth="1.5" />
      {/* Window slits */}
      <line x1="32" y1="26" x2="32" y2="30" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 2. Delhi-NCR — India Gate
export function DelhiIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Plinth */}
      <path d="M12 56H52" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 52H49" stroke={strokeColor} strokeWidth="1.5" />
      
      {/* Left Pier */}
      <rect x="18" y="24" width="9" height="28" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="22.5" y1="28" x2="22.5" y2="46" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Right Pier */}
      <rect x="37" y="24" width="9" height="28" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="41.5" y1="28" x2="41.5" y2="46" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />

      {/* Main Archway */}
      <path d="M27 52V36C27 29 37 29 37 36V52" stroke={strokeColor} strokeWidth="1.75" />
      <path d="M27 34C29 32 35 32 37 34" stroke={strokeColor} strokeWidth="1.2" />

      {/* Entablature */}
      <path d="M16 24H48" stroke={strokeColor} strokeWidth="1.75" />
      <rect x="19" y="18" width="26" height="6" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M17 18H47" stroke={strokeColor} strokeWidth="1.5" />
      
      {/* Stepped Attic & Top Bowl */}
      <rect x="22" y="14" width="20" height="4" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M25 14L27 10H37L39 14" stroke={strokeColor} strokeWidth="1.5" />
      <ellipse cx="32" cy="10" rx="4" ry="1.5" stroke={strokeColor} strokeWidth="1.2" fill={fillColor} />
    </svg>
  );
}

// 3. Bengaluru — Vidhana Soudha
export function BengaluruIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base steps */}
      <path d="M8 56H56" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M11 52H53" stroke={strokeColor} strokeWidth="1.5" />

      {/* Left wing */}
      <rect x="12" y="38" width="12" height="14" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="16" y1="42" x2="16" y2="48" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="20" y1="42" x2="20" y2="48" stroke={strokeColor} strokeWidth="1.2" />
      {/* Left side dome */}
      <path d="M15 38C15 33 21 33 21 38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="18" y1="33" x2="18" y2="30" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right wing */}
      <rect x="40" y="38" width="12" height="14" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="44" y1="42" x2="44" y2="48" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="48" y1="42" x2="48" y2="48" stroke={strokeColor} strokeWidth="1.2" />
      {/* Right side dome */}
      <path d="M43 38C43 33 49 33 49 38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="46" y1="33" x2="46" y2="30" stroke={strokeColor} strokeWidth="1.2" />

      {/* Central Portico / Colonnade */}
      <rect x="24" y="34" width="16" height="18" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Pillars */}
      <line x1="27" y1="38" x2="27" y2="52" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="30.3" y1="38" x2="30.3" y2="52" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="33.7" y1="38" x2="33.7" y2="52" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="37" y1="38" x2="37" y2="52" stroke={strokeColor} strokeWidth="1.5" />

      {/* Pediment roof */}
      <path d="M22 34H42L32 26L22 34Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />

      {/* Central Grand Dome & Finial */}
      <rect x="28" y="22" width="8" height="4" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M27 22C27 15 37 15 37 22" stroke={strokeColor} strokeWidth="1.75" />
      <line x1="32" y1="15" x2="32" y2="10" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="9" r="1.5" fill={strokeColor} />
    </svg>
  );
}

// 4. Hyderabad — Charminar
export function HyderabadIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base */}
      <path d="M12 56H52" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Central Body with Grand Arch */}
      <rect x="20" y="34" width="24" height="22" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M25 56V44C25 38 39 38 39 44V56" stroke={strokeColor} strokeWidth="1.75" />

      {/* Upper Floor Gallery & Cornice */}
      <rect x="18" y="26" width="28" height="8" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="16" y1="26" x2="48" y2="26" stroke={strokeColor} strokeWidth="1.75" />
      {/* Arched window slits */}
      <path d="M23 30V32M27 30V32M32 30V32M37 30V32M41 30V32" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Corner Minarets — Left */}
      <rect x="14" y="24" width="6" height="32" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M13 24H21" stroke={strokeColor} strokeWidth="1.5" />
      <rect x="15" y="16" width="4" height="8" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M13 16H21" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M15 16C15 12 19 12 19 16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="17" y1="12" x2="17" y2="8" stroke={strokeColor} strokeWidth="1.2" />

      {/* Corner Minarets — Right */}
      <rect x="44" y="24" width="6" height="32" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M43 24H51" stroke={strokeColor} strokeWidth="1.5" />
      <rect x="45" y="16" width="4" height="8" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M43 16H51" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M45 16C45 12 49 12 49 16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="47" y1="12" x2="47" y2="8" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

// 5. Chandigarh — Open Hand Monument
export function ChandigarhIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ground trench / amphitheater line */}
      <path d="M8 56H56" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      
      {/* Sunken pedestal block */}
      <rect x="22" y="44" width="20" height="12" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="27" y1="44" x2="27" y2="56" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="37" y1="44" x2="37" y2="56" stroke={strokeColor} strokeWidth="1.2" />

      {/* Slender turning pivot shaft */}
      <rect x="30" y="32" width="4" height="12" stroke={strokeColor} strokeWidth="1.5" fill={strokeColor} />

      {/* The Open Hand Silhouette */}
      <path
        d="M26 32
           C22 30 18 24 19 19
           C20 15 24 15 26 19
           C26 17 28 13 32 12
           C36 12 37 15 37 18
           C39 15 42 15 44 18
           C46 20 45 24 43 27
           C45 28 47 30 46 33
           C43 35 38 33 34 32
           Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill={fillColor}
      />
      {/* Thumb / Palm contour */}
      <path d="M26 24C28 27 34 27 36 24" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 6. Ahmedabad — Sidi Saiyyed / Torana Arch
export function AhmedabadIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base */}
      <path d="M10 56H54" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Left Tower Pier */}
      <rect x="14" y="24" width="8" height="32" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M12 24H24" stroke={strokeColor} strokeWidth="1.5" />
      <rect x="15" y="16" width="6" height="8" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M15 16C15 12 21 12 21 16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="18" y1="12" x2="18" y2="8" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right Tower Pier */}
      <rect x="42" y="24" width="8" height="32" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M40 24H52" stroke={strokeColor} strokeWidth="1.5" />
      <rect x="43" y="16" width="6" height="8" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M43 16C43 12 49 12 49 16" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="46" y1="12" x2="46" y2="8" stroke={strokeColor} strokeWidth="1.2" />

      {/* Central Screen Arch & Jali Work */}
      <rect x="22" y="26" width="20" height="30" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M25 56V40C25 31 39 31 39 40V56" stroke={strokeColor} strokeWidth="1.75" />
      {/* Jali Lattice Tree Pattern */}
      <path d="M32 46V36M28 40L32 37L36 40M29 44L32 41L35 44" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Top cornice banner */}
      <path d="M22 26H42" stroke={strokeColor} strokeWidth="2" />
      <path d="M24 22H40V26H24V22Z" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
}

// 7. Pune — Shaniwar Wada
export function PuneIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ground plinth */}
      <path d="M10 56H54" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Left Semi-Circular Bastion */}
      <path d="M14 56V32C14 28 20 28 24 30V56" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Left Crenellations / Arrow slits */}
      <path d="M13 28H25V32H13V28Z" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="18" y1="36" x2="18" y2="40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="44" x2="18" y2="48" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Right Semi-Circular Bastion */}
      <path d="M40 56V30C44 28 50 28 50 32V56" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      {/* Right Crenellations / Arrow slits */}
      <path d="M39 28H51V32H39V28Z" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="46" y1="36" x2="46" y2="40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="46" y1="44" x2="46" y2="48" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Central Fortified Delhi Darwaza */}
      <rect x="24" y="30" width="16" height="26" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M28 56V42C28 37 36 37 36 42V56" stroke={strokeColor} strokeWidth="1.75" />
      {/* Spiked timber gates center line */}
      <line x1="32" y1="42" x2="32" y2="56" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Nagarkhana / Upper Pavilion */}
      <path d="M22 28H42" stroke={strokeColor} strokeWidth="1.75" />
      <rect x="25" y="20" width="14" height="8" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M24 20L32 14L40 20" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="29" y1="23" x2="29" y2="28" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="35" y1="23" x2="35" y2="28" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

// 8. Chennai — Dravidian Temple Gopuram
export function ChennaiIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base */}
      <path d="M12 56H52" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Tier 1 — Base Gateway */}
      <rect x="16" y="44" width="32" height="12" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M27 56V48C27 45 37 45 37 48V56" stroke={strokeColor} strokeWidth="1.75" />

      {/* Tier 2 */}
      <path d="M18 44L20 36H44L46 44" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="26" y1="39" x2="26" y2="42" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="32" y1="39" x2="32" y2="42" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="38" y1="39" x2="38" y2="42" stroke={strokeColor} strokeWidth="1.2" />

      {/* Tier 3 */}
      <path d="M21 36L23 28H41L43 36" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="28" y1="31" x2="28" y2="34" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="32" y1="31" x2="32" y2="34" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="36" y1="31" x2="36" y2="34" stroke={strokeColor} strokeWidth="1.2" />

      {/* Tier 4 */}
      <path d="M24 28L26 21H38L40 28" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />

      {/* Barrel Vault Roof (Shikhara) */}
      <path d="M26 21C26 17 38 17 38 21Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />

      {/* Kalasam Finials */}
      <line x1="29" y1="16" x2="29" y2="13" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="16" x2="32" y2="11" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="16" x2="35" y2="13" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 9. Kolkata — Victoria Memorial
export function KolkataIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Base steps */}
      <path d="M8 56H56" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 52H52" stroke={strokeColor} strokeWidth="1.5" />

      {/* Left pavilion wing */}
      <rect x="14" y="38" width="12" height="14" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M16 38C16 33 24 33 24 38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="20" y1="33" x2="20" y2="30" stroke={strokeColor} strokeWidth="1.2" />

      {/* Right pavilion wing */}
      <rect x="38" y="38" width="12" height="14" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <path d="M40 38C40 33 48 33 48 38" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="44" y1="33" x2="44" y2="30" stroke={strokeColor} strokeWidth="1.2" />

      {/* Central Portico with Columns */}
      <rect x="25" y="36" width="14" height="16" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
      <line x1="28" y1="40" x2="28" y2="52" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="32" y1="40" x2="32" y2="52" stroke={strokeColor} strokeWidth="1.5" />
      <line x1="36" y1="40" x2="36" y2="52" stroke={strokeColor} strokeWidth="1.5" />

      {/* Classical pediment */}
      <path d="M24 36H40L32 30L24 36Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />

      {/* Grand Central Dome */}
      <rect x="28" y="24" width="8" height="6" stroke={strokeColor} strokeWidth="1.5" />
      <path d="M26 24C26 14 38 14 38 24" stroke={strokeColor} strokeWidth="1.75" />
      
      {/* Angel of Victory finial */}
      <line x1="32" y1="14" x2="32" y2="9" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="8" r="1.5" fill={strokeColor} />
    </svg>
  );
}

// 10. Kochi — Houseboat & Coastal Palm Trees
export function KochiIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Water ripples */}
      <path d="M12 56H52" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 52H48" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Left Palm Tree */}
      <path d="M18 52C18 42 16 32 14 26" stroke={strokeColor} strokeWidth="1.75" strokeLinecap="round" />
      {/* Fronds */}
      <path d="M14 26C10 24 8 20 8 16" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 26C14 21 16 16 20 15" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 26C10 27 6 30 7 34" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Right Palm Tree */}
      <path d="M46 52C46 42 48 32 50 26" stroke={strokeColor} strokeWidth="1.75" strokeLinecap="round" />
      {/* Fronds */}
      <path d="M50 26C54 24 56 20 56 16" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 26C50 21 48 16 44 15" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 26C54 27 58 30 57 34" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Traditional Kettuvallam (Houseboat / Net Frame) */}
      <path
        d="M20 48
           C22 51 42 51 44 48
           L46 44H18L20 48Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        fill={fillColor}
      />
      {/* Curved Arched Thatched Roof Canopy */}
      <path
        d="M21 44
           C21 34 43 34 43 44
           Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill={fillColor}
      />
      <line x1="28" y1="38" x2="28" y2="44" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="36" y1="38" x2="36" y2="44" stroke={strokeColor} strokeWidth="1.2" />
    </svg>
  );
}

// 11. All India / Pan-India Icon
export function AllIndiaIcon({ active = false, className = "w-10 h-10" }: { active?: boolean; className?: string }) {
  const strokeColor = active ? "#0D9488" : "#475569";
  const fillColor = active ? "#CCFBF1" : "none";
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="22" stroke={strokeColor} strokeWidth="1.75" fill={fillColor} />
      <circle cx="32" cy="32" r="5" stroke={strokeColor} strokeWidth="1.5" fill={strokeColor} />
      {/* Compass / Chakra rays */}
      <path d="M32 14V22M32 42V50M14 32H22M42 32H50" stroke={strokeColor} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M19 19L25 25M39 39L45 45M45 19L39 25M25 39L19 45" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export const CITIES_CONFIG: CityOption[] = [
  { id: 'Mumbai', name: 'Mumbai', landmark: 'Gateway of India', queryValue: 'Mumbai' },
  { id: 'Delhi-NCR', name: 'Delhi-NCR', landmark: 'India Gate', queryValue: 'Delhi' },
  { id: 'Bengaluru', name: 'Bengaluru', landmark: 'Vidhana Soudha', queryValue: 'Bengaluru' },
  { id: 'Hyderabad', name: 'Hyderabad', landmark: 'Charminar', queryValue: 'Hyderabad' },
  { id: 'Chandigarh', name: 'Chandigarh', landmark: 'Open Hand', queryValue: 'Chandigarh' },
  { id: 'Ahmedabad', name: 'Ahmedabad', landmark: 'Sidi Saiyyed', queryValue: 'Ahmedabad' },
  { id: 'Pune', name: 'Pune', landmark: 'Shaniwar Wada', queryValue: 'Pune' },
  { id: 'Chennai', name: 'Chennai', landmark: 'Temple Gopuram', queryValue: 'Chennai' },
  { id: 'Kolkata', name: 'Kolkata', landmark: 'Victoria Memorial', queryValue: 'Kolkata' },
  { id: 'Kochi', name: 'Kochi', landmark: 'Houseboat & Nets', queryValue: 'Kochi' },
];

export function getCityLandmarkIcon(cityId: string, active: boolean, className = "w-10 h-10") {
  const norm = cityId.toLowerCase();
  if (norm.includes('mumbai')) return <MumbaiIcon active={active} className={className} />;
  if (norm.includes('delhi')) return <DelhiIcon active={active} className={className} />;
  if (norm.includes('bengaluru') || norm.includes('bangalore')) return <BengaluruIcon active={active} className={className} />;
  if (norm.includes('hyderabad')) return <HyderabadIcon active={active} className={className} />;
  if (norm.includes('chandigarh')) return <ChandigarhIcon active={active} className={className} />;
  if (norm.includes('ahmedabad')) return <AhmedabadIcon active={active} className={className} />;
  if (norm.includes('pune')) return <PuneIcon active={active} className={className} />;
  if (norm.includes('chennai')) return <ChennaiIcon active={active} className={className} />;
  if (norm.includes('kolkata')) return <KolkataIcon active={active} className={className} />;
  if (norm.includes('kochi') || norm.includes('cochin')) return <KochiIcon active={active} className={className} />;
  return <AllIndiaIcon active={active} className={className} />;
}

interface CitySelectorGridProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  className?: string;
}

export default function CitySelectorGrid({
  selectedCity,
  onSelectCity,
  className = "",
}: CitySelectorGridProps) {
  const isCitySelected = (cityId: string, queryValue: string) => {
    if (!selectedCity || selectedCity === 'All') return false;
    const current = selectedCity.toLowerCase();
    const id = cityId.toLowerCase();
    const query = queryValue.toLowerCase();
    return current === id || current === query || current.includes(id) || id.includes(current);
  };

  const topCities = CITIES_CONFIG.slice(0, 8);
  const bottomCities = CITIES_CONFIG.slice(8, 10);

  const renderCityButton = (city: CityOption) => {
    const active = isCitySelected(city.id, city.queryValue);
    return (
      <button
        key={city.id}
        type="button"
        onClick={() => {
          if (active) {
            onSelectCity('All');
          } else {
            onSelectCity(city.name);
          }
        }}
        className={`group relative py-2.5 sm:py-5 px-1 sm:px-5 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer select-none focus:outline-none touch-manipulation ${
          active 
            ? 'bg-[#F0FDFA]' 
            : 'bg-white hover:bg-[#F8FAFC]'
        }`}
        title={`Explore schools in ${city.name} (${city.landmark})`}
        aria-pressed={active}
      >
        {/* Architectural Landmark Icon */}
        <div className={`mb-1 sm:mb-3 transition-transform duration-200 ${active ? 'scale-105' : 'group-hover:scale-105'}`}>
          {getCityLandmarkIcon(city.id, active, "w-6 h-6 sm:w-11 sm:h-11")}
        </div>

        {/* City Name with Active Teal Dot */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-h-[16px] sm:min-h-[22px] max-w-full px-0.5">
          {active && (
            <span 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0D9488] shrink-0 animate-pulse" 
              aria-hidden="true" 
            />
          )}
          <span
            className={`text-[10px] sm:text-[13.5px] leading-tight truncate transition-colors ${
              active
                ? 'font-bold text-[#0F172A]'
                : 'font-medium text-[#475569] group-hover:text-[#0F172A]'
            }`}
          >
            {city.name}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Top 2 rows: 4 columns max */}
      <div className="w-full bg-[#E2E8F0] p-px rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="grid grid-cols-4 gap-px">
          {topCities.map((city) => renderCityButton(city))}
        </div>
      </div>

      {/* Third row: the 2 remaining cities (Kolkata & Kochi) centered in the middle */}
      <div className="w-1/2 bg-[#E2E8F0] px-px pb-px rounded-b-2xl border-x border-b border-[#E2E8F0] shadow-xs overflow-hidden -mt-px">
        <div className="grid grid-cols-2 gap-px">
          {bottomCities.map((city) => renderCityButton(city))}
        </div>
      </div>
    </div>
  );
}

