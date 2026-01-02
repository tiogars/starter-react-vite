import { Stack, Typography, Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { poweredByLinks } from "./poweredByLinks";
import type { PoweredBySectionProps } from "./PoweredBySection.types";

const PoweredBySection = (props: PoweredBySectionProps) => {
  const links = props.links || poweredByLinks;

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
      <Typography variant="body2" color="text.secondary">
        Powered by
      </Typography>
      {links.map(({ label, url, Icon }) => (
        <Link
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
        >
          <Icon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <LaunchIcon fontSize="inherit" sx={{ fontSize: 14 }} />
        </Link>
      ))}
    </Stack>
  );
};

export default PoweredBySection;
