import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/')


  return (
    <main>
      You should be redirected      
    </main>
  );
}
