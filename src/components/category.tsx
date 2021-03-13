import React from "react";

interface ICategoryProp {
  coverImg: string | null;
  name: string;
}

export const Category: React.FC<ICategoryProp> = ({ coverImg, name }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer w-24 group">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-cover bg-center w-20 h-20 rounded-full group-hover:shadow-2xl"
      ></div>
      <span className="text-base font-semibold text-center">{name}</span>
    </div>
  );
};
