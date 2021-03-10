import { useLocation } from "react-router-dom";

export const useLocationParam = (string: string) => {
  return new URLSearchParams(useLocation().search).get(string);
};

// const [_, code] = window.location.href.split("?code=");
