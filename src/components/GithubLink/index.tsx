import { Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const GithubLink = () => {
  return (
    <Link
      href="https://github.com/tiogars/starter-react-vite"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </Link>
  );
};

export default GithubLink;