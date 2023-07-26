import Header from './components/header/Header';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import './globals.css';
import type { Metadata } from 'next';
import ToasterProvider from './providers/ToasterProvider';

export const metadata: Metadata = {
  title: 'Brloh',
  description: 'Spolubydlení levou zadní',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <Header />
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
