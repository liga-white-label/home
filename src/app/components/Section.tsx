import React from "react";
import Match, { MatchProps } from "./Match";

interface SectionProps {
  title: string;
  matches: MatchProps[];
}

const Section: React.FC<SectionProps> = ({ title, matches }) => {
  return (
    <div className="mb-8 rounded-lg shadow-lg w-full border-2 border-black bg-gray-200">
      <h2 className="text-center font-bold text-xl mb-4">{title}</h2>
      {matches.map((match, index) => (
        <Match key={index} {...match} />
      ))}
    </div>
  );
};

export default Section;
