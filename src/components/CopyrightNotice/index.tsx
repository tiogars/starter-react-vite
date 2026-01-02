import { Typography } from "@mui/material";
import type { CopyrightNoticeProps } from "./CopyrightNotice.types";

const CopyrightNotice = (props: CopyrightNoticeProps) => {
  const startYear = props.startYear || 2025;
  const endYear = props.endYear || 2026;
  const projectName = props.projectName || "starter-react-vite";

  return (
    <Typography variant="body2" color="text.secondary">
      © {startYear}–{endYear} {projectName}
    </Typography>
  );
};

export default CopyrightNotice;
