import ChatPanel from "@/components/ChatPanel";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-pesabrand-dark">PesaBot</h1>
        <p className="text-sm text-pesabrand-dark/70">
          Tell me a savings goal — I&apos;ll turn it into a daily plan and,
          when you confirm, trigger a real M-Pesa prompt (sandbox).
        </p>
      </header>
      <ChatPanel />
    </main>
  );
}
