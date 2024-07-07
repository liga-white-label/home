import React from "react";
import Match, { MatchProps } from "./Match";

interface SectionProps {
  title: string;
  matches: MatchProps[];
}

const Section: React.FC<SectionProps> = ({ title, matches }) => {
  return (
    <div className="mb-8 w-full border-black bg-gray-200">
      {title !== "" && (
        <h2 className="text-center font-bold text-xl my-4">{title}</h2>
      )}
      {matches.map((match, index) => (
        <Match key={index} last={matches.length - 1 === index} {...match} />
      ))}
    </div>
  );
};

export default Section;
