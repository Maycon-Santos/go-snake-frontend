import { useState } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import Button from "../Form/Button";
import OutsideClickHandler from "../OutsideClickHandler";
import Modal, { useModal } from "../Modal";

export const MainMenu: React.FC = () => {
  const router = useRouter();
  const logoutModal = useModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Confirm" state={logoutModal}>
        <Button
          variant="error"
          onClick={() => {
            deleteCookie("token");
            router.push("/");
          }}
        >
          Log out
        </Button>
      </Modal>
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
            <Button
              slanted
              variant="error"
              className="mr-12"
              onClick={logoutModal.toggle}
            >
              Logout
            </Button>
          </div>
        )}
      </OutsideClickHandler>
    </>
  );
};
