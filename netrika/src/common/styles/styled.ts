import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface IEmpty {}
const { default: styled, css, ThemeProvider } = styledComponents as ThemedStyledComponentsModule<IEmpty>;

export { styled, css, ThemeProvider };
