import { Grid2, Link, Paper, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArticleIcon from "@mui/icons-material/Article";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Links = () => {
  const tooltipStyle = {
    display: "flex",
    alignItems: "center",
    gap: { sm: "5px", xs: "10px" },
  };
  return (
    <Box display="flex" gap={{ sm: "20px", xs: "15px" }}>
      <Tooltip title="Read the paper" sx={tooltipStyle}>
        <Link
          href="https://aclanthology.org/2024.propor-1.49.pdf"
          target="_blank"
          underline="none"
        >
          <ArticleIcon />
          Read the paper
        </Link>
      </Tooltip>
      <Tooltip title="See on itch.io" sx={tooltipStyle}>
        <Link
          href="https://caiofov.itch.io/animation-generator-dataset"
          target="_blank"
          underline="none"
        >
          <PlayArrowIcon /> See on itch.io
        </Link>
      </Tooltip>
    </Box>
  );
};
export const Header = () => {
  const imgHeight = {
    xs: 90,
    sm: 100,
    md: 100,
    xl: 110,
  };
  return (
    <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
      <Grid2 container spacing={3}>
        <Grid2 size={{ sm: 3, xs: 12 }}>
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent={{ sm: "center", xs: "space-around" }}
            gap="20px"
            flexWrap="wrap"
          >
            <Box
              component="img"
              alt="Logo UFC"
              title="Federal University of Ceará"
              height={imgHeight}
              src="https://www.ufc.br/images/_images/a_universidade/identidade_visual/brasao/brasao2_vertical_cor_300dpi.png"
            />
            <Box
              component="img"
              alt="Logo PROPOR"
              title="PROPOR"
              height={imgHeight}
              src="https://propor2024.citius.gal/wp-content/uploads/2024/02/logoPropor.png"
            />
          </Box>
        </Grid2>
        <Grid2 size={{ sm: 9, xs: 12 }}>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            flexWrap="wrap"
            justifyContent="center"
            gap="10px"
          >
            <Typography
              variant="h1"
              component="h1"
              fontSize={{ lg: "3rem", md: "2.8rem", sm: "2.4rem", xs: "2rem" }}
            >
              Dataset - A Natural Language Text to Role-Playing Game Animation
              Generator
            </Typography>
            <Box display="flex" alignItems="center" gap="10px">
              <Typography variant="subtitle1">
                Oliveira, C. F., Franco, A., Franco, W., & Maia, J. G. (2024,
                March). A Natural Language Text to Role-Playing Game Animation
                Generator. In{" "}
                <i>
                  Proceedings of the 16th International Conference on
                  Computational Processing of Portuguese
                </i>{" "}
                (pp. 483-491).
              </Typography>
            </Box>
            <Links />
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
