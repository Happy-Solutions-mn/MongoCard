import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Хуудас олдсонгүй",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/30">
          <Search className="h-12 w-12 text-white" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            404
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Хуудас олдсонгүй
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground">
            Таны хайсан хуудас алга болсон эсвэл хэзээ ч байгаагүй бололтой.
            Нүүр хуудас руу буцаад тоглоомоо үргэлжлүүлээрэй.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 font-bold shadow-xl shadow-primary/30"
        >
          <Link href="/">
            <Home className="h-5 w-5" />
            Нүүр хуудас
          </Link>
        </Button>
      </div>
    </main>
  );
}
