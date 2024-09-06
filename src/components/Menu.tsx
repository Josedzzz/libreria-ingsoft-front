import { useState } from "react";
import LeftPanel from "./LeftPanel";
import Library from "./Library";
import Login from "./Login";
import Signup from "./Signup";

export default function Menu() {
  // useState to manage the window card of the login
  const [card, setCard] = useState<string>("library");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userId")
  );

  /**
   * change the window content
   * @param cardName the name of the card to be displayed
   */
  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  /**
   * Handles the login state based on the localStorage value
   */
  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  };

  /**
   * Handles the logout state
   */
  const handleLoggedOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-row">
      <LeftPanel
        toggleCard={toggleCard}
        card={card}
        handleLoggedIn={handleLoggedIn}
        handleLoggedOut={handleLoggedOut}
        isLoggedIn={isLoggedIn}
      />
      {card === "library" && <Library />}
      {card === "login" && <Login handleLoggedIn={handleLoggedIn} />}
      {card === "signup" && <Signup />}
    </div>
  );
}
