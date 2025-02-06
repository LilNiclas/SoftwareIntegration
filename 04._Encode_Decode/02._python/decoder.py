import base64

yo = "yo"
byte_yo = yo.encode("utf-8")
encoded_bytes = base64.b64encode(byte_yo)
encoded_string = encoded_bytes.decode("utf-8")

print(encoded_string)