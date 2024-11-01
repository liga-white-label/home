"use client";

import { useOneFaseCampeonatoQuery } from "@/repositories/CampeonatoRepository";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { PartidosPorDiaV2, RegularMatch } from "./PartidosPorDiaV2";
import LoadingScreen from "./loading/Loading";

interface FixtureCopaPageProps {
  faseId: string;
}

const FixtureCopaPage: React.FC<FixtureCopaPageProps> = ({ faseId }) => {
  const { data, isLoading, isError } = useOneFaseCampeonatoQuery(faseId);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error...</div>;

  return data?.map((grupo, index) => (
    <>
      <Box key={index}>
        <Box className="flex w-full py-2 bg-gray-200 items-center justify-center">
          <Typography
            variant="h6"
            fontWeight={"bold"}
          >{`Grupo ${grupo.name}`}</Typography>
        </Box>
        {
          <PartidosPorDiaV2
            matches={
              grupo.matches
                .sort((m1, m2) => (m1.dateNumber < m2.dateNumber ? -1 : 1))
                .map((m) => ({
                  equipoLocal: {
                    id: m.homeTeam.id,
                    name: m.homeTeam.name,
                    logoUrl: m.homeTeam.logo,
                    gender: m.homeTeam.gender,
                    category_id: m.homeTeam.categoryName || "",
                  },
                  equipoVisitante: {
                    id: m.awayTeam.id,
                    name: m.awayTeam.name,
                    logoUrl: m.awayTeam.logo,
                    gender: m.awayTeam.gender,
                    category_id: m.awayTeam.categoryName || "",
                  },
                })) || []
            }
            handleClickSeeMatch={function (match: RegularMatch): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      </Box>
    </>
  ));
};

export default FixtureCopaPage;

const caca = [
  {
    date: null,
    dateNumber: 1,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6f7d2cb830c176f2289",
      name: "central cordoba",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6e0d2cb830c176f2280",
      name: "belgrano",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
  {
    date: null,
    dateNumber: 1,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6d1d2cb830c176f227d",
      name: "aldosivi",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6ffd2cb830c176f228f",
      name: "river",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
  {
    date: null,
    dateNumber: 2,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6f7d2cb830c176f2289",
      name: "central cordoba",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6ffd2cb830c176f228f",
      name: "river",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
  {
    date: null,
    dateNumber: 2,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6e0d2cb830c176f2280",
      name: "belgrano",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6d1d2cb830c176f227d",
      name: "aldosivi",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
  {
    date: null,
    dateNumber: 3,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6f7d2cb830c176f2289",
      name: "central cordoba",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6d1d2cb830c176f227d",
      name: "aldosivi",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
  {
    date: null,
    dateNumber: 3,
    field: null,
    linemenTeam: null,
    scorer: null,
    status: "Upcoming",
    comments: null,
    phaseId: null,
    homeTeam: {
      id: "6709a6ffd2cb830c176f228f",
      name: "river",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    awayTeam: {
      id: "6709a6e0d2cb830c176f2280",
      name: "belgrano",
      gender: null,
      logo: "https://logodownload.org/wp-content/uploads/2016/11/argentina-national-football-team-logo-0-1.png",
      categoryName: null,
      leagueName: null,
      players: [],
    },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    homeTeamPlayerGoals: [],
    awayTeamPlayerGoals: [],
    homeTeamYellowCards: [],
    awayTeamYellowCards: [],
    homeTeamRedCards: [],
    awayTeamRedCards: [],
  },
];
