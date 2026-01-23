import os
from pathlib import Path
try:
    from pdf2image import convert_from_path
    PDF2IMAGE_AVAILABLE = True
except ImportError:
    PDF2IMAGE_AVAILABLE = False
    print("pdf2image not available, trying PyMuPDF...")
    try:
        import fitz  # PyMuPDF
        PYMUPDF_AVAILABLE = True
    except ImportError:
        PYMUPDF_AVAILABLE = False
        print("Neither pdf2image nor PyMuPDF is available.")

def convert_pdf_with_pdf2image(pdf_path, output_dir):
    """Convert PDF to images using pdf2image"""
    try:
        images = convert_from_path(pdf_path, dpi=300, first_page=1, last_page=1)
        if images:
            # Get the first page
            image = images[0]
            # Create output filename
            pdf_name = Path(pdf_path).stem
            output_path = output_dir / f"{pdf_name}.png"
            image.save(output_path, "PNG")
            print(f"[OK] Converted: {pdf_path.name} -> {output_path.name}")
            return str(output_path)
    except Exception as e:
        print(f"[ERROR] Error converting {pdf_path.name} with pdf2image: {e}")
        return None

def convert_pdf_with_pymupdf(pdf_path, output_dir):
    """Convert PDF to images using PyMuPDF"""
    try:
        doc = fitz.open(pdf_path)
        if len(doc) > 0:
            # Get the first page
            page = doc[0]
            # Render to image (300 DPI)
            mat = fitz.Matrix(300/72, 300/72)  # 300 DPI
            pix = page.get_pixmap(matrix=mat)
            # Create output filename
            pdf_name = Path(pdf_path).stem
            output_path = output_dir / f"{pdf_name}.png"
            pix.save(output_path)
            print(f"[OK] Converted: {pdf_path.name} -> {output_path.name}")
            doc.close()
            return str(output_path)
    except Exception as e:
        print(f"[ERROR] Error converting {pdf_path.name} with PyMuPDF: {e}")
        return None

def main():
    # Set paths
    logo_folder = Path("LOGO(s) (File responses)")
    output_folder = Path("public/logos")
    
    # Create output folder if it doesn't exist
    output_folder.mkdir(parents=True, exist_ok=True)
    
    if not logo_folder.exists():
        print(f"Error: {logo_folder} folder not found!")
        return
    
    # Find all PDF files
    pdf_files = list(logo_folder.glob("*.pdf"))
    
    if not pdf_files:
        print("No PDF files found!")
        return
    
    print(f"Found {len(pdf_files)} PDF files to convert...")
    print("-" * 60)
    
    converted_count = 0
    
    for pdf_path in pdf_files:
        # Check if image already exists
        pdf_name = pdf_path.stem
        existing_png = output_folder / f"{pdf_name}.png"
        existing_jpg = output_folder / f"{pdf_name}.jpg"
        
        if existing_png.exists() or existing_jpg.exists():
            print(f"[SKIP] Already exists: {pdf_path.name}")
            continue
        
        # Try to convert
        if PDF2IMAGE_AVAILABLE:
            result = convert_pdf_with_pdf2image(pdf_path, output_folder)
            if result:
                converted_count += 1
        elif PYMUPDF_AVAILABLE:
            result = convert_pdf_with_pymupdf(pdf_path, output_folder)
            if result:
                converted_count += 1
        else:
            print("Error: No PDF conversion library available!")
            print("Please install one of:")
            print("  pip install pdf2image (requires poppler)")
            print("  pip install PyMuPDF")
            return
    
    print("-" * 60)
    print(f"Conversion complete! {converted_count} PDFs converted to images.")
    print(f"Images saved to: {output_folder}")

if __name__ == "__main__":
    main()
