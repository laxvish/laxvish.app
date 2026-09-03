import os
import glob
from PIL import Image, ImageOps, ImageEnhance
import numpy as np

IMG_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

def convert_to_brand_monochrome(filepath):
    img = Image.open(filepath)
    # Convert to pure grayscale
    gray = ImageOps.grayscale(img)
    
    # Auto-contrast for crisp deep blacks and clean bright highlights
    enhanced = ImageOps.autocontrast(gray, cutoff=(0.5, 0.5))
    
    # Slight contrast boost to enhance the crisp industrial telemetry line-art
    enhancer = ImageEnhance.Contrast(enhanced)
    crisp = enhancer.enhance(1.15)
    
    # Convert back to RGB for web browser compatibility
    rgb_mono = crisp.convert("RGB")
    rgb_mono.save(filepath, "PNG", optimize=True)
    print(f"Processed to 100% pure brand monochrome: {os.path.basename(filepath)}")

def main():
    files = sorted(glob.glob(os.path.join(IMG_DIR, "*.png")))
    for f in files:
        convert_to_brand_monochrome(f)

if __name__ == "__main__":
    main()
