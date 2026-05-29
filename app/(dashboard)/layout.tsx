import { Container } from "@/components/ui/container";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Container className="py-10">{children}</Container>;
}

