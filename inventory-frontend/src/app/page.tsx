import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/admin/machines/add')


  return (
    <main>
      You should be redirected      
    </main>
  );
}
