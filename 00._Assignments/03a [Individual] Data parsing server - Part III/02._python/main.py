from fastapi import FastAPI, HTTPException
import os
import requests
from parse import PARSERS

app = FastAPI()

DATA_FOLDER = os.path.join(os.path.dirname(__file__), "..", "data")

@app.get("/data/{format}")
async def get_data(format: str):
    file_path = os.path.join(DATA_FOLDER, f"data.{format}")

    if format not in PARSERS:
        raise HTTPException(status_code=400, detail="Unsupported format")

    try:
        parsed_data = PARSERS[format](file_path)
        return {"format": format, "data": parsed_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing {format}: {str(e)}")

@app.get("/fetch-from-js/{format}")
async def fetch_from_js(format: str):
    try:
        response = requests.get(f"http://127.0.0.1:8080/data/{format}")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data from Express: {str(e)}")
