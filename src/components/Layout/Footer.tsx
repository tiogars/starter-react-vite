import React from "react";
import Box from "@mui/material/Box";
import ApiHealth from "../ApiHealth";

const Footer: React.FC = () => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
    <ApiHealth />
  </Box>
);

export default Footer;
