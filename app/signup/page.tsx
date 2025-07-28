'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    integration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      form.fullName &&
      form.email &&
      form.password &&
      form.password === form.confirmPassword &&
      form.integration
    ) {
      login(form.email); // mock login
      router.push('/dashboard');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full space-y-8 border border-slate-200 p-10 rounded-xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Create your CyberScore account</h2>
          <p className="text-sm text-slate-500 mt-2">Start your free security assessment</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-6 max-w-xs mx-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Integration Preference</label>
            <select
              name="integration"
              value={form.integration}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a service</option>
              <option value="azure">Azure</option>
              <option disabled value="google">Google Cloud</option>
              <option disabled value="aws">AWS</option>
            </select>
          </div>

          <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 transition">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
