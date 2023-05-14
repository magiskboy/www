import React from "react";

export const Layout = React.forwardRef<
  React.PropsWithRef<HTMLDivElement>,
  React.PropsWithChildren
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "1rem auto",
        padding: "var(--main-padding)",
        width: "var(--main-width)",
      }}
    >
      {children}
    </div>
  );
});

Layout.displayName = "Layout";
