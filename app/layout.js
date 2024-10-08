import './globals.css';
import ClientProvider from '@/app/ClientProvider'; 

export const metadata = {
  title: 'Dogy Assistant',
  description: 'dogy',
  icons: {
    icon: [
      { url: 'https://img.icons8.com/fluency/16/compass.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://img.icons8.com/fluency/32/compass.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://img.icons8.com/fluency/64/compass.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: 'https://img.icons8.com/fluency/96/compass.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: [
      { url: 'https://img.icons8.com/fluency/96/compass.png', sizes: '96x96', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
