export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>Copyright ⓒ {new Date().getFullYear()} Rohail Iqbal</p>
      </footer>
    </div>
  );
}
