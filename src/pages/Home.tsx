export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Modern React + TypeScript Template</h1>
        <p className="text-muted-foreground">
          A modern React + TypeScript starter template with Vite, TailwindCSS, and shadcn/ui
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">⚡ Fast Development</h3>
          <p className="text-sm text-muted-foreground">Powered by Vite for instant hot module replacement</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">🎨 Beautiful UI</h3>
          <p className="text-sm text-muted-foreground">Built with TailwindCSS and shadcn/ui components</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">🔒 Type Safe</h3>
          <p className="text-sm text-muted-foreground">Full TypeScript support for better developer experience</p>
        </div>
      </div>
    </div>
  );
}
