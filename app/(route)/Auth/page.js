"use client";
import PhoneAuth from "../Auth/_components/PhoneAuth";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [returnUrl, setReturnUrl] = useState('/');
  
  // Extract the return URL from query parameters when component mounts
  useEffect(() => {
    const returnPath = searchParams.get('returnUrl');
    setReturnUrl(returnPath ? decodeURIComponent(returnPath) : '/');
  }, [searchParams]);

  async function handleSuccessfulLogin(token) {
    // Set the auth token
    document.cookie = `accessToken=${token}; path=/; max-age=3600; sameSite=lax; ${
      process.env.NODE_ENV === 'production' ? 'secure;' : ''
    }`;
    
    // Redirect to the originally requested page
    router.push(returnUrl);
  }
  return (
    <div>
        <PhoneAuth />
      </div>
  );
}
