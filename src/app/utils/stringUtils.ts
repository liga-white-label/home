export const abbreviateTeamName = (teamName: string): string => {
  if (teamName.length === 0) {
    return teamName;
  }
  const words = teamName.split(" ");
  if (words.length === 1) return teamName.slice(0, 3).toUpperCase(); // Si el nombre del equipo es una sola palabra, no abreviar

  return words
    .filter((item, index) => index < 3)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};
