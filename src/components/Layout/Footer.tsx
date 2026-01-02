import { Box } from "@mui/material";
import type { FooterProps } from "./Footer.types";
import ApiHealth from "../ApiHealth";
import SwaggerLink from "../SwaggerLink";
import Version from "../Version";
import GithubLink from "../GithubLink";

const Footer = (props: FooterProps) => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
    <SwaggerLink />
    <ApiHealth />
    <Version />
    <GithubLink />
  </Box>
);

export default Footer;
