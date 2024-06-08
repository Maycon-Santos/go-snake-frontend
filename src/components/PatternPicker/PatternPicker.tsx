/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import styles from "./PatternPicker.module.css";
import { useSkins } from "../SkinsProvider/SkinsProvider";
import { useAccount } from "../AccountProvider";

export const PatternPicker: React.FC = () => {
  const { account } = useAccount();
  const {
    availableSkins: { patterns },
    updateSkin,
    loading,
  } = useSkins();

  var collator = new Intl.Collator([], { numeric: true });

  return (
    <div className={styles.wrapper}>
      {Object.keys(patterns)
        .sort((a, b) => collator.compare(a, b))
        .map((patternId) => {
          const pattern = patterns[patternId];
          return (
            <button
              className={classNames(styles.pattern, {
                [styles.active]: patternId === account.skin.pattern,
              })}
              disabled={loading}
              key={patternId}
              onClick={() => updateSkin(account.skin.color, patternId)}
            >
              {pattern.type === "svg" && (
                <img
                  src={`data:image/svg+xml;utf8,${pattern.source}`}
                  className={styles.patternImage}
                  alt=""
                />
              )}
            </button>
          );
        })}
    </div>
  );
};
