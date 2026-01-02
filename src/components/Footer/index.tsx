import { Box, Divider, Stack } from "@mui/material";
import ApiHealth from "../ApiHealth";
import SwaggerLink from "../SwaggerLink";
import Version from "../Version";
import GithubLink from "../GithubLink";
import GithubIssueLink from "../GithubIssueLink";
import PoweredBySection from "../PoweredBySection";
import CopyrightNotice from "../CopyrightNotice";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mt: 4,
      mb: 2,
    }}
  >
    <Stack
      direction={"column"}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%", px: { xs: 2, sm: 3 }, maxWidth: 1200 }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        <CopyrightNotice />
        <Divider orientation="vertical" flexItem />
        <Version />
      </Stack>
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        <SwaggerLink>API documentation</SwaggerLink>
        <ApiHealth />
      </Stack>
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        <GithubLink />
        <GithubIssueLink />
      </Stack>
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        <PoweredBySection />
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
