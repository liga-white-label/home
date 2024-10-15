import { ArrowDropDown } from "@mui/icons-material";
import Image from "next/image";

export const WelcomeGifContainer = () => {
  return (
    <div className="flex flex-col items-center h-[95svh] bg-[#220a0a]">
      <Image
        className="w-[100lvw] h-[100svh] flex object-cover "
        draggable="false"
        src="/assets/gif_welcome.gif"
        alt=""
        width={1920}
        height={1080}
        loading="lazy"
      />
      {/* <div className="max-w-full h-[85svh] flex object-cover items-center justify-center text-center">
        <p className="text-4xl md:text-8xl text-white">
          Bienvenidos a la liga más linda del mundo
        </p>
      </div> */}
      <ArrowDropDown className="text-white h-10 w-10" />
    </div>
  );
};
