'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace with your Shopify API credentials
      const apiKey = '66f142c3d18623a82df1cd88b554c9e6'; // Replace with your Shopify API Key
      const apiPassword = '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'; // Replace with your Shopify API Password
      // Retrieve customer data from Shopify based on the provided email
      const response = await axios.get(
        `https://dnk-shop1.myshopify/admin/api/2023-09/customers/search.json?query=email:${formData.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${apiKey}:${apiPassword}`).toString('base64')}`,
          },
        }
      );

      if (response.status === 200 && response.data.customers.length > 0) {
        // Customer with the provided email found
        const customer = response.data.customers[0];

        // Verify the password (you may need to implement password hashing and comparison)
        if (customer.password === formData.password) {
          // Password matches; user is logged in
          console.log('User logged in:', customer);

          // Redirect to a protected page or perform other actions
        } else {
          // Password does not match
          console.error('Incorrect password');
        }
      } else {
        // No customer found with the provided email
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 space-y-12 sm:bg-white flex justify-center w-full max-w-sm items-center space-x-2 gap-1.5 text-sky-950 font-semibold text-2xl mb-4">   
        <form className="space-y-5	border-sky-500 rounded-full w-full sm:w-[400px]" onSubmit={onSubmit}>  
          <div className="flex justify-center w-full max-w-sm items-center space-x-2 gap-1.5 text-sky-950 font-semibold text-2xl mb-4 ">
            <label>Login Page</label>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 border-sky-500	text-slate-800	">
            <Input 
              type="email" 
              placeholder="Email"  
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 border-sky-500	 text-slate-800	">
            <Input
              type="password" 
              placeholder="Password"  
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="shadow-xl p-2 text-slate-200 grid w-full max-w-sm items-center gap-1.5 bg-slate-700"> 
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>  
  );
}

export default Login;
