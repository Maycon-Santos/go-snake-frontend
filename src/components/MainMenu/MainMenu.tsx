import { useState } from "react";
import Button from "../Form/Button";
import OutsideClickHandler from "../OutsideClickHandler";

export const MainMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OutsideClickHandler
      className="relative h-fit"
      handler={() => setIsOpen(false)}
    >
      <Button slanted onClick={() => setIsOpen(!isOpen)}>
        Menu
      </Button>

      {isOpen && (
        <div className="flex flex-col gap-3 pt-3 absolute top-full right-0">
          <Button slanted variant="primary-reverse" className="mr-4">
            Profile
          </Button>
          <Button slanted variant="primary-reverse" className="mr-8">
            Settings
          </Button>
          <Button slanted variant="error" className="mr-12">
            Logout
          </Button>
        </div>
      )}
    </OutsideClickHandler>
  );
};
