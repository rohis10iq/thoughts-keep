export default function HeaderLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="text-white text-center p-4">
          <h1>Keeper</h1>
        </header>
        <main className="flex-grow">{children}</main>
      </div>
    );
  }
  