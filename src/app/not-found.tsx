import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#FAF0F2] text-[#690B1B] font-extrabold text-2xl flex items-center justify-center mb-4">
        404
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#111]">School Page Not Found</h2>
      <p className="mt-2 text-[14px] text-[#666] max-w-md">
        The school profile or resource you are looking for may have moved or is not yet listed.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-full bg-[#690B1B] text-white text-[14px] font-bold hover:bg-[#7A1022] transition-colors"
      >
        Return to Landing Page
      </Link>
    </div>
  );
}
