import { ArrowDropDown } from "@mui/icons-material";
import { tenantConfig } from "@/config/tenant";

export const WelcomeGifContainer = () => {
  const { heroVideoPath } = tenantConfig.home;

  if (!heroVideoPath) return null;

  return (
    <div className="flex flex-col items-center h-[100svh] bg-black relative">
      <video
        className="w-full h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideoPath} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className="absolute bottom-4 animate-bounce">
        <ArrowDropDown className="text-white h-10 w-10" />
      </div>
    </div>
  );
};
