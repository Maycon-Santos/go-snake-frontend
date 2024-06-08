import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { AvailableSkins } from "@/services/skins";
import updateSkin from "@/services/updateSkin";

interface SkinsProviderProps extends PropsWithChildren {
  availableSkins: AvailableSkins | null;
}

interface SkinsContextValue {
  updateSkin: (colorId: string, patternId: string) => void;
  availableSkins: AvailableSkins;
  loading: boolean;
}

const SkinsContext = createContext<SkinsContextValue>({
  updateSkin: () => {
    console.error("SkinsProvider is not implemented");
  },
  availableSkins: {
    colors: {},
    patterns: {},
  },
  loading: false,
});

export const SkinsProvider: React.FC<SkinsProviderProps> = (props) => {
  const { availableSkins: availableSkinsInit, children } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const availableSkinsFallback: AvailableSkins = {
    colors: new Proxy(
      {},
      {
        get() {
          return "#000000";
        },
      }
    ),
    patterns: new Proxy(
      {},
      {
        get() {
          return {
            source:
              '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="white"/></svg>',
            type: "svg",
          };
        },
      }
    ),
  };

  const update = async (colorId: string, patternId: string) => {
    setLoading(true);
    const { success } = await updateSkin(colorId, patternId);

    if (success) {
      router.replace(router.asPath);
    }

    setLoading(false);
  };

  const availableSkins = useMemo((): AvailableSkins => {
    if (!availableSkinsInit?.patterns) return availableSkins;

    if (typeof window !== "undefined") {
      Object.keys(availableSkinsInit.patterns).forEach((patternId) => {
        const pattern = availableSkinsInit.patterns[patternId];

        let blob;

        if (pattern.type === "svg") {
          blob = new Blob([pattern.source], {
            type: "image/svg+xml;charset=utf-8",
          });
        }

        if (!blob) return;

        const patternImage = new Image();
        patternImage.src = URL.createObjectURL(blob);

        pattern.image = patternImage;
      });
    }

    return availableSkinsInit;
  }, [availableSkinsInit]);

  return (
    <SkinsContext.Provider
      value={{
        updateSkin: update,
        loading,
        availableSkins: availableSkins || availableSkinsFallback,
      }}
    >
      {children}
    </SkinsContext.Provider>
  );
};

export const useSkins = () => {
  return useContext(SkinsContext);
};
