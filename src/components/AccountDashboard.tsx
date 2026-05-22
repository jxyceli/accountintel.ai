"use client";

import { useState, useCallback } from "react";

type Persona = "VP Sales" | "SDR" | "Solutions Eng" | "CSM";
type ActiveTab = "brief" | "outreach" | "tech";

interface Contact {
  name: string;
  title: string;
  role: string;
}

interface Technology {
  name: string;
  category: string;
  status: string;
}

interface AccountData {
  company: string;
  industry: string;
  employees: string;
  revenue: string;
  hq: string;
  opportunities: string[];
  risks: string[];
  contacts: Contact[];
  emailSubject: string;
  emailBody: string;
  cadence: string[];
  technologies: Technology[];
  integrations: string[];
  certifications: string[];
}

const personas: Persona[] = ["VP Sales", "SDR", "Solutions Eng", "CSM"];

const tabs: { id: ActiveTab; label: string; icon: string }[] = [
  { id: "brief", label: "Brief", icon: "summarize" },
  { id: "outreach", label: "Outreach", icon: "mail" },
  { id: "tech", label: "Tech Stack", icon: "memory" },
];

function generatePersonaData(persona: string, companyName: string): Omit<AccountData, "company" | "industry" | "employees" | "revenue" | "hq"> {
  const dataMap: Record<string, Omit<AccountData, "company" | "industry" | "employees" | "revenue" | "hq">> = {
    "VP Sales": {
      opportunities: [
        "Expanding into mid-market segment with 40% growth potential",
        "Upsell opportunity from existing team licenses to enterprise tier",
        "Cross-sell analytics module to existing customer base",
        "Strategic partnership potential with complementary tech stack",
      ],
      risks: [
        "Recent leadership change in procurement department",
        "Competitor actively pitching similar solution at 20% discount",
        "Budget freeze reported in Q3 earnings call",
      ],
      contacts: [
        { name: "Sarah Chen", title: "VP of Revenue Operations", role: "Decision Maker" },
        { name: "Marcus Johnson", title: "Director of Sales", role: "Champion" },
        { name: "Emily Torres", title: "Head of Business Development", role: "Influencer" },
      ],
      emailSubject: `Scaling ${companyName}'s revenue engine to $100M+`,
      emailBody: `Hi Sarah,\n\nI noticed ${companyName} has been making impressive strides in the enterprise SaaS space. Given your focus on revenue operations, I thought you'd be interested in how similar companies are seeing 35% faster pipeline velocity.\n\nWould you be open to a brief 15-minute conversation next week?\n\nBest regards`,
      cadence: [
        "Day 1: Personalized email with industry benchmark data",
        "Day 3: LinkedIn connection request with value-add comment",
        "Day 5: Follow-up email with relevant case study",
        "Day 8: Phone call referencing previous touchpoints",
        "Day 12: Share relevant content via social channel",
        "Day 15: Final outreach with meeting invitation",
      ],
      technologies: [
        { name: "Salesforce", category: "CRM", status: "Active" },
        { name: "Outreach.io", category: "Sales Engagement", status: "Active" },
        { name: "Gong", category: "Revenue Intelligence", status: "Active" },
        { name: "ZoomInfo", category: "Data Provider", status: "Active" },
        { name: "Tableau", category: "Analytics", status: "Evaluating" },
        { name: "Clari", category: "Forecasting", status: "Active" },
      ],
      integrations: [
        "Native Salesforce integration for seamless data sync",
        "Gong API connector for call intelligence enrichment",
        "Custom Outreach.io workflow automation",
        "Tableau dashboard embedding for executive reporting",
      ],
      certifications: ["SOC 2 Type II", "ISO 27001", "GDPR Compliant", "HIPAA Ready", "CCPA"],
    },
    "SDR": {
      opportunities: [
        "High volume of open roles suggests rapid growth phase",
        "Active hiring in sales indicates territory expansion",
        "Recent funding round means budget availability",
        "LinkedIn engagement shows buying intent signals",
      ],
      risks: [
        "High SDR turnover rate may delay engagement",
        "Long sales cycles typical in this segment",
        "Gatekeeper-heavy organizational structure",
      ],
      contacts: [
        { name: "Jake Miller", title: "SDR Manager", role: "Decision Maker" },
        { name: "Lisa Park", title: "Senior SDR", role: "Champion" },
        { name: "David Kim", title: "Sales Operations Analyst", role: "Influencer" },
      ],
      emailSubject: `Quick question about ${companyName}'s outbound process`,
      emailBody: `Hi Jake,\n\nSaw ${companyName} is hiring 5 new SDRs - congrats on the growth! Most teams I talk to at this stage struggle with data quality and sequence personalization.\n\nHappy to share how similar SDR teams are booking 3x more meetings. Open to a quick chat?\n\nCheers`,
      cadence: [
        "Day 1: Short, personalized email with specific observation",
        "Day 2: LinkedIn engagement on their recent posts",
        "Day 4: Follow-up email with 1-liner case study stat",
        "Day 6: Phone call - leave voicemail if no answer",
        "Day 8: Video message via Loom with personalized insight",
        "Day 12: Break-up email with open-ended question",
      ],
      technologies: [
        { name: "HubSpot", category: "CRM", status: "Active" },
        { name: "Apollo.io", category: "Prospecting", status: "Active" },
        { name: "Salesloft", category: "Engagement", status: "Active" },
        { name: "Chili Piper", category: "Routing", status: "Active" },
        { name: "Lusha", category: "Data Enrichment", status: "Evaluating" },
        { name: "ExecVision", category: "Coaching", status: "Active" },
      ],
      integrations: [
        "HubSpot workflow automation for lead routing",
        "Apollo.io sequence sync for multi-channel outreach",
        "Chili Piper instant booking from email CTAs",
        "Slack notifications for real-time engagement alerts",
      ],
      certifications: ["SOC 2", "GDPR Compliant", "CCPA", "CAN-SPAM"],
    },
    "Solutions Eng": {
      opportunities: [
        "Complex multi-cloud architecture presents integration opportunities",
        "Legacy system modernization initiative identified",
        "API-first approach enables custom workflow automation",
        "Technical debt in current stack creates competitive wedge",
      ],
      risks: [
        "Stringent security requirements may extend sales cycle",
        "Custom integration requirements beyond standard connectors",
        "Existing vendor contracts with 12-month minimum terms",
      ],
      contacts: [
        { name: "Priya Sharma", title: "Head of Engineering", role: "Decision Maker" },
        { name: "Tom Anderson", title: "Solutions Architect", role: "Champion" },
        { name: "Rachel Wu", title: "DevOps Lead", role: "Influencer" },
      ],
      emailSubject: `Technical deep-dive: ${companyName}'s architecture options`,
      emailBody: `Hi Priya,\n\nI reviewed ${companyName}'s tech infrastructure and noticed some interesting patterns around your current data pipeline architecture.\n\nI've put together a brief technical comparison showing how teams with similar stacks reduced latency by 60% and cut infra costs by 30%. Happy to walk through it together.\n\nBest`,
      cadence: [
        "Day 1: Technical email with architecture diagram attachment",
        "Day 3: GitHub repo with relevant integration example",
        "Day 5: Invite to technical webinar or demo",
        "Day 8: Share benchmark report with peer companies",
        "Day 12: Offer proof-of-concept environment access",
        "Day 18: Executive summary with ROI analysis",
      ],
      technologies: [
        { name: "AWS", category: "Cloud Platform", status: "Active" },
        { name: "Kubernetes", category: "Orchestration", status: "Active" },
        { name: "Terraform", category: "IaC", status: "Active" },
        { name: "Snowflake", category: "Data Warehouse", status: "Active" },
        { name: "Apache Kafka", category: "Streaming", status: "Evaluating" },
        { name: "Datadog", category: "Monitoring", status: "Active" },
      ],
      integrations: [
        "AWS Lambda serverless integration for event-driven workflows",
        "Kubernetes operator for automated deployment",
        "Terraform provider for infrastructure-as-code setup",
        "Snowflake native connector for real-time data sync",
      ],
      certifications: ["SOC 2 Type II", "ISO 27001", "HIPAA", "FedRAMP Ready", "PCI DSS"],
    },
    "CSM": {
      opportunities: [
        "Product adoption at 45% - significant expansion potential",
        "Support tickets trending down - satisfaction improving",
        "Quarterly business review scheduled next month",
        "Net promoter score of 72 indicates strong advocacy",
      ],
      risks: [
        "Key champion role recently vacated - relationship gap",
        "Competitor targeting with migration incentives",
        "Usage decline detected in 2 core modules",
        "Contract renewal in 90 days - at-risk status",
      ],
      contacts: [
        { name: "Angela Brooks", title: "VP Customer Success", role: "Decision Maker" },
        { name: "Chris Taylor", title: "Implementation Manager", role: "Champion" },
        { name: "Jordan Lee", title: "Product Operations", role: "Influencer" },
      ],
      emailSubject: `QBR prep: ${companyName}'s growth roadmap`,
      emailBody: `Hi Angela,\n\nAs we prepare for your upcoming QBR, I wanted to share some exciting insights. ${companyName}'s team has achieved a 28% increase in platform engagement this quarter.\n\nI've prepared a custom success plan showing how we can help you hit 80% adoption by year-end. Let's schedule 30 minutes to review.\n\nWarm regards`,
      cadence: [
        "Day 1: QBR invitation with preliminary success metrics",
        "Day 7: Share product update relevant to their use case",
        "Day 14: Invitation to customer advisory board or webinar",
        "Day 21: Personalized success milestone celebration",
        "Day 30: Pre-renewal value realization report",
        "Day 45: Executive sponsorship outreach if needed",
      ],
      technologies: [
        { name: "Gainsight", category: "CS Platform", status: "Active" },
        { name: "Zendesk", category: "Support", status: "Active" },
        { name: "Pendo", category: "Product Analytics", status: "Active" },
        { name: "Totango", category: "Customer Health", status: "Evaluating" },
        { name: "Intercom", category: "Messaging", status: "Active" },
        { name: "Mixpanel", category: "Analytics", status: "Active" },
      ],
      integrations: [
        "Gainsight health score sync for proactive outreach",
        "Zendesk ticket integration for support context",
        "Pendo in-app guidance for feature adoption",
        "Slack alerts for at-risk account notifications",
      ],
      certifications: ["SOC 2 Type II", "GDPR Compliant", "ISO 27001", "CCPA", "CSA STAR"],
    },
  };

  return dataMap[persona] ?? dataMap["VP Sales"];
}

function SectionCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">{icon}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-gray-500 list-none pl-0">
      {items.map((item, i) => (
        <li key={i} className="py-2 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-blue-600 before:rounded-full">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AccountDashboard() {
  const [domain, setDomain] = useState("");
  const [persona, setPersona] = useState<Persona>("VP Sales");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("brief");
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  const analyzeAccount = useCallback(() => {
    if (!domain.trim() || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setHasAnalyzed(true);

      const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
      const companyName = domainName.split(".")[0].charAt(0).toUpperCase() + domainName.split(".")[0].slice(1);
      const personaData = generatePersonaData(persona, companyName);

      setAccountData({
        company: `${companyName} Inc.`,
        industry: "Enterprise SaaS",
        employees: "500-1000",
        revenue: "$50M-$100M ARR",
        hq: "San Francisco, CA",
        ...personaData,
      });
    }, 2000);
  }, [domain, isLoading, persona]);

  const placeholder = (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-blue-600">search</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        Enter a target domain and select your analyst persona, then click &ldquo;Analyze Account&rdquo; to generate intelligence.
      </p>
    </div>
  );

  const briefTab = accountData && (
    <>
      <SectionCard icon="business" title="Company Overview">
        <div className="text-sm text-gray-500">
          {[
            { label: "Company", value: accountData.company },
            { label: "Industry", value: accountData.industry },
            { label: "Employees", value: accountData.employees },
            { label: "Revenue", value: accountData.revenue },
            { label: "HQ Location", value: accountData.hq },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex justify-between py-2.5 ${i < arr.length - 1 ? "border-b border-gray-200" : ""}`}>
              <span>{row.label}</span>
              <span className="font-semibold text-gray-900">{row.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon="target" title="Key Opportunities">
        <BulletList items={accountData.opportunities} />
      </SectionCard>

      <SectionCard icon="warning" title="Risk Factors">
        <BulletList items={accountData.risks} />
      </SectionCard>
    </>
  );

  const outreachTab = accountData && (
    <>
      <SectionCard icon="person_search" title="Recommended Contacts">
        <div className="text-sm text-gray-500">
          {accountData.contacts.map((contact, i) => (
            <div key={i} className="py-3 border-b border-gray-200 last:border-b-0">
              <div className="font-semibold text-sm text-gray-900">{contact.name}</div>
              <div className="text-xs text-gray-500">{contact.title}</div>
              <div className="mt-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                  {contact.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon="edit_note" title="Email Template">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
          Tailored for: {persona}
        </span>
        <div className="mt-3 bg-gray-50 rounded-lg p-4 border-l-[3px] border-blue-600">
          <div className="font-semibold text-sm text-gray-900 mb-2">Subject: {accountData.emailSubject}</div>
          <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">{accountData.emailBody}</div>
        </div>
      </SectionCard>

      <SectionCard icon="schedule" title="Follow-Up Cadence">
        <BulletList items={accountData.cadence} />
      </SectionCard>
    </>
  );

  const techTab = accountData && (
    <>
      <SectionCard icon="hub" title="Detected Technologies">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
          {accountData.technologies.map((tech, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-gray-900 mb-1">{tech.name}</div>
              <div className="text-[11px] text-gray-500">{tech.category}</div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    tech.status === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-800"
                  }`}
                >
                  {tech.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon="integration_instructions" title="Integration Opportunities">
        <BulletList items={accountData.integrations} />
      </SectionCard>

      <SectionCard icon="shield" title="Security & Compliance">
        <div className="flex flex-wrap gap-2">
          {accountData.certifications.map((cert, i) => (
            <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-500">
              {cert}
            </span>
          ))}
        </div>
      </SectionCard>
    </>
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Pane: Input */}
      <aside className="w-96 min-w-96 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="px-6 pt-5 pb-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">tune</span>
            Configuration
          </h2>
        </div>

        <div className="p-6 flex-1">
          {/* Domain Input */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Target Domain
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="e.g., acme-corp.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeAccount()}
            />
          </div>

          {/* Persona Selection */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Analyst Persona
            </label>
            <div className="flex flex-wrap gap-2">
              {personas.map((p) => (
                <button
                  key={p}
                  className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition ${
                    persona === p
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-500 bg-white hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600"
                  }`}
                  onClick={() => setPersona(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            className="w-full py-3.5 bg-blue-600 text-white border-none rounded-full text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] transition disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={analyzeAccount}
            disabled={isLoading || !domain.trim()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined">play_arrow</span>
            )}
            <span>{isLoading ? "Analyzing..." : "Analyze Account"}</span>
          </button>
        </div>
      </aside>

      {/* Right Pane: Output */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-4 text-sm font-medium cursor-pointer flex items-center gap-2 transition border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-blue-600"
                  : "text-gray-500 border-b-transparent bg-transparent hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
              disabled={!hasAnalyzed}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!hasAnalyzed ? placeholder : null}
          {hasAnalyzed && activeTab === "brief" && briefTab}
          {hasAnalyzed && activeTab === "outreach" && outreachTab}
          {hasAnalyzed && activeTab === "tech" && techTab}
        </div>
      </main>
    </div>
  );
}
