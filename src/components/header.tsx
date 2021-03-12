import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { LogoImg } from "./logo";

export const Header: React.FC = () => {
  const { data } = useLoggedInUser(); // 이미 cache에 존재하는 경우 재요청X. query의 실행 결과 그대로 활용.
  return (
    <>
      {!data?.loggedInUser.emailVerified && (
        <div className="bg-red-500 p-3 text-center text-base text-white font-semibold">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="capsule-container-width flex justify-between items-center">
          <Link to="/">
            <LogoImg css="w-24" />
          </Link>
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </div>
      </header>
    </>
  );
};
