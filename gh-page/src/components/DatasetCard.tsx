import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Fade,
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
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useInView } from "react-intersection-observer";

const itemIcons = {
  Story: MenuBookIcon,
  Generator: SmartToyIcon,
  Prompt: ChatIcon,
  "Generated text": LightbulbIcon,
};

type CardBodyItemProps = {
  title: keyof typeof itemIcons;
  subtitle?: string;
  text: string;
};
const CardBodyItem: React.FC<CardBodyItemProps & { delay: number }> = ({
  title,
  text,
  subtitle,
  delay,
}) => {
  const Icon = itemIcons[title];
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
    delay,
  });
  return (
    <Fade in={inView} timeout={1500}>
      <ListItem ref={ref}>
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText sx={{ display: "flex" }}>
          <Typography variant="subtitle2" component="h6">
            {title}:
          </Typography>
          {subtitle ? (
            <Typography variant="body2">{subtitle}</Typography>
          ) : null}

          {text}
        </ListItemText>
      </ListItem>
    </Fade>
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
  const body: CardBodyItemProps[] = [
    {
      title: "Story",
      text: STORIES[storyID],
    },
    { title: "Generator", text: generator },
    { title: "Prompt", subtitle: `(nº ${promptNumber})`, text: prompt },
    {
      title: "Generated text",
      subtitle: `(nº ${resultNumber})`,
      text: generatedText,
    },
  ];

  return (
    <Card
      key={id}
      id={id}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f9fbff",
      }}
    >
      <Carousel {...{ images, id }} />
      <CardTitle animationId={id} />

      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          {body.map((item, idx) => {
            const delay = 100 * idx;
            return <CardBodyItem delay={delay} key={item.title} {...item} />;
          })}
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
