import './globals.css';
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'Kadena Nodes',
  description: 'Kadena Network Nodes Map',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
