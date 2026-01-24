import os
import sys
from pathlib import Path

try:
    # Pillow library
    from PIL import Image
except ImportError:
    print("Error: Pillow is not installed.")
    print("Install it with:")
    print("  pip install pillow")
    sys.exit(1)


def ensure_utf8_stdout():
    """Best-effort: avoid Windows console encoding issues."""
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        # Safe to ignore; we'll just rely on default encoding
        pass


def compress_image(path: Path, max_size: int = 500, quality: int = 55) -> None:
    """
    Resize and compress a single image in-place.

    - max_size: longest side (width or height) will be at most this many pixels.
    - quality: JPEG quality (for JPEG images).
    """
    try:
        original_size = path.stat().st_size

        with Image.open(path) as img:
            img_format = img.format  # e.g. 'PNG', 'JPEG'

            # Resize more aggressively if larger than max_size
            width, height = img.size
            max_dim = max(width, height)
            if max_dim > max_size:
                scale = max_size / float(max_dim)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.LANCZOS)

            # Decide save parameters
            save_kwargs = {}

            # For photographic content, JPEG is usually much smaller.
            # We'll keep the same extension but adjust options.
            if img_format and img_format.upper() in ("JPEG", "JPG"):
                save_kwargs.update(
                    {
                        "optimize": True,
                        "quality": quality,
                        "progressive": True,
                    }
                )
            elif img_format and img_format.upper() == "PNG":
                # PNG: aggressively reduce colors + optimize for much smaller size
                img = img.convert("P", palette=Image.ADAPTIVE, colors=128)
                save_kwargs.update(
                    {
                        "optimize": True,
                        "compress_level": 9,
                    }
                )

            # Save back to the same file
            img.save(path, **save_kwargs)

        new_size = path.stat().st_size
        savings = original_size - new_size
        percent = (savings / original_size * 100) if original_size > 0 else 0

        print(
            f"[OK] {path.name}: "
            f"{original_size / 1024:.1f}KB -> {new_size / 1024:.1f}KB "
            f"({percent:.1f}% smaller)"
        )

    except Exception as e:
        print(f"[ERROR] Failed to process {path}: {e}")


def main():
    ensure_utf8_stdout()

    # Folder relative to project root (same as your React app)
    base_dir = Path(__file__).resolve().parent
    speakers_dir = base_dir / "Speakers images"

    if not speakers_dir.exists():
        print(f"Error: folder not found: {speakers_dir}")
        return

    print(f"Compressing images in: {speakers_dir}")
    print("-" * 60)

    # File extensions to process
    exts = (".png", ".jpg", ".jpeg", ".JPG", ".JPEG", ".PNG")

    image_files = [
        p
        for p in speakers_dir.rglob("*")
        if p.is_file() and p.suffix in exts
    ]

    if not image_files:
        print("No images found to compress.")
        return

    print(f"Found {len(image_files)} image(s).")
    print("Backing up is recommended before running this script.")
    print("-" * 60)

    for img_path in image_files:
        # Skip any already-compressed thumbnails if you add them later
        if ".thumb." in img_path.name:
            continue
        compress_image(img_path)

    print("-" * 60)
    print("Done compressing speaker images.")


if __name__ == "__main__":
    main()

