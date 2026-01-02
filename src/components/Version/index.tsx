import Typography from "@mui/material/Typography";
import type { VersionProps } from "./Version.types";
import packageJson from "../../../package.json";

const Version = (props: VersionProps) => {
  const displayVersion = props.version || packageJson.version;
  
  return (
    <Typography variant="caption" color="text.secondary">
      v{displayVersion}
    </Typography>
  );
};

export default Version;
