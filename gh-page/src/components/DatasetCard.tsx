import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  GeneratorType,
  getMapGitHubLink,
  IdType,
  STORIES,
  StoryIdType,
} from "../utils/dataset";
import { Carousel } from "./Carousel";

// icons
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

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

const CardTitle: React.FC<{ animationId: IdType }> = ({ animationId }) => {
  return (
    <Divider>
      <Chip
        label={
          <Typography variant="overline" component="h5">
            <Link
              sx={{ textDecoration: "none", color: "inherit" }}
              href={`#${animationId}`}
            >
              {animationId}
            </Link>
          </Typography>
        }
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      />
    </Divider>
  );
};

const CardMedia: React.FC<{ images: string[]; id: IdType }> = ({
  images,
  id,
}) => {
  return (
    <Box>
      {images.length ? (
        <Carousel {...{ images, id }} />
      ) : (
        <Box
          sx={{ width: "100%", height: "420px" }}
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <SentimentVeryDissatisfiedIcon />
          Something went wrong with this animation
        </Box>
      )}

      <CardTitle id={id} />
    </Box>
  );
};

export const DatasetCard: React.FC<{
  id: IdType;
  storyID: StoryIdType;
  generator: GeneratorType;
  promptNumber: string;
  resultNumber: string;
  prompt: string;
  generatedText: string;
  images: string[];
  map: string | null;
}> = ({
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
    <Card
      key={id}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia {...{ images, id }} />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <Tooltip title="Generated map JSON on GitHub">
              <Link
                href={getMapGitHubLink(map)}
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
  );
};
