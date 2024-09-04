import { useState } from "react";

//Define types props
type LeftPanelProps = {
  toggleCard: (cardName: string) => void;
  card: string;
};

export default function LeftPanel({ toggleCard, card }: LeftPanelProps) {
  // useState to set the panel visible or not
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  /**
   * Change the state of the panel
   */
  const handleTogglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  /**
   * Edit the buttons based on the pressed one
   * @param link Current link content that showing
   * @returns a class with the css to apply for the button
   */
  const buttonClasses = (link: string) => 
    `flex items-center text-lg w-full p-2 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-current ${
      card === link 
        ? "bg-custom-gray border-b-2 border-r-2"
        : "bg-transparent hover:bg-custom-gray hover:border-b-2 hover:border-r-2"
    }`;

  /**
   * Render the panel when its visible
   * @returns the visible panel content
   */
  const renderVisibleContent = () => (
    <div className="flex flex-col items-start mt-24 space-y-4 px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-custom-dark font-bold">
        Joki Library{" "}
        <i className="fa-solid fa-book-bookmark text-xl sm:text-2xl md:text-3xl text-custom-dark"></i>
      </h1>
      <nav className="mt-8 w-full">
        <ul className="space-y-4 text-custom-dark">
          <li>
            <button
              onClick={() => toggleCard("login")}
              className={buttonClasses("login")}
            >
              <i className="fa-solid fa-user mr-4"></i>
              <h2 className="font-bold">Login</h2>
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleCard("signup")}
              className={buttonClasses("signup")}
            >
              <i className="fa-solid fa-right-to-bracket mr-4"></i>
              <h2 className="font-bold">Signup</h2>
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleCard("library")}
              className={buttonClasses("library")}
            >
              <i className="fa-solid fa-book mr-4"></i>
              <h2 className="font-bold">Library</h2>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  /**
   * Render the panel content when its not visible
   * @returns the not visible panel content
   */
  const renderCollapsedContent = () => (
    <div className="flex flex-col items-center mt-24 space-y-4 px-2">
      <nav className="mt-8 w-full">
        <ul className="space-y-4 text-custom-dark">
          <li>
            <button
              onClick={() => toggleCard("login")}
              className={buttonClasses("login")}
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleCard("signup")}
              className={buttonClasses("signup")}
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleCard("library")}
              className={buttonClasses("library")}
            >
              <i className="fa-solid fa-book"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        isPanelVisible ? "w-80" : "w-20"
      } transition-all duration-300 bg-custom-white flex-shrink-0 flex flex-col relative border-r-4 border-black`}
    >
      <button
        onClick={handleTogglePanel}
        className="absolute top-4 left-2 text-custom-dark p-2 border-t-2 border-l-2 border-b-4 border-r-4 border-current hover:bg-custom-gray rounded-xl focus:outline-none hover:border-b-2 hover:border-r-2"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      {isPanelVisible ? renderVisibleContent() : renderCollapsedContent()}
    </div>
  );
}
