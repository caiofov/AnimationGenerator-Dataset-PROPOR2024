import React, { useEffect, useReducer, useState } from "react";
import {
  DATASET_LIST,
  DatasetType,
  GENERATORS,
  GeneratorType,
  randomWordSequenceFromDataset,
  STORIES,
  StoryIdType,
} from "../utils/dataset";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  OutlinedInput,
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
  visibilityFilter: boolean;
};

const DatasetFilter: React.FC<{
  dispatch: (action: DispatchType) => void;
}> = ({ dispatch }) => {
  const [storyFilter, setStoryFilter] = useState(typedKeys(STORIES));
  const [generatorFilter, setGeneratorFilter] = useState(GENERATORS);
  const [visibilityFilter, setVisibilityFilter] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const searchLabel = "Search text";
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  useEffect(() => {
    setSearchPlaceholder(`${randomWordSequenceFromDataset(4)} ...`);
  }, []);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ md: 3, xs: 12 }}>
        <FormControl variant="outlined" fullWidth sx={{ height: "100%" }}>
          <InputLabel
            sx={{ color: "inherit", backgroundColor: "white", px: "10px" }}
            shrink
          >
            {searchLabel}
          </InputLabel>
          <OutlinedInput
            sx={{ height: "100%" }}
            placeholder={searchPlaceholder}
            onChange={(v) => {
              setSearchFilter(v.target.value);
              dispatch({
                generatorFilter,
                storyFilter,
                visibilityFilter,
                searchFilter: v.target.value,
              });
            }}
          />
        </FormControl>
      </Grid2>
      <Grid2 size={{ sm: 6, xs: 12 }}>
        <MultiSelect<StoryIdType>
          inputLabel="Select stories"
          selectedValues={storyFilter}
          allValues={typedKeys(STORIES)}
          onChange={(v) => {
            setStoryFilter(v);
            dispatch({
              storyFilter: v,
              generatorFilter,
              searchFilter,
              visibilityFilter,
            });
          }}
          getSelectLabel={(v) => STORIES[v]}
        />
      </Grid2>
      <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
        <MultiSelect<GeneratorType>
          inputLabel="Select generators"
          selectedValues={generatorFilter}
          allValues={GENERATORS}
          onChange={(v) => {
            setGeneratorFilter(v);
            dispatch({
              generatorFilter: v,
              storyFilter,
              searchFilter,
              visibilityFilter,
            });
          }}
          getSelectLabel={(v) => v}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <FormControlLabel
          label="Display empty animations"
          control={
            <Checkbox
              checked={visibilityFilter}
              onChange={(e) => {
                const v = e.target.checked;
                setVisibilityFilter(v);
                dispatch({
                  generatorFilter,
                  storyFilter,
                  searchFilter,
                  visibilityFilter: v,
                });
              }}
            />
          }
        ></FormControlLabel>
      </Grid2>
    </Grid2>
  );
};

export const DatasetDisplay = () => {
  const reducer = (_: DatasetType[], action: DispatchType) => {
    return DATASET_LIST.filter(
      ({ id, generator, prompt, generatedText, map }) => {
        return (
          action.storyFilter.some((f) => id.startsWith(f)) &&
          action.generatorFilter.includes(generator) &&
          [prompt, generatedText, id].some((s) =>
            s.toLowerCase().includes(action.searchFilter.toLowerCase())
          ) &&
          (action.visibilityFilter ? true : map !== null)
        );
      }
    );
  };

  const [dataset, dispatch] = useReducer(reducer, DATASET_LIST);
  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <Typography component="section" variant="subtitle2" fontSize="1.5rem">
          Dataset
        </Typography>

        <DatasetFilter dispatch={dispatch} />

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
