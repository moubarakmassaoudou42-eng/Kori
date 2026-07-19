import type { Metadata } from "next";
import "@/styles/globals.css";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";

export const metadata: Metadata = {
  title: {
    default: "Kori — Ton talent, ta réussite.",
    template: "%s | Kori",
  },
  description:
    "Kori, la marketplace de services freelance qui met en valeur le talent local. Trouvez un service ou proposez vos compétences, en toute sécurité.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-cream text-foreground">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
