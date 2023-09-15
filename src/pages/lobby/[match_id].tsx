import { useRouter } from "next/router";
import Button from "@/components/Form/Button";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import MainMenu from "@/components/MainMenu";
import PlayerStage from "@/components/PlayerStage";
import ConnectMatchModal from "@/components/ConnectMatchModal";
import { useModal } from "@/components/Modal";

export default function Lobby() {
  const router = useRouter();
  const connectMatchModal = useModal();

  const hasMatch = router.query.match_id != "_";

  return (
    <Layout containerWidth="full" className="grid">
      <ConnectMatchModal state={connectMatchModal} />
      <div className="w-full flex flex-col min-h-screen pt-6 sticky top-0">
        <div className="grid grid-cols-3">
          <Logo variant="small" className="col-span-2" />
          <div className="justify-self-end self-center">
            {!hasMatch && <MainMenu />}
            {hasMatch && (
              <Button variant="error" slanted>
                Exit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col md:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 pt-12 pb-6 md:pr-6 w-full m-auto">
            <PlayerStage
              username="Maycon"
              className="md:row-start-2 md:col-start-2"
            />
          </div>
          <div className="flex flex-col mt-auto pt-3 pb-6 md:w-128 sticky bottom-0 bg-color">
            <div className="flex flex-col w-full gap-3">
              {hasMatch && <span>Match ID: 1548796540</span>}
              {!hasMatch && (
                <Button
                  variant="primary-reverse"
                  onClick={connectMatchModal.toggle}
                >
                  Connect match
                </Button>
              )}
              {!hasMatch && <Button>Create match</Button>}
              <Button
                variant="secondary"
                className="text-4xl w-full w-full h-28"
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
