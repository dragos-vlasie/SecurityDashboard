'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
//eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { RunAssessmentModal } from './assesmentModal';
import { Button } from '@/components/ui/button';

const domainData = [
  { name: 'Identity', score: 70 },
  { name: 'Endpoint', score: 50 },
  { name: 'Cloud', score: 80 },
  { name: 'Applications', score: 60 },
];

const radarData = [
  { metric: 'Passwords', value: 6 },
  { metric: 'Vulnerability Management', value: 7 },
  { metric: 'Email', value: 5 },
  { metric: 'Data Protection', value: 3 },
  { metric: 'Logging', value: 8 },
  { metric: 'Mobile Devices', value: 6 },
];

const trendData = [
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 50 },
  { month: 'May', value: 45 },
  { month: 'Jun', value: 55 },
  { month: 'Jul', value: 60 },
  { month: 'Aug', value: 65 },
];

const overallScore = Math.round(
  domainData.reduce((acc, cur) => acc + cur.score, 0) / domainData.length
);

const getRiskLabel = (score: number) => {
  if (score >= 80) return { text: '🟢 Low Risk', className: 'text-green-600' };
  if (score >= 50)
    return { text: '🟡 Medium Risk', className: 'text-yellow-500' };
  return { text: '🔴 High Risk', className: 'text-red-500' };
};

const COLORS = ['#2563EB', '#E5E7EB'];

const PieScore = ({ score }: { score: number }) => (
  <ResponsiveContainer width={100} height={100}>
    <PieChart>
      <Pie
        data={[{ value: score }, { value: 100 - score }]}
        innerRadius={30}
        outerRadius={40}
        dataKey="value"
      >
        <Cell fill={COLORS[0]} />
        <Cell fill={COLORS[1]} />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default function SecurityDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [identityScoreDetails, setIdentityScoreDetails] = useState<
    any | null
  >(null);
  // const [appsScore, setAppsScore] = useState<number | null>(null);

  const handleAnalyze = async ({
    interactive,
    nonInteractive,
  }: {
    interactive: File | null;
    nonInteractive: File | null;
  }) => {
    try {
      // --- Send interactive sign-ins (Identity)
      if (interactive) {
        const formData = new FormData();
        formData.append('file', interactive);

        const res = await fetch('/api/analyze/identity', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();
        console.log('✅ Identity Analysis:', result);
        setIdentityScoreDetails(result); // after parsing

        // Optional: save to state
        // setIdentityScore(result.score);
      }

      // --- Send non-interactive sign-ins (Applications)
      if (nonInteractive) {
        const formData = new FormData();
        formData.append('file', nonInteractive);

        const res = await fetch('/api/analyze/identity', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${text}`);
        }

        const result = await res.json();
        console.log('✅ Applications Analysis:', result);
        // Optional: save to state
        // setAppsScore(result.score);
      }
    } catch (err) {
      console.error('❌ Error analyzing files', err);
    }
  };

  const risk = getRiskLabel(overallScore);

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 px-6 py-10 space-y-12">
      {/* Integration Status */}
      <Card className="bg-white border border-slate-200 shadow-md p-6 rounded-xl">
        <CardContent>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Identity Sign-In Score
          </h2>

          {identityScoreDetails && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <table className="text-sm text-slate-700 w-full md:w-1/2">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Total Sign-ins</td>
                      <td className="text-right">
                        {identityScoreDetails?.total}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Success</td>
                      <td className="text-right">
                        {identityScoreDetails?.successRate.toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">MFA Satisfied</td>
                      <td className="text-right">
                        {identityScoreDetails?.mfaRate.toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold">→ Final Score</td>
                      <td className="text-right font-bold">
                        {identityScoreDetails?.score} / 100
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Pie Chart */}
                <div className="w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Success + MFA',
                            value: Math.round(
                              (identityScoreDetails?.total *
                                identityScoreDetails?.mfaRate) /
                                100
                            ),
                          },
                          {
                            name: 'Success w/o MFA',
                            value: Math.round(
                              (identityScoreDetails?.total *
                                identityScoreDetails?.successRate) /
                                100 -
                                (identityScoreDetails?.total *
                                  identityScoreDetails?.mfaRate) /
                                  100
                            ),
                          },
                          {
                            name: 'Failures',
                            value: Math.round(
                              identityScoreDetails?.total -
                                (identityScoreDetails?.total *
                                  identityScoreDetails?.successRate) /
                                  100
                            ),
                          },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label
                      >
                        <Cell fill="#10B981" /> {/* Green */}
                        <Cell fill="#FACC15" /> {/* Yellow */}
                        <Cell fill="#EF4444" /> {/* Red */}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                <strong>Why this matters:</strong>
                <br />
                Success rate = user experience. MFA rate = security coverage.
                Both are essential for a secure, usable identity system.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white border border-slate-200 -mt-5 p-2 px-4 rounded-2xl shadow flex justify-between items-center flex-row">
        <div>
          <p className="text-sm text-slate-500">Microsoft Graph</p>
          <p className="text-base font-medium text-green-600">✅ Connected</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Last Synced:</p>
          <p className="text-base font-medium text-slate-800">2 hours ago</p>
        </div>
        <button className="text-sm text-blue-600 hover:underline">
          🔄 Sync Now
        </button>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-slate-200 p-6 rounded-2xl shadow text-center">
          <CardContent>
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Overall Security Score
            </h2>

            <p className="text-5xl mb-2 font-extrabold mt-2">
              {overallScore} / 100
            </p>
            <p className={`mt-2 mb-5 font-medium ${risk.className}`}>
              {risk.text}
            </p>
            <p className="text-sm mt-1 mb-5 text-green-600 flex items-center justify-center">
              ▲ 3.2% improvement this week
            </p>

            <RunAssessmentModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onAnalyze={(files) => {
                // Call analysis logic here
                handleAnalyze(files);
              }}
            />

            <Button
              onClick={() => setModalOpen(true)}
              className="mt-4 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              🔄 Run New Assessment
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 p-6 rounded-2xl shadow">
          <CardContent>
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Radar Profile
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" stroke="#334155" />
                <Radar
                  name="Profile"
                  dataKey="value"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 p-6 rounded-2xl shadow">
          <CardContent>
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Risk Trends
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {domainData.map((item) => (
            <Card
              key={item.name}
              className="bg-white border border-slate-200 rounded-2xl shadow p-4 flex flex-col items-center"
            >
              <CardContent>
                <p className="text-lg font-semibold text-center text-slate-700">
                  {item.name}
                </p>
                <div className="flex justify-center mt-2 mb-2">
                  <PieScore score={item.score} />
                </div>
                <p className="text-2xl font-bold text-center">
                  {item.score} / 100
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white border border-slate-200 p-6 rounded-2xl shadow">
          <CardContent>
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Recommendations
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Enable multi-factor authentication for all users</li>
              <li>Update endpoint protection software</li>
              <li>Review cloud resource configurations</li>
              <li>Audit application permissions</li>
            </ul>
            <div className="mt-6 border-t pt-4 text-sm text-slate-500">
              🕒 3 risky sign-ins detected in the last 24h
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
