import { Button, Link } from "@mui/material";
import { Description as SwaggerIcon } from "@mui/icons-material";
import type { SwaggerLinkProps } from "./SwaggerLink.types";

export const SwaggerLink = (props: SwaggerLinkProps) => {
  const swaggerUrl = props.url || import.meta.env.VITE_SWAGGER_URL;

  if (!swaggerUrl) {
    return null;
  }

  return (
    <Link
      href={swaggerUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: 'none' }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<SwaggerIcon />}
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          },
        }}
      >
        {props.children || 'API Documentation'}
      </Button>
    </Link>
  );
};

export default SwaggerLink;