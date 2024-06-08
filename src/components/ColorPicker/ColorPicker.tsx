import classNames from "classnames";
import { useSkins } from "../SkinsProvider/SkinsProvider";
import { useAccount } from "../AccountProvider";
import styles from "./ColorPicker.module.css";

export const ColorPicker: React.FC = () => {
  const { account } = useAccount();
  const {
    availableSkins: { colors },
    updateSkin,
    loading,
  } = useSkins();

  var collator = new Intl.Collator([], { numeric: true });

  return (
    <div className={styles.wrapper}>
      {Object.keys(colors)
        .sort((a, b) => collator.compare(a, b))
        .map((colorId) => {
          const color = colors[colorId];

          return (
            <button
              key={colorId}
              className={classNames(styles.color, {
                [styles.active]: colorId === account.skin.color,
              })}
              style={{ backgroundColor: color }}
              type="button"
              disabled={loading}
              onClick={() => updateSkin(colorId, account.skin.pattern)}
            />
          );
        })}
    </div>
  );
};
