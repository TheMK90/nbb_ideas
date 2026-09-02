import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  title: 'NBB Bank Ideas',
  description: 'Share and back ideas from across the bank.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <span className="brand">
              <span className="brand-mark">NBB</span>
              <span className="brand-rule" aria-hidden="true" />
              <span className="brand-name">Bank Ideas</span>
            </span>
            <span className="topbar-tag">Internal innovation board</span>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          National Bank of Bahrain · Every idea gets a hearing
        </footer>
      </body>
    </html>
  );
}
