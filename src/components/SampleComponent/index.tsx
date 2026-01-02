import type { SampleComponentProps } from "./SampleComponent.types";

const SampleComponent = (props: SampleComponentProps) => {
  return (
    <>
      Argument : {props.argument}
      Children : {props.children}
    </>
  );
};

export default SampleComponent;
