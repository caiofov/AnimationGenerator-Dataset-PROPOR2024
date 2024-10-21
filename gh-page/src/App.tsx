import { DatasetDisplay } from "./components/DatasetDisplay";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Header } from "./components/Header";

const theme = createTheme({ palette: { mode: "light" } });
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="xl">
        <Header />

        <DatasetDisplay />
      </Container>
    </ThemeProvider>
  );
}

export default App;
