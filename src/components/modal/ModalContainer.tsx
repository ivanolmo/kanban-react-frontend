type ModalContainerProps = {
  children: React.ReactNode;
  mobile?: boolean;
};

export const ModalContainer = (props: ModalContainerProps) => {
  return (
    <>
      <div
        className={`absolute inset-x-0 bg-gradient ${
          props.mobile ? "bottom-0 top-16" : "inset-y-0"
        }`}
      />
      <div
        className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-0 rounded-lg bg-white dark:bg-gunmetal-800 ${
          props.mobile
            ? "top-1/3 w-9/12 max-w-sm p-0"
            : "top-1/2 w-11/12 max-w-[30rem] p-6 md:w-9/12 md:px-8 md:pb-10 md:pt-8"
        }`}
      >
        {props.children}
      </div>
    </>
  );
};

export default ModalContainer;
