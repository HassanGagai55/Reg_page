import Image from 'next/image'
import Register from './register/page'
import Link from 'next/link'
export default function Home() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100 '>
      <div className='sm:shadow-xl px-8 pb-8 pt-12 space-y-12 sm:bg-white' >
        <Register/> 
        <p className='text-center'>
          Have an account?  <Link href="/login" className='text-indigo-500 hover:underline'>Sign in</Link>{''}
        </p>
      </div>
    </div>
  )
}