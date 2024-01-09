import { createGlobalStyle } from "styled-components";
import { theme } from "../assets/theme/theme";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'SF Pro Display', sans-serif;
  }

  *::-webkit-scrollbar-track {
    background-color: #fff;
  }

  *::-webkit-scrollbar-thumb {
    -webkit-border-radius: 0;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: rgba(0, 0, 0, 0);
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #1890ff;
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 5px;
    height: 7px;
  }

  #root {
    .ant-form-item {
      margin-bottom: 8px;
    }

    .ant-form-vertical .ant-form-item-label {
      padding-bottom: 2px;
    }
  }

  .ant-drawer-header {
    border-bottom: 2px solid ${theme.colors.lightGrayAnt};
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

  .ant-table-column-sorters {
    display: grid;
    grid-template-columns: max-content auto;
    justify-content: flex-start;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
  }
`;
