import React from "react";

const MainWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div
      style={{
        padding: "var(--main-padding)",
        width: "var(--main-width)",
        margin: "2rem auto",
      }}
    >
      {children}
    </div>
  );
};

export default MainWrapper;