import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../Context";
import { useState, useEffect } from "react";
import { errorAlert } from "../Constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { contract, walletAddress, setShowAlert, setErrorMessage, gameData } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const navigate = useNavigate();

  const handleRegisterUser = async () => {
    if (contract == undefined) return;
    try {
      const playerExist = await contract.isPlayer(walletAddress);
      console.log("playerExist", playerExist);
      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 200000,
        });
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
      navigate("/createbattle");
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const checkForPlayerToken = async () => {
    const playerExist = await contract.isPlayer(walletAddress);
    const playerTokenExists = await contract.isPlayerToken(walletAddress);
    if (playerExist && playerTokenExists) {
      navigate("/createbattle");
    }
  };

  useEffect(() => {
    if (contract && walletAddress) {
      checkForPlayerToken();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (gameData?.activeBattle?.name) {
      navigate(`/battle/${gameData?.activeBattle?.name}`);
    }
  }, [gameData]);

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
        type={"text"}
      />
      <CustomButton
        title="Register"
        handleClick={handleRegisterUser}
        restType="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playin <br /> The ultimate web3 NFT Card Game
  </>
);
