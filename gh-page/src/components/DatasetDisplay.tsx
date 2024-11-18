import React, { useReducer, useState } from "react";
import {
  DATASET_LIST,
  DatasetType,
  GENERATORS,
  GeneratorType,
  STORIES,
  StoryIdType,
} from "../utils/dataset";
import {
  Box,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";

import { typedKeys } from "../utils/types";
import { MultiSelect } from "./MultiSelect";
import { DatasetCard } from "./DatasetCard";

const DatasetGrid: React.FC<{ dataset: DatasetType[] }> = ({ dataset }) => {
  return (
    <Grid2 container spacing={2}>
      {dataset.map((item) => {
        return (
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }} key={item.id}>
            <DatasetCard {...item} />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

type DispatchType = {
  storyFilter: StoryIdType[];
  generatorFilter: GeneratorType[];
  searchFilter: string;
};

const DatasetFilter: React.FC<{
  dispatch: (action: DispatchType) => void;
}> = ({ dispatch }) => {
  const [storyFilter, setStoryFilter] = useState(typedKeys(STORIES));
  const [generatorFilter, setGeneratorFilter] = useState(GENERATORS);
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <>
      <MultiSelect<StoryIdType>
        inputLabel="Select stories"
        selectedValues={storyFilter}
        allValues={typedKeys(STORIES)}
        onChange={(v) => {
          setStoryFilter(v);
          dispatch({ storyFilter: v, generatorFilter, searchFilter });
        }}
        getSelectLabel={(v) => STORIES[v]}
      />
      <MultiSelect<GeneratorType>
        inputLabel="Select generators"
        selectedValues={generatorFilter}
        allValues={GENERATORS}
        onChange={(v) => {
          setGeneratorFilter(v);
          dispatch({ generatorFilter: v, storyFilter, searchFilter });
        }}
        getSelectLabel={(v) => v}
      />
      <FormControl variant="standard">
        <InputLabel>Search text</InputLabel>
        <Input
          onChange={(v) => {
            setSearchFilter(v.target.value);
            dispatch({
              generatorFilter,
              storyFilter,
              searchFilter: v.target.value,
            });
          }}
        />
      </FormControl>
    </>
  );
};

export const DatasetDisplay = () => {
  const reducer = (_: DatasetType[], action: DispatchType) => {
    return DATASET_LIST.filter(({ id, generator, prompt, generatedText }) => {
      return (
        action.storyFilter.some((f) => id.startsWith(f)) &&
        action.generatorFilter.includes(generator) &&
        [prompt, generatedText, id].some((s) =>
          s.toLowerCase().includes(action.searchFilter.toLowerCase())
        )
      );
    });
  };

  const [dataset, dispatch] = useReducer(reducer, DATASET_LIST);
  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <Typography component="section" variant="subtitle2" fontSize="1.5rem">
          Filters
        </Typography>

        <DatasetFilter dispatch={dispatch} />
      </Stack>
      <Stack gap="10px">
        <Typography component="section" variant="subtitle2" fontSize="1.5rem">
          Dataset
        </Typography>

        <Typography component="p" variant="body2">
          {`(${dataset.length} results found)`}
        </Typography>

        {dataset.length ? (
          <DatasetGrid dataset={dataset} />
        ) : (
          <Box
            width="100%"
            height="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="inherit" fontSize="2rem" marginTop="5%">
              No animations found, try selecting different filters
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
