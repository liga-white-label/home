import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#220a0a] p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-4">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          href="/"
          className="text-white bg-[#a60000] px-4 py-2 rounded hover:bg-[#8a0000] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
