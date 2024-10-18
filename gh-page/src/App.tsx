import { DatasetDisplay } from "./components/DatasetDisplay";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({ palette: { mode: "light" } });
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="xl">
        <DatasetDisplay />
      </Container>
    </ThemeProvider>
  );
}

export default App;
