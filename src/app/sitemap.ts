import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { toutesLesCategories } from "@/lib/data-demo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: appUrl, changeFrequency: "daily", priority: 1 },
    { url: `${appUrl}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${appUrl}/services`, changeFrequency: "daily", priority: 0.9 },
    { url: `${appUrl}/connexion`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${appUrl}/inscription`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const pagesCategories: MetadataRoute.Sitemap = toutesLesCategories.map((cat) => ({
    url: `${appUrl}/services?categorie=${cat.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const services = await prisma.service.findMany({
    where: { statut: "ACTIF" },
    select: { id: true, updatedAt: true },
  });

  const pagesServices: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${appUrl}/services/${s.id}`,
    lastModified: s.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...pagesStatiques, ...pagesCategories, ...pagesServices];
}
