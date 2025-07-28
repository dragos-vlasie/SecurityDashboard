Thanks for the clarification — you're absolutely right to bring this up.

Your dashboard is not just a static visualizer — it's meant to be a **dynamic, telemetry-driven cybersecurity posture app**, pulling real-time data from Microsoft Graph and Azure APIs to:

---

### ✅ Updated Application Summary

---

#### 1. 🎯 Goal

To provide a **data-driven, real-time Security Posture Dashboard** that calculates and visualizes risk scores per security domain using telemetry from Microsoft Graph API and Azure APIs.

---

#### 2. 🧹 Domains + Scoring Logic

Each of these domains is scored based on measurable security signals:

| **Domain**       | **Key Signals / Metrics**                      | **Sample Rule (Scoring Logic)**             |
| ---------------- | ---------------------------------------------- | ------------------------------------------- |
| **Identity**     | Risky sign-ins, MFA adoption rate, risky users | >90% MFA enabled = High score               |
| **Endpoint**     | Device compliance, Defender threat alerts      | >80% compliant devices = Good               |
| **Cloud**        | Policy non-compliance, configuration drift     | <5 noncompliant resources = Good            |
| **Applications** | App sign-ins, unused high-permission apps      | No stale apps with high privileges = Secure |

Each score is computed based on **live data fetched from the APIs** below.

---

#### 3. 📡 API Integration

Your backend will pull this telemetry regularly (or on demand) from Microsoft Graph and Azure:

| **Domain**       | **API Endpoints**                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| **Identity**     | `/auditLogs/signIns`, `/identityProtection/riskyUsers`, `/users/{id}/authentication/methods`            |
| **Endpoint**     | `/deviceManagement/managedDevices`, `/deviceManagement/deviceCompliancePolicySettingStateSummaries`     |
| **Cloud**        | Azure Resource Graph: `/providers/Microsoft.ResourceGraph/resources`, and `/Microsoft.PolicyInsights`   |
| **Applications** | `/auditLogs/signIns?filter=appId ne null`, `/applications`, `/servicePrincipals/{id}/appRoleAssignedTo` |

---

#### 4. 📊 UI + Visualization

* Each domain is shown with a **scorecard + pie chart**
* A **horizontal bar chart** compares all domains
* An **overall score** is computed as the average
* Additional sections like **recommendations** help the user act

---

#### 5. 👥 Intended Users

* Security engineers
* IT admins
* CISOs (Chief Information Security Officers)

They use this dashboard to quickly assess organizational posture, identify weak areas, and take action.

---

Let me know if you want to expand this with:

* Backend service to call these APIs
* Score calculation engine
* Alerts when scores drop
* Historical trends per domain
