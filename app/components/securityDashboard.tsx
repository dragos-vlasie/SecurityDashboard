'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const domainData = [
  { name: "Identity", score: 70 },
  { name: "Endpoint", score: 50 },
  { name: "Cloud", score: 80 },
  { name: "Applications", score: 60 },
];

const overallScore = Math.round(
  domainData.reduce((acc, cur) => acc + cur.score, 0) / domainData.length
);

const getRiskLabel = (score: number) => {
  if (score >= 80) return { text: "🟢 Low Risk", className: "text-green-500" };
  if (score >= 50) return { text: "🟡 Medium Risk", className: "text-yellow-400" };
  return { text: "🔴 High Risk", className: "text-red-500" };
};

const COLORS = ["#22c55e", "#14532d"]; // green-500, green-900


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
  const risk = getRiskLabel(overallScore);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-10 space-y-12">
      <h1 className="text-4xl font-bold tracking-tight text-center text-white">Security Posture Dashboard</h1>

      {/* Overall Score */}
      <Card className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg text-center">
        <CardContent>
          <p className="text-xl text-slate-200">Overall Security Score</p>
          <p className="text-5xl font-extrabold mt-2 text-white">{overallScore} / 100</p>
          <p className={`mt-2 font-medium ${risk.className}`}>{risk.text}</p>
        </CardContent>
      </Card>

      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {domainData.map((item) => (
          <Card key={item.name} className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-4 flex flex-col items-center">
            <CardContent>
              <p className="text-lg font-semibold text-center text-slate-300">{item.name}</p>
              <div className="flex justify-center mt-2 mb-2">
                <PieScore score={item.score} />
              </div>
              <p className="text-2xl font-bold text-center text-white">{item.score} / 100</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Horizontal Bar Chart */}
      <Card className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-bold text-slate-100 mb-4">Domain Comparison</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={domainData} layout="vertical" margin={{ left: 50}}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" stroke="#CBD5E1" />
              <Tooltip wrapperStyle={{ backgroundColor: '#1E293B', color: 'black' }} />
              <Bar dataKey="score" fill="#3B82F6" radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-bold text-slate-100 mb-4">Recommendations</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Enable multi-factor authentication for all users</li>
            <li>Update endpoint protection software</li>
            <li>Review cloud resource configurations</li>
            <li>Audit application permissions</li>
          </ul>
        </CardContent>
      </Card>

    
    </div>
  );
}
