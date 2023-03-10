import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useGlobalContext } from "../Context";
import { alertIcon, gameRules } from "../assets";
import styles from "../styles";

const GameInfo = () => {
  const { contract, gameData, setShowAlert, setErrorMessage } =
    useGlobalContext();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const navigate = useNavigate();

  const handleBattleExist = async () => {
    const battleName = gameData?.activeBattle?.name;
    try {
      await contract.quitBattle(battleName, {
        gasLimit: 200000,
      });
      setShowAlert({
        status: true,
        type: "info",
        message: `Your are quiting ${battleName}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <>
      <div className={styles.gameInfoIconBox}>
        <div
          className={`${styles.gameInfoIcon} ${styles.flexCenter}`}
          onClick={() => setToggleSideBar(true)}
        >
          <img src={alertIcon} alt="info" className={styles.gameInfoIconImg} />
        </div>
      </div>
      <div
        className={`${styles.gameInfoSidebar} ${
          toggleSideBar ? "translate-x-0" : "translate-x-full"
        } ${styles.glassEffect} ${styles.flexBetween} backdrop-blur-3xl`}
      >
        <div className=" flex flex-col">
          <div className={styles.gameInfoSidebarCloseBox}>
            <div
              className={`${styles.flexCenter} ${styles.gameInfoSidebarClose}`}
              onClick={() => setToggleSideBar(false)}
            >
              X
            </div>
          </div>
          <h3 className={styles.gameInfoHeading}>Game Rules :</h3>
          <div className="mt-3">
            {gameRules.map((rule, index) => (
              <p key={`game-rule-${index}`} className={styles.gameInfoText}>
                <span className="font-bold">{index + 1}. </span>
                {rule}
              </p>
            ))}
          </div>
        </div>
        <div className={`${styles.flexBetween} mt-10 gap-4 w-full`}>
          <CustomButton
            title={"Change BattleGround"}
            handleClick={() => navigate("/battleground")}
          />
          <CustomButton
            title={"Change BattleGround"}
            handleClick={() => handleBattleExist()}
          />
        </div>
      </div>
    </>
  );
};

export default GameInfo;
