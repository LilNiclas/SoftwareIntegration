import os
import json
import csv
import yaml
import xml.etree.ElementTree as ET

DATA_FOLDER = r"C:\Users\nicla\OneDrive\Documents\SystemIntegration\SoftwareIntegration\Assignments\03a [Individual] Data parsing server - Part III\data"

def parse_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read().splitlines()

def parse_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def parse_yaml(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def parse_csv(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return [row for row in reader]

def parse_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    return [elem.text for elem in root.findall("fruit")]

PARSERS = {
    "txt": parse_txt,
    "json": parse_json,
    "yaml": parse_yaml,
    "csv": parse_csv,
    "xml": parse_xml
}
