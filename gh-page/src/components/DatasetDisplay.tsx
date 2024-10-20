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
  Checkbox,
  Chip,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
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

export const DatasetDisplay = () => {
  const [filter, setFilter] = useState<StoryIdType[]>(
    Object.keys(STORIES) as StoryIdType[]
  );

  const reducer = (state: DatasetType[], action: { filter: StoryIdType[] }) => {
    setFilter(action.filter);
    return DATASET_LIST.filter(({ id }) => {
      return action.filter.some((f) => id.startsWith(f));
    });
  };

  const [dataset, dispatch] = useReducer(reducer, DATASET_LIST);
  return (
    <>
      <FormControl sx={{ m: 1 }}>
        <InputLabel>Select stories</InputLabel>
        <Select
          multiple
          value={filter}
          onChange={(v) =>
            dispatch({ filter: v.target.value as StoryIdType[] })
          }
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={STORIES[value]} />
              ))}
            </Box>
          )}
        >
          {typedKeys(STORIES).map((id) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={filter.includes(id as StoryIdType)} />
              <ListItemText>{STORIES[id]}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatasetGrid dataset={dataset} />
    </>
  );
};
