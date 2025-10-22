import type { BasicPageProps } from "./BasicPage.types";

export const BasicPage = (props: BasicPageProps) => {
  return (
    <>
      <h1>{props.header1}</h1>
      <p>{props.content}</p>
      {props.children}
    </>
  );
};

export default BasicPage;
