import fs from "fs";
import yaml from "yaml";
import { parseStringPromise } from "xml2js";

export function parseTxt(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
}

export function parseJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function parseYaml(filePath) {
    return yaml.parse(fs.readFileSync(filePath, "utf-8"));
}

export function parseCsv(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n").map(line => line.trim()).filter(Boolean);
    const headers = lines.shift().split(",");
    return lines.map(line => {
        const values = line.split(",");
        return headers.reduce((obj, key, i) => ({ ...obj, [key]: values[i] }), {});
    });
}

export async function parseXml(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const result = await parseStringPromise(data);
    return result.fruits.fruit;
}
