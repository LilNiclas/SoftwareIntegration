import os
import json
import csv
import yaml
import xml.etree.ElementTree as ET

DATA_FOLDER = r"C:\Users\nicla\OneDrive\Documents\SystemIntegration\SoftwareIntegration\Assignments\01a [Individual] Data parsing servers - Part I\data"

def parse_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = f.read().splitlines()
    return data

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

def main():
    files = {
        "txt": parse_txt,
        "json": parse_json,
        "yaml": parse_yaml,
        "csv": parse_csv,
        "xml": parse_xml
    }

    for ext, parser in files.items():
        file_path = os.path.join(DATA_FOLDER, f"data.{ext}")
        try:
            parsed_data = parser(file_path)
            print(f"\nParsed {ext.upper()} file:")
            print(parsed_data)
        except Exception as e:
            print(f"Error parsing {ext.upper()} file: {e}")

if __name__ == "__main__":
    main()
