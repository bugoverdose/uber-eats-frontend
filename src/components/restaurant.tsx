import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProp {
  id: number;
  restaurantName: string;
  coverImg: string;
  categoryName?: string; // categoryName: string | undefined;와 동일?
}

export const Restaurant: React.FC<IRestaurantProp> = ({
  id,
  coverImg,
  restaurantName,
  categoryName,
}) => (
  <Link to={`/restaurant/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-cover bg-center py-32 mb-2"
      ></div>
      <h3 className="text-xl font-medium"> {restaurantName}</h3>
      <span className="border-t mt-2 py-1 text-xs opacity-50 border-gray-400">
        {categoryName}
      </span>
    </div>
  </Link>
);
