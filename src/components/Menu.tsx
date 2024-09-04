import { useState } from "react";
import LeftPanel from "./LeftPanel";
import Library from "./Library";
import Login from "./Login";
import Signup from "./Signup";

export default function Menu() {
  // useState to manage the window card of the login
  const [card, setCard] = useState<string>("library");

  /**
   * change the window content
   * @param cardName the name of the card to be displayed
   */
  const toggleCard = (cardName: string) => {
    setCard(cardName);
  };

  return (
    <div className="flex flex-row">
      <LeftPanel toggleCard={toggleCard} card={card} />
      {card === "library" && <Library />}
      {card === "login" && <Login />}
      {card === "signup" && <Signup />}
    </div>
  );
}
