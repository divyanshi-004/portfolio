import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const Portfolio = lazy(() => import("@/components/portfolio/Portfolio"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divyanshi Jain — Full Stack MERN Developer" },
      { name: "description", content: "Portfolio of Divyanshi Jain, BCA student, Full Stack MERN Developer and Software Tester. Projects, skills, and contact." },
      { property: "og:title", content: "Divyanshi Jain — Full Stack MERN Developer" },
      { property: "og:description", content: "Portfolio of Divyanshi Jain — Full Stack MERN Developer and Software Tester." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>}>
      <Portfolio />
    </Suspense>
  );
}
