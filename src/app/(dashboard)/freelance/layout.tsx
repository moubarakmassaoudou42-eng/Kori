import FreelanceSidebar from "@/components/dashboard/FreelanceSidebar";

export default function FreelanceDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <FreelanceSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
