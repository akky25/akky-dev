import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8">
      <header className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </header>
      <main className="max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        <nav>
          <Button asChild>
            <Link href="/blog">
              ブログ記事一覧
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
}
