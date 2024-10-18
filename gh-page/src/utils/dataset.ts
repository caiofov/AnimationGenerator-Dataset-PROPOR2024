import dataset from "../assets/dataset/dataset.json";

export type IdType = keyof typeof dataset;
export interface DatasetType {
  id: IdType;
  prompt: string;
  generatedText: string;
}
export const DATASET_LIST: DatasetType[] = Object.entries(dataset).map(
  ([key, { prompt, generatedText }]) => ({
    id: key as IdType,
    prompt,
    generatedText,
  })
);
