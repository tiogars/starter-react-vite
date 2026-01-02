import { Link } from "@mui/material";
import type { SwaggerLinkProps } from "./SwaggerLink.types";

const SwaggerLink = (props: SwaggerLinkProps) => {
  const swaggerUrl = props.url || import.meta.env.VITE_SWAGGER_URL;

  if (!swaggerUrl) {
    return null;
  }

  return (
    <Link href={swaggerUrl} target="_blank" rel="noopener noreferrer">
      {props.children || "API Documentation"}
    </Link>
  );
};

export default SwaggerLink;
