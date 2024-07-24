import { Match } from "../models/Match";
import Image from "next/image";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { abbreviateTeamName } from "../utils/stringUtils";

interface PartidosPorDiaProps {
  matches: Match[];
}
export const PartidosPorDia: React.FC<PartidosPorDiaProps> = ({ matches }) => {
  return (
    <table className="w-full bg-white">
      <tbody>
        {matches.map((match, index) => (
          <tr
            className={`flex flex-row items-center
            ${index % 2 === 0 ? "bg-gray-200" : ""}`}
          >
            <td className="flex items-center justify-end gap-5 px-2 md:px-4 py-2  sm:w-56 md:w-72 ">
              <p className="max-[600px]:hidden flex line-clamp-1 text-ellipsis whitespace-nowrap  w-56">
                {match.team1.name}
              </p>
              <p className="max-[600px]:flex hidden">
                {abbreviateTeamName(match.team1.name)}
              </p>
              <Image
                src={match.team1.logoUrl}
                height={20}
                width={30}
                alt={match.team1.name}
              />
            </td>

            <td className="flex px-2 md:px-4 py-2">
              {match.score1 !== undefined || match.score2 !== undefined ? (
                <div className="w-14 bg-[#A60000] px-2 py-1 rounded-md items-center flex justify-center">
                  <p className="text-white font-bold">{`${match.score1} - ${match.score2}`}</p>
                </div>
              ) : (
                <div className="w-14 bg-gray-500 px-2 py-1 rounded-md items-center flex justify-center">
                  <p className="text-white font-bold">{match.time}</p>
                </div>
              )}
            </td>
            <td className="flex items-center justify-start gap-5 px-2 md:px-4 py-2 sm:w-56 md:w-72 w-full ">
              <Image
                src={match.team2.logoUrl}
                height={20}
                width={30}
                alt={match.team2.name}
              />
              <p className="max-[600px]:hidden flex line-clamp-1 text-ellipsis whitespace-nowrap  w-72">
                {match.team2.name}
              </p>
              <p className="max-[600px]:flex hidden">
                {abbreviateTeamName(match.team2.name)}
              </p>
            </td>

            <td className="flex items-center justify-start w-full gap-5 px-2 md:px-4 py-2 max-[768px]:hidden">
              <StadiumOutlinedIcon />
              <p>{match.cancha}</p>
            </td>

            <td className="flex items-center justify-end w-full gap-5 px-2 md:px-4 py-2 max-[320px]:hidden">
              <button className="flex gap-2 items-center">
                <VisibilityIcon />
                <p className="max-[500px]:hidden flex">Ver</p>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
