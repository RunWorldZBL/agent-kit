import { useQuery } from "@tanstack/react-query";
import { Box, CheckCircle2, CircleDashed } from "lucide-react";

import { listItems } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function App() {
  const items = useQuery({
    queryKey: ["items"],
    queryFn: () => listItems(),
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Box className="size-4" />
              Kit Template
            </div>
            <h1 className="text-3xl font-semibold tracking-normal">Fullstack starter</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Codex harness, backend template, frontend foundation, shared contracts, TDD, OpenSpec, and CI are wired for reuse.
            </p>
          </div>
          <Button type="button">New item</Button>
        </header>

        <section className="grid gap-3">
          {items.data?.data.map(item => (
            <article key={item.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  {item.status === "active" ? <CheckCircle2 className="size-3" /> : <CircleDashed className="size-3" />}
                  {item.status}
                </Badge>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
