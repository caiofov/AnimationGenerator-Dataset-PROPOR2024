import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

function compareArrays(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function getMaps() {
  const mapInfoPath = "../Animations/data/MapInfos.json";
  const maps: ({ name: string; id: number } | null)[] = JSON.parse(
    readFileSync(mapInfoPath, "utf-8")
  );
  return maps.reduce((acc, item) => {
    if (item) acc[item.name] = item.id;

    return acc;
  }, {} as { [key: string]: number });
}

function getSortedImages(path: string) {
  return readdirSync(path).sort((a, b) => {
    let matchA = a.match(/frame(\d+)/);
    let matchB = b.match(/frame(\d+)/);
    if (!matchA) throw "Invalid image name: " + a;
    if (!matchB) throw "Invalid image name: " + b;
    return Number(matchA[1]) - Number(matchB[1]);
  });
}

export async function updateDatasetFile() {
  const datasetPath = "src/assets/dataset/dataset.json";
  const framesPath = "public/frames";
  let update = false;

  try {
    console.info("Reading dataset json...");
    const json = JSON.parse(readFileSync(datasetPath, "utf-8"));

    console.info("Reading RPG Maker maps...");
    const maps = getMaps();

    console.info("Reading image dirs...");
    readdirSync(framesPath).map((folder) => {
      const images = getSortedImages(path.resolve(framesPath, folder));

      if (!compareArrays(images, json[folder]["images"])) {
        json[folder]["images"] = images;
        update = true;
      }
      if (maps[folder] !== json[folder]["map"]) {
        json[folder]["map"] = maps[folder];
        update = true;
      }
    });

    if (update) {
      console.info("Updating dataset json file...");
      writeFileSync(datasetPath, JSON.stringify(json), "utf-8");
    } else {
      console.info("No changes");
    }
  } catch (err) {
    console.error("Error on updating json file:", err);
  }
}
