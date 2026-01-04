import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import type { BasicPageProps } from "./BasicPage.types";

const BasicPage = ({ header, content, children }: BasicPageProps) => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: (theme) => theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 2.5, md: 3 }, pb: { xs: 1.5, md: 2 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.25, md: 2.75 },
            borderRadius: 2,
            border: "1px solid",
            borderColor: (theme) => theme.palette.divider,
            background: (theme) =>
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)"
                : theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2.25,
          }}
        >
          <Box
            sx={{
              width: 10,
              alignSelf: "stretch",
              borderRadius: 10,
              background: (theme) => `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          />
          <Stack spacing={0.5}>
            <Typography variant="overline" sx={{ letterSpacing: 1.2, color: "text.secondary" }}>
              Control Center
            </Typography>
            <Typography variant="h4" component="h1" fontWeight={800}>
              {header}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720 }}>
              {content}
            </Typography>
          </Stack>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 5 } }}>
        <Stack spacing={{ xs: 2.5, md: 3 }}>{children}</Stack>
      </Container>
    </Box>
  );
};

export default BasicPage;
