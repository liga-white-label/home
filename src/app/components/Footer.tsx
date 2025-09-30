import { Instagram, Email } from "@mui/icons-material";

export const Footer = () => {
  const developers = [
    {
      name: "Joaquin Franciscutti",
      link: "https://linkedin.com/in/jfranciscutti",
    },
    { name: "Julian Acttis", link: "https://linkedin.com/in/jacttis" },
    { name: "Marco Valla", link: "https://www.instagram.com/marco_valla" },
  ];

  return (
    <footer className="bg-[#A60000] text-white">
      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2">Liga CUBB</h2>
          <p className="text-lg mb-8">Club Universitario de Bahía Blanca</p>

          <div className="flex flex-col items-center gap-6 mb-8">
            <a
              href="https://www.instagram.com/ligacubb"
              className="hover:bg-red-900 p-4 rounded-full transition-colors duration-300 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-12 w-12" />
              <span className="ml-2 text-lg font-medium">@ligacubb</span>
            </a>

            <div className="flex items-center hover:text-red-200 transition-colors duration-300">
              <Email className="mr-2 h-6 w-6" />
              <a href="mailto:ligacubb@gmail.com" className="text-lg">
                ligacubb@gmail.com
              </a>
            </div>
          </div>

          <div className="py-4 items-center justify-center">
            <p className="text-xs text-white/60 mb-2 w-full text-center">
              Desarrollado por
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
              {developers.map((developer, index) => (
                <span
                  key={developer.name}
                  onClick={() => window.open(developer.link, "_blank")}
                >
                  {developer.name}
                  {index < developers.length - 1 && (
                    <span className="ml-3 text-white/40">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-red-800 w-full max-w-md pt-6 text-center">
            <p>&copy; 2025 Liga CUBB. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
