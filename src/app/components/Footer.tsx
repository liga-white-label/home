import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer className="bg-[#A60000]  text-white">
      <div className="container mx-auto flex flex-wrap justify-between p-10">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Contacto</h3>
          <p>Dirección: Avenida Alem 1101 8000 Bahía Blanca, Argentina</p>
          <p>Teléfono: +54 9 291 516-0723</p>
          <p>Email: cubbgestion@gmail.com</p>
        </div>

        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Enlaces útiles</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Servicios
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li> */}
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold">Seguinos!</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/cubboficial"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-10 w-10" />
            </a>
            {/* <a
              href="#"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-10 w-10" />
            </a> */}
            <a
              href="https://www.instagram.com/ligacubb"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-10 w-10" />
            </a>
            {/* <a
              href="#"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="h-10 w-10" />
            </a> */}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 py-10 text-center">
        <p>&copy; 2025 Liga CUBB. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
