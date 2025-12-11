import React from "react";
import Box from "@mui/material/Box";
import ApiHealth from "../ApiHealth";
import SwaggerLink from "../SwaggerLink";
import Version from "../Version";
import GithubLink from "../GithubLink";

const Footer: React.FC = () => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
    <SwaggerLink />
    <ApiHealth />
    <Version />
    <GithubLink />
  </Box>
);

export default Footer;
