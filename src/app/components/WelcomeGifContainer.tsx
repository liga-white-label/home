import { ArrowDropDown } from "@mui/icons-material";
import Image from "next/image";

export const WelcomeGifContainer = () => {
  return (
    <div className="flex flex-col items-center h-[100svh] bg-[#220a0a] relative">
      <video
        className="w-full h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/video-home.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className="absolute bottom-4 animate-bounce">
        <ArrowDropDown className="text-white h-10 w-10" />
      </div>
    </div>
  );
};
