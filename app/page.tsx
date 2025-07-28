'use client';
import ICyberScore from '@/public/ICyberScore.png';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
              {/* Header */}
            <header className="px-6 py-6 flex justify-between items-center border-b border-slate-200">
              <h1 className="text-2xl font-bold">
                <Link href="/" className="text-blue-600 hover:text-blue-700">
                  <Image
                    src={ICyberScore.src}
                    width={66}
                    height={24}
                    alt="CyberScore Logo"
                    className="object-cover inline-block mr-2"
                  />
                </Link>
                </h1>
              <nav className="space-x-6 text-slate-600">
                <Link href="/#features" className="hover:text-slate-900">
                  Features
                </Link>
                <Link href="/#how-it-works" className="hover:text-slate-900">
                  How it Works
                </Link>
                <Link href="/#pricing" className="hover:text-slate-900">
                  Pricing
                </Link>
                <Link href="/#contact" className="hover:text-slate-900">
                  Contact
                </Link>
              </nav>
              <div>
                <Button
                  variant="outline"
                  className="mr-4 px-5 py-2 rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900 shadow-sm transition-all duration-200 ease-in-out"
                >
                  <Link href="/login" className="flex items-center">
                    Login
                  </Link>
                </Button>
                <Button className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
                  Get Started
                </Button>
              </div>
            </header>
      {/* Hero */}
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Automated Security Posture for Your Cloud Environment
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          CyberScore integrates with your existing cloud tools to calculate
          real-time risk, posture trends, and actionable recommendations — all
          in one dashboard.
        </p>
        <Button
          size="lg"
          className="text-lg px-10 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
        >
          Start Free Assessment
        </Button>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">
              Real-Time Secure Score
            </h4>
            <p className="text-slate-600">
              Continuously updated score with breakdown by Identity, Endpoint,
              Cloud, and Applications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">
              Microsoft Graph Integration
            </h4>
            <p className="text-slate-600">
              Connects with Microsoft 365 to fetch sign-ins, device compliance,
              and risky app data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">
              Actionable Recommendations
            </h4>
            <p className="text-slate-600">
              Industry based recommendations to strengthen your posture and
              reduce risk.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-20 px-6 bg-slate-50 border-t border-slate-200"
      >
        <h3 className="text-3xl font-bold mb-12 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div>
            <h4 className="text-lg font-semibold mb-2">
              1. Connect Your Microsoft Account
            </h4>
            <p className="text-slate-600">
              Sign in with Azure AD to allow CyberScore to fetch your telemetry.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">
              2. Analyze Your Posture
            </h4>
            <p className="text-slate-600">
              We score Identity, Endpoint, Cloud, and Apps using Microsoft APIs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">3. Take Action</h4>
            <p className="text-slate-600">
              See AI-powered recommendations based on your current security
              status.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center">Simple Pricing</h3>
        <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow text-center">
          <p className="text-5xl font-bold mb-4">Free</p>
          <p className="text-slate-600 mb-4">
            Use all features while in Beta. No credit card required.
          </p>
          <Button
            size="lg"
            className="px-10 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            <Link href="/login" className="flex items-center">
              Start Now
            </Link>
          </Button>
        </div>
      </section>
      {/* Contact/Footer */}
            <footer
              id="contact"
              className="border-t border-slate-200 py-10 text-center text-slate-500 text-sm"
            >
              <p>Contact us: support@cyberscore.ai</p>
              <p className="mt-2">
                © {new Date().getFullYear()} CyberScore. All rights reserved.
              </p>
            </footer>
    </>
  );
}

  

