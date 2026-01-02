import { Link } from "@mui/material";
import type { GithubLinkProps } from "./GithubLink.types";
import GitHubIcon from "@mui/icons-material/GitHub";

const GithubLink = (props: GithubLinkProps) => {
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