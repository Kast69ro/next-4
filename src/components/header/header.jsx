
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-center space-x-6">
        <Link
          href="/"
          className="px-4 py-2 rounded text-blue-600 hover:bg-blue-50 transition"
        >
          sync
        </Link>
        <Link
          href="/second"
          className="px-4 py-2 rounded text-blue-600 hover:bg-blue-50 transition"
        >
          async
        </Link>
      </div>
    </header>
  );
}
