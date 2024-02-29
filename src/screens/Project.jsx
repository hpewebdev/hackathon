import React from "react";
import Header from "../components/Header";
import RoundTwo from "../components/roundTwo";
import RoundOne from "../components/roundOne";
import RoundThree from "../components/roundThree";
import secureLocalStorage from "react-secure-storage";
const Project = () => {
  const round = secureLocalStorage.getItem("round");
  return (
    <div>
      <Header />

      {round == 1 ? (
        <>
          <RoundOne round={round} />
        </>
      ) : round == 2 ? (
        <>
          <RoundTwo round={round} />
        </>
      ) : (
        <>
          <RoundThree round={round} />
        </>
      )}
    </div>
  );
};

export default Project;
