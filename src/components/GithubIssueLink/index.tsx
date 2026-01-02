import { Link } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import type { GithubIssueLinkProps } from "./GithubIssueLink.types";

const GithubIssueLink = (props: GithubIssueLinkProps) => {
  const repositoryUrl = props.repositoryUrl || "https://github.com/tiogars/starter-react-vite";
  const issueUrl = `${repositoryUrl}/issues/new`;

  return (
    <Link
      href={issueUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open GitHub issue"
      sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
    >
      <BugReportIcon fontSize="small" />
      {props.children || "Issues"}
    </Link>
  );
};

export default GithubIssueLink;
