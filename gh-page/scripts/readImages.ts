import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";
export async function updateDatasetFile() {
  const filePath = "src/assets/dataset/dataset.json";
  const imagePaths = "public/frames";

  try {
    console.info("Reading dataset json...");
    const json = JSON.parse(readFileSync(filePath, "utf-8"));

    console.info("Reading image dirs...");
    readdirSync(imagePaths).map((folder) => {
      json[folder]["images"] = readdirSync(path.resolve(imagePaths, folder));
    });

    console.info("Updating dataset json file...");
    writeFileSync(filePath, JSON.stringify(json), "utf-8");
  } catch (err) {
    console.error("Error on updating json file:", err);
  }
}
