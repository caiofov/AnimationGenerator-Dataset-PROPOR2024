import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

function compareArrays(a: string[], b: string[]) {
  return a.length === b.length
    ? a.every((value, index) => value === b[index])
    : false;
}

export async function updateDatasetFile() {
  const filePath = "src/assets/dataset/dataset.json";
  const imagePaths = "public/frames";
  let update = false;

  try {
    console.info("Reading dataset json...");
    const json = JSON.parse(readFileSync(filePath, "utf-8"));

    console.info("Reading image dirs...");
    readdirSync(imagePaths).map((folder) => {
      const images = readdirSync(path.resolve(imagePaths, folder)).sort(
        (a, b) => {
          let matchA = a.match(/frame(\d+)/);
          let matchB = b.match(/frame(\d+)/);
          if (!matchA) throw "Invalid image name: " + a;
          if (!matchB) throw "Invalid image name: " + b;
          return Number(matchA[1]) - Number(matchB[1]);
        }
      );
      if (!compareArrays(images, json[folder]["images"])) {
        json[folder]["images"] = images;
        update = true;
      }
    });

    if (update) {
      console.info("Updating dataset json file...");
      writeFileSync(filePath, JSON.stringify(json), "utf-8");
    } else {
      console.info("No changes");
    }
  } catch (err) {
    console.error("Error on updating json file:", err);
  }
}
