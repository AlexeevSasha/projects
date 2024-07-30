import { createGlobalStyle } from "styled-components";
import { theme } from "./assets/theme/theme";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  *::-webkit-scrollbar-track {
    background-color: ${theme.colors.white};
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  *::-webkit-scrollbar-thumb {
    -webkit-border-radius: 0;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  *::-webkit-scrollbar-thumb:hover{
    background-color: #FA541C;
    cursor: pointer;
  }

  *::-webkit-scrollbar{
    width: 5px;
    height: 7px;
  }

  .alert-network {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 10px 0;
    text-align: center;
    transition: 0.2s ease;
  }

  .network-error {
    background: rgba(255, 242, 240, 0.95);
    border: 2px solid rgb(255, 204, 199);
  }

  .network-success {
    background-color: rgba(246, 255, 237, 0.95);
    border: 2px solid rgb(183, 235, 143);
  }
  
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${theme.colors.pureGray};
  }
  .ant-descriptions-item-label {
    font-weight: 600;
  }
`;
