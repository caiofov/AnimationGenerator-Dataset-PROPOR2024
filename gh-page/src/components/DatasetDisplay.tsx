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
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Carousel } from "./Carousel";
import SubjectIcon from "@mui/icons-material/Subject";
const buttons = [{ id: "", name: "All" }, ...STORIES];

const DatasetGrid: React.FC<{ dataset: DatasetType[] }> = ({ dataset }) => {
  return (
    <Grid2 container spacing={2}>
      {dataset.map(({ id, prompt, generatedText, images, map }) => {
        return (
          <Grid2 size={4} key={id}>
            <Card key={id}>
              {images.length ? (
                <Carousel {...{ images, id }} />
              ) : (
                <Typography>
                  Something went wrong with this animation
                </Typography>
              )}

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

              {map ? (
                <Tooltip title="See map JSON on GitHub">
                  <Link
                    href={`https://github.com/caiofov/AnimationGenerator-Dataset-PROPOR2024/blob/main/Animations/data/${map}`}
                    target="_blank"
                    underline="none"
                    variant="body2"
                  >
                    <SubjectIcon />
                  </Link>
                </Tooltip>
              ) : null}
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
