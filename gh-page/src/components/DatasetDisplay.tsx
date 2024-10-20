import React, { useReducer, useState } from "react";
import { DATASET_LIST, DatasetType, STORIES } from "../utils/dataset";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { Carousel } from "./Carousel";

const buttons = [{ id: "", name: "All" }, ...STORIES];

const DatasetGrid: React.FC<{ dataset: DatasetType[] }> = ({ dataset }) => {
  return (
    <Grid2 container spacing={2}>
      {dataset.map(({ id, prompt, generatedText, images }) => {
        return (
          <Grid2 size={4} key={id}>
            <Card key={id}>
              <Carousel {...{ images, id }} />

              <Divider sx={{ marginTop: "15px" }}>
                <Chip label={<Typography>{id}</Typography>} />
              </Divider>
              <CardContent>
                <Divider sx={{ marginTop: "15px" }} textAlign="left">
                  Prompt
                </Divider>
                {prompt}
                <Divider sx={{ marginTop: "15px" }} textAlign="left">
                  Generated text
                </Divider>
                {generatedText}
              </CardContent>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export const DatasetDisplay = () => {
  const [filter, setFilter] = useState("");

  const reducer = (state: DatasetType[], action: { filter: string }) => {
    setFilter(action.filter);
    return DATASET_LIST.filter(({ id }) => id.startsWith(action.filter));
  };

  const [dataset, dispatch] = useReducer(reducer, DATASET_LIST);
  return (
    <>
      <ButtonGroup>
        {buttons.map(({ id, name }) => (
          <Button
            key={id}
            variant={filter === id ? "contained" : "outlined"}
            onClick={() => {
              dispatch({ filter: id });
            }}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
      <DatasetGrid dataset={dataset} />
    </>
  );
};
