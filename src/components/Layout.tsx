import { type PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <div className="flex flex-col gap-4 p-4">{props.children}</div>;
};

export default Layout;
