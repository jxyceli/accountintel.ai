import AccountDashboard from "@/components/AccountDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-6 py-3 flex items-center gap-4 border-b border-gray-200 shadow-sm">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">analytics</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Account Intelligence</h1>
          <p className="text-xs text-gray-500 mt-0.5">AI-Powered Account Analysis Dashboard</p>
        </div>
      </header>
      <AccountDashboard />
    </main>
  );
}
