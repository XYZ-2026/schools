'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { School } from '@/types/school';
import { SCHOOLS_DATA } from '@/data/schoolsData';

interface SchoolContextType {
  compareList: string[]; // school slugs
  toggleCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;
  shortlist: string[];
  toggleShortlist: (slug: string) => void;
  isInShortlist: (slug: string) => boolean;
  getSchoolBySlug: (slug: string) => School | undefined;
  activeSchoolSlug: string | null;
  openSchoolModal: (slug: string) => void;
  closeSchoolModal: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [activeSchoolSlug, setActiveSchoolSlug] = useState<string | null>(null);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem('schools_compare');
      if (savedCompare) {
        const parsed = JSON.parse(savedCompare);
        // If the saved compare list is just the old hardcoded 2 default schools, clear it
        const isLegacyDefault = Array.isArray(parsed) &&
          parsed.length === 2 &&
          parsed.includes('dhirubhai-ambani-international-school') &&
          parsed.includes('oberoi-international-school');

        if (isLegacyDefault) {
          localStorage.removeItem('schools_compare');
        } else if (Array.isArray(parsed)) {
          setCompareList(parsed);
        }
      }
      const savedShortlist = localStorage.getItem('schools_shortlist');
      if (savedShortlist) {
        const parsed = JSON.parse(savedShortlist);
        if (Array.isArray(parsed)) setShortlist(parsed);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (activeSchoolSlug) {
        setActiveSchoolSlug(null);
        previousPathRef.current = null;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeSchoolSlug]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeSchoolSlug) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeSchoolSlug]);

  const openSchoolModal = (slug: string) => {
    setActiveSchoolSlug(slug);
    if (typeof window !== 'undefined') {
      if (!previousPathRef.current) {
        previousPathRef.current = window.location.pathname + window.location.search;
      }
      // Update the URL so the slug dynamically changes
      window.history.pushState({ modalOpen: true, slug }, '', `/schools/${slug}`);
    }
  };

  const closeSchoolModal = () => {
    setActiveSchoolSlug(null);
    if (typeof window !== 'undefined') {
      const returnPath = previousPathRef.current || '/schools';
      previousPathRef.current = null;
      window.history.pushState(null, '', returnPath);
    }
  };

  const toggleCompare = (slug: string) => {
    setCompareList((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((s) => s !== slug);
      } else {
        if (prev.length >= 4) {
          alert('You can compare a maximum of 4 schools at a time.');
          return prev;
        }
        updated = [...prev, slug];
      }
      try {
        localStorage.setItem('schools_compare', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeFromCompare = (slug: string) => {
    setCompareList((prev) => {
      const updated = prev.filter((s) => s !== slug);
      try {
        localStorage.setItem('schools_compare', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.removeItem('schools_compare');
    } catch {}
  };

  const isInCompare = (slug: string) => compareList.includes(slug);

  const toggleShortlist = (slug: string) => {
    setShortlist((prev) => {
      const updated = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem('schools_shortlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isInShortlist = (slug: string) => shortlist.includes(slug);

  const getSchoolBySlug = (slug: string) => SCHOOLS_DATA.find((s) => s.slug === slug);

  return (
    <SchoolContext.Provider
      value={{
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        shortlist,
        toggleShortlist,
        isInShortlist,
        getSchoolBySlug,
        activeSchoolSlug,
        openSchoolModal,
        closeSchoolModal,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
}
