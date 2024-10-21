import { Paper, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

export const Header = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1%",
        padding: "20px",
        marginBottom: "5%",
      }}
    >
      <Box width="30%" display="flex" alignItems="center" gap="10%">
        <Box
          component="img"
          alt="Logo UFC"
          title="UFC"
          height="100px"
          src="https://www.ufc.br/images/_images/a_universidade/identidade_visual/brasao/brasao2_vertical_cor_300dpi.png"
        />
        <Box
          component="img"
          alt="Logo PROPOR"
          title="Propor"
          height="100px"
          src="https://propor2024.citius.gal/wp-content/uploads/2024/02/logoPropor.png"
        />
      </Box>
      <Typography variant="h1" component="h1" fontSize="3rem">
        Dataset - A Natural Language Text to Role-Playing Game Animation
        Generator
      </Typography>
    </Paper>
  );
};
