import ClientSidebar from "@/components/dashboard/ClientSidebar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <ClientSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
