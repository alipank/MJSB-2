'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
     push('/admin');
  }, []);

  return (
    <main>
      You should be redirected      
    </main>
  );
}
