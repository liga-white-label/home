const COMISION_DIRECTIVA = [
  { rol: "Presidente", nombre: "Dambolena Jorge" },
  { rol: "Vicepresidente", nombre: "Marchegiani Daniel" },
  { rol: "Secretario", nombre: "Diana Fabián" },
  { rol: "Prosecretario", nombre: "Digiorgio Adrian" },
  { rol: "Tesorero", nombre: "Angelini Sebastian" },
  { rol: "Protesorero", nombre: "Martinez Mario" },
  { rol: "Consejero Titular Club Bella Vista", nombre: "Oñate Claudio" },
  { rol: "Consejero Titular Club Comercial", nombre: "Digiorgio Adrian" },
  { rol: "Consejero Titular Club Huracán", nombre: "Álvarez Sebastián" },
  { rol: "Consejero Titular Club La Armonia", nombre: "Verdugo Francisco" },
  { rol: "Consejero Titular Club Libertad", nombre: "Iturrieta Horacio" },
  { rol: "Consejero Titular Club Liniers", nombre: "Ornella Juan Pablo" },
  { rol: "Consejero Titular Club Olimpo", nombre: "Marchegiani Daniel" },
  { rol: "Consejero Titular Club Pacifico BB", nombre: "Saez Oscar" },
  { rol: "Consejero Titular Club Pacifico Cdo.", nombre: "Angelini Sebastián" },
  { rol: "Consejero Titular Club Rosario PB", nombre: "Villalvilla Fernando" },
  { rol: "Consejero Titular Club Sansinena", nombre: "Diana Fabián Jorge" },
  { rol: "Consejero Titular Club Sporting", nombre: "Loscalzo Ruben" },
  { rol: "Consejero Titular Club San Francisco", nombre: "Martinez Mario" },
  { rol: "Consejero Titular Club Tiro Federal", nombre: "Gonzalez Fabián" },
  { rol: "Consejero Titular Club Villa Mitre", nombre: "Maldonado Oscar" },
];

export default function AutoridadesPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-10"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <h1
        className="text-3xl font-bold text-center mb-10"
        style={{ color: "var(--color-text)" }}
      >
        Autoridades
      </h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <div>
          <h2
            className="text-lg font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Comisión Directiva
          </h2>
          <div
            className="w-16 h-0.5 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          {COMISION_DIRECTIVA.map((item, index) => (
            <div key={index} className="text-center">
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.rol}
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {item.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
