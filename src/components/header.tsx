import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { LogoImg } from "./logo";

export const Header: React.FC = () => {
  const { data } = useLoggedInUser(); // 이미 cache에 존재하는 경우 재요청X. query의 실행 결과 그대로 활용.
  return (
    <header className="py-4">
      <div className="px-5 xl:px-0 w-full max-w-screen-lg mx-auto flex justify-between items-center">
        <LogoImg css="w-24" />
        <Link to="/users/my-profile">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </Link>
      </div>
    </header>
  );
};
