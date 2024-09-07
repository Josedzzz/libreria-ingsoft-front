import { useState } from "react";

// Define types props
type LeftPanelProps = {
  toggleCard: (cardName: string) => void;
  card: string;
  handleLoggedIn: () => void;
  handleLoggedOut: () => void;
  isLoggedIn: boolean;
};

export default function LeftPanel({
  toggleCard,
  card,
  handleLoggedOut,
  isLoggedIn,
}: LeftPanelProps) {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  /**
   * Change the state of the panel
   */
  const handleTogglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  /**
   * Edit the buttons based on the pressed one
   * @param link Current link content that is showing
   * @returns a class with the css to apply for the button
   */
  const buttonClasses = (link: string) =>
    `flex items-center text-lg w-full p-2 rounded-xl border-t-2 border-l-2 border-b-4 border-r-4 border-current ${
      card === link
        ? "bg-custom-gray border-b-2 border-r-2"
        : "bg-transparent hover:bg-custom-gray hover:border-b-2 hover:border-r-2"
    }`;

  /**
   * Render buttons when user is logged in
   * @param isPanelVisible Boolean that indicates if the panel is visible
   */
  const renderLoggedInButtons = (isPanelVisible: boolean) => (
    <>
      <li>
        <button
          onClick={() => toggleCard("library")}
          className={buttonClasses("library")}
        >
          <i className="fa-solid fa-book mr-4"></i>
          {isPanelVisible && <h2 className="font-bold">Library</h2>}
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            handleLoggedOut();
            window.location.reload();
          }}
          className={buttonClasses("logout")}
        >
          <i className="fa-solid fa-sign-out-alt mr-4"></i>
          {isPanelVisible && <h2 className="font-bold">Log Out</h2>}
        </button>
      </li>
    </>
  );

  /**
   * Render buttons when user is not logged in
   * @param isPanelVisible Boolean that indicates if the panel is visible
   */
  const renderLoggedOutButtons = (isPanelVisible: boolean) => (
    <>
      <li>
        <button
          onClick={() => toggleCard("login")}
          className={buttonClasses("login")}
        >
          <i className="fa-solid fa-user mr-4"></i>
          {isPanelVisible && <h2 className="font-bold">Login</h2>}
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleCard("signup")}
          className={buttonClasses("signup")}
        >
          <i className="fa-solid fa-right-to-bracket mr-4"></i>
          {isPanelVisible && <h2 className="font-bold">Signup</h2>}
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleCard("library")}
          className={buttonClasses("library")}
        >
          <i className="fa-solid fa-book mr-4"></i>
          {isPanelVisible && <h2 className="font-bold">Library</h2>}
        </button>
      </li>
    </>
  );

  /**
   * Render the panel when it's visible
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
          {isLoggedIn
            ? renderLoggedInButtons(true)
            : renderLoggedOutButtons(true)}
        </ul>
      </nav>
    </div>
  );

  /**
   * Render the panel content when it's not visible (collapsed)
   * @returns the not visible panel content
   */
  const renderCollapsedContent = () => (
    <div className="flex flex-col items-center mt-24 space-y-4 px-2">
      <nav className="mt-8 w-full">
        <ul className="space-y-4 text-custom-dark">
          {isLoggedIn
            ? renderLoggedInButtons(false)
            : renderLoggedOutButtons(false)}
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
