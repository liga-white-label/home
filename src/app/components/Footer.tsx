import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer className="bg-[#A60000]  text-white">
      <div className="container mx-auto flex flex-wrap justify-between p-10">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Contacto</h3>
          <p>Dirección: Calle Ficticia 123, Ciudad, País</p>
          <p>Teléfono: +123 456 789</p>
          <p>Email: info@ejemplo.com</p>
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
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold">Seguinos!</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              <Facebook className="h-10 w-10" />
            </a>
            <a href="#" className="hover:underline">
              <Twitter className="h-10 w-10" />
            </a>
            <a href="#" className="hover:underline">
              <Instagram className="h-10 w-10" />
            </a>
            <a href="#" className="hover:underline">
              <LinkedIn className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 py-10 text-center">
        <p>&copy; 2024 Liga CUBB. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
