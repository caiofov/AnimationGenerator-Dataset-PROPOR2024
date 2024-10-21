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
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Carousel } from "./Carousel";

// icons
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { typedKeys } from "../utils/types";
import { MultiSelect } from "./MultiSelect";

const itemIcons = {
  Story: MenuBookIcon,
  Generator: SmartToyIcon,
  Prompt: ChatIcon,
  "Generated text": LightbulbIcon,
};

const CardBodyItem: React.FC<{
  title: keyof typeof itemIcons;
  subtitle?: string;
  text: string;
}> = ({ title, text, subtitle }) => {
  const Icon = itemIcons[title];
  return (
    <ListItem>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText sx={{ display: "flex" }}>
        <Typography variant="subtitle2" component="h6">
          {title}:
        </Typography>
        {subtitle ? <Typography variant="body2">{subtitle}</Typography> : null}

        {text}
      </ListItemText>
    </ListItem>
  );
};

const DatasetGrid: React.FC<{ dataset: DatasetType[] }> = ({ dataset }) => {
  return (
    <Grid2 container spacing={2}>
      {dataset.map(
        ({
          id,
          storyID,
          prompt,
          generatedText,
          images,
          map,
          generator,
          promptNumber,
          resultNumber,
        }) => {
          return (
            <Grid2 size={4} key={id}>
              <Card key={id} sx={{ height: "100%" }}>
                {images.length ? (
                  <Carousel {...{ images, id }} />
                ) : (
                  <Box
                    sx={{ width: "100%", height: "41%" }}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <SentimentVeryDissatisfiedIcon />
                    Something went wrong with this animation
                  </Box>
                )}

                <Divider>
                  <Chip
                    label={
                      <Typography variant="overline" component="h5">
                        {id}
                      </Typography>
                    }
                  />
                </Divider>
                <CardContent>
                  <List>
                    <CardBodyItem title="Story" text={STORIES[storyID]} />
                    <CardBodyItem title="Generator" text={generator} />
                    <CardBodyItem
                      title="Prompt"
                      subtitle={`(nº ${promptNumber})`}
                      text={prompt}
                    />
                    <CardBodyItem
                      title="Generated text"
                      subtitle={`(nº ${resultNumber})`}
                      text={generatedText}
                    />
                  </List>

                  {map ? (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="See map JSON on GitHub">
                        <Link
                          href={`https://github.com/caiofov/AnimationGenerator-Dataset-PROPOR2024/blob/main/Animations/data/${map}`}
                          target="_blank"
                          underline="none"
                        >
                          <GitHubIcon />
                        </Link>
                      </Tooltip>
                    </Box>
                  ) : null}
                </CardContent>
              </Card>
            </Grid2>
          );
        }
      )}
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
        <InputLabel>Search</InputLabel>
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
