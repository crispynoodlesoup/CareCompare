import re
from PIL import Image
from pytesseract import pytesseract

def extract_procedure_charges(text):
    # Define a regex pattern to capture both integer and decimal numbers
    charge_pattern = re.compile(r'(?:\$)?\b\d+(?:,\d{3})*(?:\.\d{2})\b')

    # Find all matches of the charge pattern
    matches = list(charge_pattern.finditer(text))

    # Extract the procedure descriptions and charges
    procedure_charges = []
    for i in range(len(matches)):
        start = 0 if i == 0 else matches[i-1].end()
        end = matches[i].start()
        code_match = re.search(r'\b\d{5}\s([A-Z]+\s[A-Z\s\d-]+)\b', text[start:end])
        date_match = re.search(r'\d{2}/\d{2}/\d{2}\s(.+)$', text[start:end])
        if code_match:
            procedure_description = re.search(r'\b\d{5}\s([A-Z]+\s[A-Z\s\d-]+)\b', text[start:end]).group().strip()[6:]
            charge = float(matches[i].group().replace(',', ''))
            procedure_charges.append({'Code':re.search(r'\b\d{5}\s([A-Z]+\s[A-Z\s\d-]+)\b', text[start:end]).group().strip()[0:5] ,'Description': procedure_description, 'Charge': charge})
        elif date_match and date_match.group(1).strip()[6:] and re.search(r'\d{5}\s(.+)$', text[start:end]) is not None:
            procedure_description = re.search(r'\d{5}\s(.+)$', text[start:end]).group().strip()[6:]
            charge = float(matches[i].group().replace(',', '').replace('$', ''))
            procedure_charges.append({'Code':re.search(r'\d{5}\s(.+)$', text[start:end]).group().strip()[0:5] ,'Description': procedure_description, 'Charge': charge})
    return procedure_charges

def analyze_text(text):
    results = {
        'ProcedureCharges': extract_procedure_charges(text),
    }

    return results

def process_image(image_path):
    # Open the image and perform OCR
    path_to_tesseract = "C:\Program Files\Tesseract-OCR\\tesseract.exe"
    pytesseract.tesseract_cmd = path_to_tesseract 
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img, lang='eng', config='--psm 6')

    # Analyze the extracted text
    results = analyze_text(text)

    return results

# Sample image paths
image_paths = ["data\\ex3.jpg", "data\\target.png"]

# Process each image
for image_path in image_paths:
    try:
    # Get the results for each image
        results = process_image(image_path)

        # Print the results
        print(f"Results for {image_path}:")
        for procedure_charge in results['ProcedureCharges']:
            print(f"Code: {procedure_charge['Code']}, Description: {procedure_charge['Description']}, Charge: {procedure_charge['Charge']}")
        print("=" * 50 + "\n")

    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
