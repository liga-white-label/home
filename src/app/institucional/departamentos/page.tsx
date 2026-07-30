const DEPARTAMENTOS = [
  {
    nombre: "Futbol Menor e Infantil",
    integrantes: ["Julián Fernández", "Claudio Quillodran"],
  },
  {
    nombre: "Futsal",
    integrantes: ["Alejandro Aravena", "Sergio Vallejos", "Matias Redivo"],
  },
  {
    nombre: "Futbol Femenino",
    integrantes: ["Gustavo Seltenreich", "Gianfranco Cornachini"],
  },
  {
    nombre: "Colegio de Arbitros",
    integrantes: ["Gustavo Ridolfo", "Edgardo González", "Horacio Velázquez"],
  },
  {
    nombre: "Tribunal de Penas",
    integrantes: [
      "Gustavo Salazar",
      "Jonatan Raijman",
      "Alberto Gómez",
      "Eduardo Dumrauf",
      "Adolfo Montenegro",
    ],
  },
];

export default function DepartamentosPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-10"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <h1
        className="text-3xl font-bold text-center mb-4"
        style={{ color: "var(--color-text)" }}
      >
        Departamentos
      </h1>
      <div
        className="h-0.5 rounded-full mb-6"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      {DEPARTAMENTOS.map((depto, index) => (
        <div key={depto.nombre}>
          <div className="grid md:grid-cols-[220px_1fr] gap-8 py-6">
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {depto.nombre}
            </h2>

            <div className="flex flex-col items-center gap-4 text-center">
              <div>
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Integrantes
                </p>
                {depto.integrantes.map((integrante, i) => (
                  <p
                    key={integrante}
                    className={`text-sm ${i === 0 ? "font-semibold" : ""}`}
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {integrante}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {index < DEPARTAMENTOS.length - 1 && (
            <div
              className="h-0.5 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
