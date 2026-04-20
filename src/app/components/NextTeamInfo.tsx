import { FC, useState } from "react";
import { Popover } from "@mui/material";
import Image from "next/image";

interface NextTeamInfoProps {
  data: {
    escudo: string;
    nextTeam: string | null;
    nombreEquipo: string;
    nombreEquipoRival: string;
  };
}

export const NextTeamInfo: FC<NextTeamInfoProps> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  if (!data.nextTeam) {
    return <span className="text-gray-600 text-sm">—</span>;
  }

  return (
    <>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: "#2a2a2a" }}
        aria-owns={open ? "next-team-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Image src={data.nextTeam} alt={data.nombreEquipoRival} height={32} width={48} className="object-contain" />
      </div>
      <Popover
        id="next-team-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div
          className="flex flex-col items-center justify-center p-4 gap-3"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-wider">Próximo partido</p>
          <div className="flex gap-6 items-center justify-center">
            <div className="flex flex-col items-center gap-1">
              <Image src={data.escudo} alt={data.nombreEquipo} height={32} width={48} className="object-contain" />
              <span className="text-xs text-white mt-1">{data.nombreEquipo}</span>
            </div>
            <span className="text-gray-400 text-sm font-bold">VS</span>
            <div className="flex flex-col items-center gap-1">
              <Image src={data.nextTeam} alt={data.nombreEquipoRival} height={32} width={48} className="object-contain" />
              <span className="text-xs text-white mt-1">{data.nombreEquipoRival}</span>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
