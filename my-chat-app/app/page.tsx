import Link from "next/link";



export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Link className="" href={'/login'}>Login</Link>
    </div>
  );
}
