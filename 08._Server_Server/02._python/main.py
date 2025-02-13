from fastapi import FastAPI
import requests

app = FastAPI();

@app.get("/fastapiData")
def getFastAPIData():
    return {"data": "Data From FastAPI"}


@app.get("/requestExpressData")
def getRequestData():
    response = requests.get("http://127.0.0.1:8080/expressData").json()
    return response
    

# poetry add requests.
# Poetry add uvicorn fastapi. tilføjer den
# For at starte fastapi server. uvicorn main:app --reload. Main is name of file. App is the instantiated