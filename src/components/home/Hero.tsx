import { ArrowRight, ShieldCheck, BadgeCheck, Truck, Headset } from "lucide-react";

const garanties = [
  { icon: ShieldCheck, label: "Paiement sécurisé via Mobile Money" },
  { icon: BadgeCheck, label: "Freelances vérifiés et évalués" },
  { icon: Truck, label: "Livraison rapide et fiable" },
  { icon: Headset, label: "Support client 7j/7" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-10">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Bloc principal : promesse + recherche */}
        <div className="relative overflow-hidden rounded-2xl bg-primary-light p-8 sm:p-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-primary sm:text-5xl">
              Le talent local au service de <span className="text-accent">tous.</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              Trouvez des services de qualité à petit prix, ou gagnez de
              l&apos;argent grâce à vos compétences.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="group flex flex-1 items-center justify-between rounded-xl bg-primary px-5 py-4 text-left text-primary-foreground shadow-elegant transition hover:bg-primary-dark">
                <span>
                  <span className="block font-semibold">Je cherche un service</span>
                  <span className="block text-sm text-primary-foreground/80">
                    Trouvez ce dont vous avez besoin
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
              </button>
              <button className="group flex flex-1 items-center justify-between rounded-xl bg-white px-5 py-4 text-left text-accent shadow-elegant transition hover:bg-accent-light">
                <span>
                  <span className="block font-semibold">Je propose mes services</span>
                  <span className="block text-sm text-accent/80">
                    Gagnez de l&apos;argent avec vos compétences
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Forme décorative discrète, ancrée au sujet (motif ouest-africain simplifié) */}
          <svg
            className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 text-primary/10 sm:h-72 sm:w-72"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <circle cx="100" cy="100" r="100" />
          </svg>
        </div>

        {/* Bannière "devenir freelance" */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-accent p-8 text-accent-foreground shadow-elegant">
          <div>
            <span className="text-lg font-extrabold">Kori</span>
            <p className="mt-1 text-sm opacity-90">Ton talent, ta réussite.</p>
            <p className="mt-4 text-lg font-semibold leading-snug">
              Rejoins des milliers de personnes qui vivent déjà de leurs
              compétences.
            </p>
          </div>
          <a
            href="/devenir-freelance"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
          >
            Devenir freelance
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Bande de garanties */}
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-primary-dark px-6 py-5 text-primary-foreground sm:grid-cols-4">
        {garanties.map((g) => (
          <div key={g.label} className="flex items-center gap-3">
            <g.icon className="h-6 w-6 shrink-0 text-accent" />
            <span className="text-sm leading-tight">{g.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
