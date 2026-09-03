import os
import glob
from PIL import Image
import numpy as np

IMG_DIR = "/mnt/88764EDA764EC8A0/code/laxvish/laxvish.app/public/images"

def verify_image(filepath):
    img = Image.open(filepath).convert("RGB")
    arr = np.array(img, dtype=np.float32)
    
    # Calculate saturation in HSV
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    delta = max_c - min_c
    
    # Avoid div by zero
    saturation = np.where(max_c > 0, delta / max_c, 0.0)
    mean_sat = np.mean(saturation) * 100
    max_sat = np.max(saturation) * 100
    
    # Brightness / luminance
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    mean_lum = np.mean(lum)
    std_lum = np.std(lum)
    
    print(f"File: {os.path.basename(filepath)}")
    print(f"  Dimensions: {img.size}")
    print(f"  Mean Saturation: {mean_sat:.2f}% | Max Saturation: {max_sat:.2f}% (monochrome check)")
    print(f"  Mean Luminance: {mean_lum:.1f}/255 | Contrast (Std): {std_lum:.1f}")
    
    # Check if monochrome: mean saturation < 15% is excellent monochrome
    is_monochrome = mean_sat < 15.0
    print(f"  Status: {'PASS - Clean Monochrome' if is_monochrome else 'WARN - Color detected'}\n")
    return is_monochrome

def main():
    files = sorted(glob.glob(os.path.join(IMG_DIR, "*.png")))
    passed = 0
    for f in files:
        if verify_image(f):
            passed += 1
    print(f"Verified {passed}/{len(files)} images.")

if __name__ == "__main__":
    main()
