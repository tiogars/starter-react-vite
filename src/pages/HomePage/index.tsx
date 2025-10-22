import BasicPage from "../../components/BasicPage";
import Link from "@mui/material/Link";

export const HomePage = () => {
  return (
    <BasicPage
      header1="Welcome to the Basic Page"
      content="This is a simple page layout."
    >
      <ul>
        <li>Feature 1: Easy to use</li>
        <li>Feature 2: Responsive design</li>
        <li>Feature 3: Customizable components</li>
      </ul>

      <ul>
        <li>
          <Link href="https://mui.com/" target="_blank" rel="noopener">
            MUI Documentation
          </Link>
        </li>
        <li>
          <Link href="https://react.dev/" target="_blank" rel="noopener">
            React Documentation
          </Link>
        </li>
        <li>
          <Link href="https://vite.dev/" target="_blank" rel="noopener">
            Vite Documentation
          </Link>
        </li>
        <li>
          <Link href="https://vitest.dev/" target="_blank" rel="noopener">
            Vitest Documentation
          </Link>
        </li>
        {/* React router */}
        <li>
          <Link href="https://reactrouter.com/" target="_blank" rel="noopener">
            React Router Documentation
          </Link>
        </li>
        {/* Tiogars@Github */}
        <li>
          <Link
            href="https://github.com/tiogars"
            target="_blank"
            rel="noopener"
          >
            Tiogars@Github
          </Link>
        </li>
        {/* https://github.com/tiogars/starter-react-vite */}
        <li>
          <Link
            href="https://github.com/tiogars/starter-react-vite"
            target="_blank"
            rel="noopener"
          >
            Starter React Vite Repository
          </Link>
        </li>
      </ul>
    </BasicPage>
  );
};

export default HomePage;
