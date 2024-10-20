import dataset from "../assets/dataset/dataset.json";

export type IdType = keyof typeof dataset;
export interface DatasetType {
  id: IdType;
  prompt: string;
  generatedText: string;
  images: string[];
  map: string | null;
}

export const DATASET_LIST: DatasetType[] = Object.entries(dataset).map(
  ([key, { prompt, generatedText, images, map }]) => ({
    id: key as IdType,
    prompt,
    generatedText,
    images,
    map: map ? `Map${map.toString().padStart(3, "0")}.json` : null,
  })
);

export type StoryIdType = "Ala" | "InJo" | "ViTe" | "ChVe" | "PePa" | "PePr";

export const STORIES: { id: StoryIdType; name: string }[] = [
  { id: "Ala", name: "Aladdin" },
  { id: "InJo", name: "Indiana Jones" },
  { id: "ViTe", name: "Journey to the Center of the Earth" },
  { id: "ChVe", name: "Little Red Riding Hood" },
  { id: "PePa", name: "Peter Pan" },
  { id: "PePr", name: "The Little Prince" },
];
