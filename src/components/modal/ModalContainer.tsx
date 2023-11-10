import clsx from "clsx";

type ModalContainerProps = {
  children: React.ReactNode;
  mobile?: boolean;
};

export const ModalContainer = ({ mobile, children }: ModalContainerProps) => {
  return (
    <>
      <div
        className={clsx(
          "absolute inset-x-0 bg-gradient",
          mobile ? "bottom-0 top-16" : "inset-y-0",
        )}
      />
      <div
        className={clsx(
          "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-0 rounded-lg bg-white dark:bg-gunmetal-800",
          mobile
            ? "w-9/12 max-w-sm p-0"
            : "w-11/12 max-w-[30rem] p-6 md:w-9/12 md:px-8 md:pb-10 md:pt-8",
        )}
      >
        {children}
      </div>
    </>
  );
};

export default ModalContainer;
