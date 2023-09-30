'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import  createShopifyCustomer  from '@/app/api/shopify/createShopifyCustomer'; // Replace with the actual path to your Shopify API function
import React, { useState, FormEvent } from 'react';

  interface FormData {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }
  const Register: React.FC = () => {
    const [formData, setFormData] = useState({
      firstName: '', // Update to firstName
      lastName: '', // Update to lastName
      email: '',
      password: '',
    });
    const [email, setEmail] =   useState('')
    const [password, setPassword] =   useState('')
    const [fname, setFName] =   useState('')
    const [lname, setLName] =   useState('')
    const onSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault()
        console.log("register")
         try {
      // Create a customer on Shopify
      const shopifyCustomer = await createShopifyCustomer(formData);
      const res = await fetch('/api/shopify',{
        method: 'POST',
        body: JSON.stringify({
          fname,
          lname,
          email,
          password
        }),
        
      })
      if(res.ok){
      // Handle the Shopify customer response as needed
      console.log('Shopify customer created:', shopifyCustomer);
      }
    } catch (error) {
      console.error('Error creating Shopify customer:', error);
    }
}
  return (  
    <form onSubmit={onSubmit} className="space-y-5 	border-sky-500 rounded-full w-full sm:w-[400px]">  
          <div className="flex justify-center w-full max-w-sm items-center space-x-2 gap-1.5 text-sky-950 font-semibold text-2xl mb-4 ">
            <label>Create Account</label>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 border-sky-500	 text-slate-800" >
            <Input 
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            type="fname" placeholder="First Name"  id="fname" />
          </div>  
          <div className="grid w-full  max-w-sm items-center gap-1.5 border-sky-500	text-slate-800	">
            <Input 

            type="lname" placeholder="Last Name"  id="lname"/>
          </div>
         <div className="grid w-full max-w-sm items-center gap-1.5 border-sky-500	text-slate-800	">
            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" placeholder="Email"  id="email"
            />
         </div>
         <div className="grid w-full max-w-sm items-center gap-1.5 border-sky-500	 text-slate-800	">
            <Input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" placeholder="Password"  
            id="password"
            />
         </div>
         <div className="shadow-xl p-2 text-slate-200 grid w-full max-w-sm items-center gap-1.5 bg-slate-700"> 
            <Button>Register</Button>
         </div>
    </form>
  )
}

export default Register