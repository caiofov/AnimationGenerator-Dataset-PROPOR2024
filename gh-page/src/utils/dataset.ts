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
  .filter(([key, _]) => key !== "InJo")
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
