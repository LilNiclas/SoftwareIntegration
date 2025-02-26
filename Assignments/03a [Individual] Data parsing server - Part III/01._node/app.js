import express from "express";
import path from "path";
import { parseTxt, parseJson, parseYaml, parseCsv, parseXml } from "./parse.js";

const app = express();
const DATA_FOLDER = "C:\\Users\\nicla\\OneDrive\\Documents\\SystemIntegration\\SoftwareIntegration\\Assignments\\03a [Individual] Data parsing server - Part III\\data";

app.get("/data/:format", async (req, res) => {
    const { format } = req.params;
    const filePath = path.join(DATA_FOLDER, `data.${format}`);

    try {
        let data;
        switch (format) {
            case "txt":
                data = parseTxt(filePath);
                break;
            case "json":
                data = parseJson(filePath);
                break;
            case "yaml":
                data = parseYaml(filePath);
                break;
            case "csv":
                data = parseCsv(filePath);
                break;
            case "xml":
                data = await parseXml(filePath);
                break;
            default:
                return res.status(400).json({ error: "Unsupported format" });
        }
        res.json({ format, data });
    } catch (error) {
        res.status(500).json({ error: `Error parsing ${format}: ${error.message}` });
    }
});

app.get("/fetch-from-python/:format", async (req, res) => {
    try {
        const { format } = req.params;
        const response = await fetch(`http://127.0.0.1:8000/data/${format}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from FastAPI" });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
