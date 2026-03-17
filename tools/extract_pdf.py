import sys
sys.path.insert(0, 'C:/Users/Admin/OneDrive/Desktop/playbook+/tools')

import pdfplumber

pdf_path = 'C:/Users/Admin/OneDrive/Desktop/playbook+/assets/files/playbook-consultancy-brand-foundations.pdf'

with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text and text.strip():
            print(f'--- PAGE {i+1} ---')
            print(text)
            print()
