import React, { useReducer, useState } from "react";
import { DATASET_LIST, DatasetType } from "../utils/dataset";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
} from "@mui/material";

const buttons = [
  { value: "", name: "All" },
  { value: "Ala", name: "Aladdin" },
  { value: "InJo", name: "Indiana Jones" },
  { value: "ViTe", name: "Journey to the Center of the Earth" },
  { value: "ChVe", name: "Little Red Riding Hood" },
  { value: "PePa", name: "Peter Pan" },
  { value: "PePr", name: "The Little Prince" },
];

const DatasetGrid: React.FC<{ dataset: DatasetType[] }> = ({ dataset }) => {
  return (
    <Grid2 container spacing={2}>
      {dataset.map(({ id, prompt, generatedText }) => {
        return (
          <Grid2 size={4} height="100%">
            <Card key={id}>
              <Divider>
                <Chip label={id} />
              </Divider>
              <CardContent>
                <Divider textAlign="left">Prompt</Divider>
                {prompt}
                <Divider textAlign="left">Generated text</Divider>
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
        {buttons.map(({ value, name }) => (
          <Button
            variant={filter === value ? "contained" : "outlined"}
            onClick={() => {
              dispatch({ filter: value });
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
