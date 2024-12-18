import dataset from "../assets/dataset/dataset.json";

export type IdType = keyof typeof dataset;
export type StoryIdType = "Ala" | "ViTe" | "ChVe" | "PePa" | "PePr"; // | "InJo";
export type GeneratorType = "Bard" | "ChatGPT" | "LuzIA";
export interface DatasetType {
  id: IdType;
  storyID: StoryIdType;
  generator: GeneratorType;
  promptNumber: string;
  resultNumber: string;
  prompt: string;
  generatedText: string;
  images: string[];
  map: string | null;
}

export const DATASET_LIST: DatasetType[] = Object.entries(dataset)
  .filter(([key, _]) => !key.startsWith("InJo"))
  .map(([key, { prompt, generatedText, images, map }]) => {
    const match = key.match(
      /^(?<story>.+)_g(?<generator>.+)_p(?<promptNumber>\d+)_r(?<resultNumber>\d+)$/
    )!;
    const { story, generator, promptNumber, resultNumber } = match.groups!;

    return {
      id: key as IdType,
      storyID: story as StoryIdType,
      generator: generator as GeneratorType,
      promptNumber,
      resultNumber,
      prompt,
      generatedText,
      images,
      map: map ? `Map${map.toString().padStart(3, "0")}.json` : null,
    };
  });

export const STORIES: { [k in StoryIdType]: string } = {
  Ala: "Aladdin",
  // InJo: "Indiana Jones",
  ViTe: "Journey to the Center of the Earth",
  ChVe: "Little Red Riding Hood",
  PePa: "Peter Pan",
  PePr: "The Little Prince",
};

export const GENERATORS: GeneratorType[] = ["Bard", "ChatGPT", "LuzIA"];

export const getMapGitHubLink = (map: string) =>
  `https://github.com/caiofov/AnimationGenerator-Dataset-PROPOR2024/blob/main/Animations/data/${map}`;

export const randomWordSequenceFromDataset = (size: number) => {
  const attributes = ["prompt", "generatedText"] as const;
  const randomAttribute = attributes[Math.floor(Math.random() * 2)];

  const randomIdx = Math.floor(Math.random() * DATASET_LIST.length);
  const randomItem = DATASET_LIST[randomIdx][randomAttribute].split(" ");

  const startIndex = Math.floor(
    Math.random() * (randomItem.length - (size - 1))
  );

  return randomItem.slice(startIndex, startIndex + size).join(" ");
};
