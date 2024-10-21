import React, { useReducer, useState } from "react";
import {
  DATASET_LIST,
  DatasetType,
  STORIES,
  StoryIdType,
} from "../utils/dataset";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
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

type DispatchType = { filter: StoryIdType[] };

const DatasetFilter: React.FC<{
  dispatch: (action: DispatchType) => void;
  filter: StoryIdType[];
}> = ({ dispatch, filter }) => {
  return (
    <MultiSelect<StoryIdType>
      inputLabel="Select stories"
      selectedValues={filter}
      allValues={typedKeys(STORIES)}
      onChange={(v) => {
        dispatch({ filter: v });
      }}
      getSelectLabel={(v) => STORIES[v]}
    />
  );
};

export const DatasetDisplay = () => {
  const [filter, setFilter] = useState<StoryIdType[]>(
    Object.keys(STORIES) as StoryIdType[]
  );

  const reducer = (_: DatasetType[], action: DispatchType) => {
    setFilter(action.filter);
    return DATASET_LIST.filter(({ id }) => {
      return action.filter.some((f) => id.startsWith(f));
    });
  };

  const [dataset, dispatch] = useReducer(reducer, DATASET_LIST);
  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <Typography component="section" variant="subtitle2" fontSize="1.5rem">
          Filters
        </Typography>

        <DatasetFilter dispatch={dispatch} filter={filter} />
      </Stack>
      <Stack gap="10px">
        <Typography component="section" variant="subtitle2" fontSize="1.5rem">
          Results
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
