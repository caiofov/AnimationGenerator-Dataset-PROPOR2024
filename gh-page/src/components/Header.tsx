import { Paper, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

export const Header = () => {
  return (
    <Paper
      sx={{
        padding: "20px",
        marginBottom: "5%",
        display: "flex",
        alignItems: "center",
        gap: "1%",
      }}
    >
      <Box width="30%" display="flex" alignItems="center" gap="10%">
        <Box
          component="img"
          alt="Logo UFC"
          title="Federal University of Ceará"
          height="100px"
          src="https://www.ufc.br/images/_images/a_universidade/identidade_visual/brasao/brasao2_vertical_cor_300dpi.png"
        />
        <Box
          component="img"
          alt="Logo PROPOR"
          title="PROPOR"
          height="100px"
          src="https://propor2024.citius.gal/wp-content/uploads/2024/02/logoPropor.png"
        />
      </Box>
      <Box gap="10px" display="flex" flexDirection="column">
        <Typography variant="h1" component="h1" fontSize="3rem">
          Dataset - A Natural Language Text to Role-Playing Game Animation
          Generator
        </Typography>
        <Typography variant="subtitle1">
          Caio de F. Oliveira, Artur O. R. Franco, Wellington Franco and José G.
          R. Maia
        </Typography>
      </Box>
    </Paper>
  );
};
