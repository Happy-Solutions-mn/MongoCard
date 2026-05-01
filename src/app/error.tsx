"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-destructive/20 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-destructive to-orange-500 shadow-2xl shadow-destructive/30">
          <AlertTriangle className="h-12 w-12 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Алдаа гарлаа
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground">
            Уучлаарай, ямар нэг зүйл буруу болсон байна. Та дахин оролдоод эсвэл
            нүүр хуудас руу буцаарай.
          </p>
          {error.digest ? (
            <p className="text-xs text-muted-foreground/70">
              Ref: <code className="font-mono">{error.digest}</code>
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={reset}
            className="gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/90 px-8 font-bold shadow-xl shadow-primary/30"
          >
            <RotateCcw className="h-5 w-5" />
            Дахин оролдох
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 rounded-2xl border-2 px-8 font-semibold"
          >
            <Link href="/">
              <Home className="h-5 w-5" />
              Нүүр хуудас
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
