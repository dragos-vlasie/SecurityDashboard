"use client";

import SecurityDashboard from "../components/securityDashboard";

export default function Dashboard() {
  return (
    <div className="font-sans">
        {/* <AuthGuard> */}
            <SecurityDashboard />
        {/* </AuthGuard> */}
    </div>
  );
}
