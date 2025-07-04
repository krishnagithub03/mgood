// (route)/Auth/page.js

// NO 'use client' here. This is now a Server Component.
import { Suspense } from 'react';
import PhoneAuth from "./_components/PhoneAuth";
import { Loader2 } from 'lucide-react'; // Or your preferred loading spinner

export default function AuthPage() {
  return (
    // The Suspense boundary wraps the component that uses client-side hooks.
    <Suspense fallback={
      // This is what users will see while the PhoneAuth component loads on the client.
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <PhoneAuth />
    </Suspense>
  );
}