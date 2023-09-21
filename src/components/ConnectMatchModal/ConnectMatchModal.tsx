import { useRouter } from "next/router";
import Form from "../Form";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Modal, { ModalProps } from "../Modal";
import { FormProps } from "../Form/Form";

interface ConnectMatchModalProps {
  state: Exclude<ModalProps["state"], undefined>;
  connectMatch: (matchId: string) => Promise<boolean | void>;
}

export const ConnectMatchModal: React.FC<ConnectMatchModalProps> = (props) => {
  const { state, connectMatch } = props;
  const router = useRouter();

  const onSubmit: FormProps["onSubmit"] = async (data) => {
    const { match_id } = data;

    state.toggle();

    const connected = await connectMatch(match_id);

    if (connected) {
      router.replace(
        {
          pathname: "/lobby/[match_id]",
          query: {
            match_id,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <Modal title="Insert match ID" state={state}>
      <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Match ID" name="match_id" autoFocus />
        <Button type="submit">Enter</Button>
      </Form>
    </Modal>
  );
};
