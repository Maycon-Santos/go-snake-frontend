import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Grid.module.css";

interface GridProps extends PropsWithChildren {
  spacing?: 1;
}

interface RowProps extends PropsWithChildren {}

interface ColumnProps extends PropsWithChildren {
  grow?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const Grid: React.FC<GridProps> = (props) => {
  const { spacing = 1, children } = props;
  return (
    <div className={classNames(styles.grid, styles[`spacing-${spacing}`])}>
      {children}
    </div>
  );
};

export const Row: React.FC<RowProps> = (props) => {
  const { children } = props;
  return <div className={styles.row}>{children}</div>;
};

export const Column: React.FC<ColumnProps> = (props) => {
  const { grow, children } = props;
  return (
    <div className={classNames(styles.column, styles[`grow-${grow}`])}>
      {children}
    </div>
  );
};
