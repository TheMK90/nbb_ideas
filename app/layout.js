import './globals.css';

export const metadata = {
  title: 'NBB Bank Ideas',
  description: 'Share and back ideas from across the bank.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <span className="brand">NBB</span>
          <h1>Bank Ideas</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
