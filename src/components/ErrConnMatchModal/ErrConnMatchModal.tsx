import { useRouter } from "next/router";
import Button from "../Form/Button";
import Modal, { ModalProps } from "../Modal";

type ErrConnMatchModalProps = {
  state: Exclude<ModalProps["state"], undefined>;
};

export const ErrConnMatchModal: React.FC<ErrConnMatchModalProps> = (props) => {
  const { state } = props;

  return (
    <Modal
      title="Unable to connect to match"
      text="This may be caused by network instability or the match does not exist"
      state={state}
    >
      <Button onClick={state.toggle} autoFocus>
        Ok
      </Button>
    </Modal>
  );
};
