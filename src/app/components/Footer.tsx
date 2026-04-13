import { Instagram, Email } from "@mui/icons-material";
import { tenantConfig } from "@/config/tenant";

export const Footer = () => {
  const { name, subtitle } = tenantConfig.brand;
  const { instagramHandle, instagramUrl, email } = tenantConfig.contact;
  const { copyrightYear } = tenantConfig.meta;

  const developers = [
    {
      name: "Joaquin Franciscutti",
      link: "https://linkedin.com/in/jfranciscutti",
    },
    { name: "Julian Acttis", link: "https://linkedin.com/in/julian-acttis" },
    {
      name: "Marco Valla",
      link: "https://linkedin.com/in/marco-luis-valla-zanardi",
    },
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          {subtitle && <p className="text-lg mb-8">{subtitle}</p>}

          <div className="flex flex-col items-center gap-6 mb-8">
            {instagramUrl && (
              <a
                href={instagramUrl}
                className="hover:opacity-80 p-4 rounded-full transition-opacity duration-300 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-12 w-12" />
                {instagramHandle && (
                  <span className="ml-2 text-lg font-medium">
                    @{instagramHandle}
                  </span>
                )}
              </a>
            )}

            {email && (
              <div className="flex items-center hover:opacity-80 transition-opacity duration-300">
                <Email className="mr-2 h-6 w-6" />
                <a href={`mailto:${email}`} className="text-lg">
                  {email}
                </a>
              </div>
            )}
          </div>

          <div className="py-4 items-center justify-center">
            <p className="text-xs text-white/60 mb-2 w-full text-center">
              Desarrollado por
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
              {developers.map((developer, index) => (
                <span
                  className="hover:cursor-pointer"
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

          <div className="border-t border-white/20 w-full max-w-md pt-6 text-center">
            <p>
              &copy; {copyrightYear} {name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
