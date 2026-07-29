const REGLAMENTO_ESTATUTO_LDS_URL =
  "https://drive.google.com/file/d/1FmGj5t2q9SkyLNdttcQZAZR4EJCF7Mfh/view?usp=sharing";
const REGLAMENTO_TRANSGRESIONES_PENAS_URL =
  "https://drive.google.com/file/d/1Kllnb8hi6JxQc1rRWXxSNTvvPhiWy73X/view?usp=sharing";

const DOCUMENTOS = [
  { nombre: "Reglamento y Estatuto LDS", href: REGLAMENTO_ESTATUTO_LDS_URL },
  {
    nombre: "Reglamento, Transgresiones y Penas",
    href: REGLAMENTO_TRANSGRESIONES_PENAS_URL,
  },
];

export default function ReglamentoYEstatutoPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-10"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Reglamento y Estatuto
      </h1>
      <div
        className="h-0.5 rounded-full mb-6"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <div className="flex flex-col">
        {DOCUMENTOS.map((doc, index) => (
          <div
            key={doc.href}
            className="flex items-center justify-between py-4"
            style={{
              borderBottom:
                index < DOCUMENTOS.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
            }}
          >
            <p
              className="text-base font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {doc.nombre}
            </p>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              Abrir
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
