'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  { name: 'Azure', status: true, lastSynced: '2025-07-27 15:20' },
  { name: 'AWS', status: false, lastSynced: null },
  { name: 'Google Cloud', status: false, lastSynced: null },
];

export default function UserProfilePage() {
  const [fullName, setFullName] = useState('Dragos Vlasie');
  const [email, setEmail] = useState('dragos@cyberscore.ai');
  const [preference, setPreference] = useState('Azure');

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-slate-900 space-y-10">
      <h1 className="text-3xl font-bold text-center">User Profile</h1>
      <div className="grid grid-cols-[1fr_2fr] gap-1">
        {/* User Info */}
        <Card className="bg-white border max-w-md mx-auto border-slate-200 p-6 h-fit rounded-2xl shadow">
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Service Preference
              </label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option>Azure</option>
                <option disabled>AWS</option>
                <option disabled>Google Cloud</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Connected Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service) => (
            <Card
              key={service.name}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow"
            >
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  {service.name}
                </h2>
                <p
                  className={`text-sm ${
                    service.status ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  Status: {service.status ? '✅ Connected' : '❌ Not Connected'}
                </p>
                <p className="text-sm text-slate-500">
                  Last Synced: {service.lastSynced || 'N/A'}
                </p>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-blue-600 text-white hover:bg-blue-700 h-9 has-[>svg]:px-3 mr-4 px-5 py-2 rounded-full border-slate-300 shadow-sm transition-all duration-200 ease-in-out"
                  >
                  { service.status ? "🔄 Re-sync" : "Sync now!"}
                  </button>
                  <button
                    disabled={!service.status}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-red-600 text-white hover:bg-red-700 h-9 has-[>svg]:px-3 mr-4 px-5 py-2 rounded-full border-slate-300 shadow-sm transition-all duration-200 ease-in-out"
                  >
                    🚫 Revoke
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
