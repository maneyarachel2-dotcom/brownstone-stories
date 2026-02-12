import AppNav from "./AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbf7f1] text-[#1f1b16]">
      <AppNav />
      {children}
    </div>
  );
}
