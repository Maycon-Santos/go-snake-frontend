import Form from "../Form";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Modal, { ModalProps } from "../Modal";

interface ConnectMatchModalProps {
  state?: ModalProps["state"];
}

export const ConnectMatchModal: React.FC<ConnectMatchModalProps> = (props) => {
  const { state } = props;

  return (
    <Modal title="Insert match ID" state={state}>
      <Form className="flex flex-col gap-3">
        <Input type="text" placeholder="Match ID" autoFocus />
        <Button type="submit">Enter</Button>
      </Form>
    </Modal>
  );
};
