const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const { parseStringPromise } = require("xml2js");

const DATA_FOLDER = path.join(__dirname, "..", "data");

function parseTxt(filePath) {
    return fs.readFileSync(filePath, "utf-8").split("\n").map(line => line.trim()).filter(Boolean);
}

function parseJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function parseYaml(filePath) {
    return yaml.parse(fs.readFileSync(filePath, "utf-8"));
}

function parseCsv(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n").map(line => line.trim()).filter(Boolean);
    const headers = lines.shift().split(",");
    return lines.map(line => {
        const values = line.split(",");
        return headers.reduce((obj, key, i) => ({ ...obj, [key]: values[i] }), {});
    });
}

async function parseXml(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const result = await parseStringPromise(data);
    return result.fruits.fruit;
}

async function main() {
    const files = {
        "txt": parseTxt,
        "json": parseJson,
        "yaml": parseYaml,
        "csv": parseCsv,
        "xml": parseXml
    };

    for (const ext in files) {
        const filePath = path.join(DATA_FOLDER, `data.${ext}`);
        try {
            const parsedData = ext === "xml" ? await files[ext](filePath) : files[ext](filePath);
            console.log(`\nParsed ${ext.toUpperCase()} file:`);
            console.log(parsedData);
        } catch (error) {
            console.error(`Error parsing ${ext.toUpperCase()} file:`, error);
        }
    }
}

main();