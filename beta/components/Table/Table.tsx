import style from "./Table.module.scss";
import classnames from "classnames";
import React, { ReactNode } from "react";

const Table: React.FC<Props> = ({ data, headline, border = true }) => {
  return (
    <table
      className={classnames({
        table: true,
        [style.root]: true,
        [style.border]: border,
      })}
    >
      <thead>
        <tr>
          {headline.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface Props {
  data: ReactNode[][];
  headline: string[];
  border?: boolean;
}

export default Table;
