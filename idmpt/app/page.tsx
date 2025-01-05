'use client'; // Add this to make it a Client Component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the next page after 2 seconds (2000ms)
    const timer = setTimeout(() => {
      router.push('/Auth/Register'); // Replace '/nextpage' with your target route
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout if the component is unmounted
  }, [router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center gap-4 pt-80">
        <h1 className="text-5xl font-bold font-sans text-blue-600 animate-fade-in">
          Idempotent
        </h1>
      </div>
    </div>
  );
}
