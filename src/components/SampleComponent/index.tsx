import type { SampleComponentProps } from "./SampleComponent.types";

export const SampleComponent = (props: SampleComponentProps) => {
  return (
    <>
      Argument : {props.argument}
      Children : {props.children}
    </>
  );
};
export default SampleComponent;
