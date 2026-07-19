"use client";

import { Camera } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function ProfilClientPage() {
  return (
    <>
      <DashboardTopbar titre="Mon profil" />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-2xl border border-black/5 bg-white p-6 text-center">
            <div className="relative mx-auto h-28 w-28">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-light text-3xl font-bold text-primary">
                MB
              </div>
              <button
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-elegant hover:bg-accent-dark"
                aria-label="Changer la photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-semibold text-foreground">Moubarak B.</p>
            <p className="text-sm text-foreground/50">Client depuis juin 2026</p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="font-bold text-foreground">Informations personnelles</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Prénom</label>
                <input
                  defaultValue="Moubarak"
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Nom</label>
                <input
                  defaultValue="B."
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Adresse e-mail</label>
                <input
                  defaultValue="moubarak@exemple.com"
                  type="email"
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Téléphone</label>
                <input
                  defaultValue="+227 90 00 00 00"
                  className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-foreground">Pays</label>
              <select className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none">
                <option>Niger</option>
                <option>Nigeria</option>
                <option>Sénégal</option>
                <option>Côte d&apos;Ivoire</option>
                <option>Mali</option>
                <option>Burkina Faso</option>
              </select>
            </div>

            <button className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-dark">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
