import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toutesLesCategories } from "@/lib/data-demo";

export const metadata = {
  title: "Toutes les catégories",
};

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-3xl font-bold text-primary">Toutes les catégories</h1>
          <p className="mt-2 max-w-2xl text-foreground/60">
            Parcourez l&apos;ensemble des domaines disponibles sur Kori et
            trouvez le service qu&apos;il vous faut.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {toutesLesCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: cat.couleur }}
                  >
                    <cat.icon className="h-5 w-5 text-primary" />
                  </span>
                  <Link
                    href={`/services?categorie=${cat.id}`}
                    className="font-semibold text-foreground hover:text-primary"
                  >
                    {cat.nom}
                  </Link>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.sousCategories.map((sous) => (
                    <li key={sous}>
                      <Link
                        href={`/services?categorie=${cat.id}&q=${encodeURIComponent(sous)}`}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70 transition hover:bg-primary-light hover:text-primary"
                      >
                        {sous}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
