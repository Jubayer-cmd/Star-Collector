import { useEffect } from "react";
import { GAME_OVER } from "../constants";

const useGameState = (
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const handleGameMessages = (event: MessageEvent) => {
            if (event.data.type === GAME_OVER) {
                setIsRunning(false);
            }
        };

        window.addEventListener("message", handleGameMessages);

        return () => {
            window.removeEventListener("message", handleGameMessages);
        };
    }, [setIsRunning]);
};

export default useGameState;

