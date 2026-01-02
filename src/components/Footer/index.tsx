import { Box, Divider, Stack } from "@mui/material";
import ApiHealth from "../ApiHealth";
import CopyrightNotice from "../CopyrightNotice";
import GithubIssueLink from "../GithubIssueLink";
import GithubLink from "../GithubLink";
import PoweredBySection from "../PoweredBySection";
import SwaggerLink from "../SwaggerLink";
import Version from "../Version";

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
        <GithubLink />
        <GithubIssueLink />
        <Divider orientation="vertical" flexItem />
        <SwaggerLink>
          <ApiHealth />
        </SwaggerLink>
      </Stack>
      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
        <PoweredBySection />
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
