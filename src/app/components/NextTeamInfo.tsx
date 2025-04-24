import { FC, useState } from "react";
import Image from "next/image";
import { Popover } from "@mui/material";

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

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (data.nextTeam === null) {
    return <> - </>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          src={data.nextTeam}
          alt={data.nextTeam}
          height={20}
          width={30}
        />
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="flex flex-col items-center justify-center p-2 bg-gray-100">
          <p>Proximo partido</p>
          <div className="flex gap-5 items-center justify-center p-6">
            <div className="flex flex-col items-center">
              <Image
                src={data.escudo}
                alt={data.escudo}
                height={30}
                width={50}
              />
              <span className="text-xs mt-1">{data.nombreEquipo}</span>
            </div>
            <p>VS</p>
            <div className="flex flex-col items-center">
              <Image
                src={data.nextTeam}
                alt={data.nextTeam}
                height={30}
                width={50}
              />
              <span className="text-xs mt-1">{data.nombreEquipoRival}</span>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
