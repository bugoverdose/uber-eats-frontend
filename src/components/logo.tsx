import React from "react";

import uberLogo from "../images/uber-eats-logo.svg";

interface ILogoImgProps {
  css: string;
}

export const LogoImg: React.FC<ILogoImgProps> = ({ css }) => {
  return <img src={uberLogo} alt="Uber Eats" className={css} />;
};
