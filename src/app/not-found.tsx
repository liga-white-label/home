import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="p-8 rounded-lg shadow-lg text-center"
        style={{ backgroundColor: "var(--color-surface-hover)", color: "var(--color-text)" }}
      >
        <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
        <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          href="/"
          className="text-white px-4 py-2 rounded transition-colors"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
