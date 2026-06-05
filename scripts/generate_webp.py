from PIL import Image
import os

os.makedirs('assets', exist_ok=True)
inputs = [
    ('assets/raj_univ_logo.png','assets/raj_univ_logo.webp'),
    ('assets/kandy_high_school_logo.png','assets/kandy_high_school_logo.webp')
]
for inp, out in inputs:
    try:
        im = Image.open(inp).convert('RGBA')
    except FileNotFoundError:
        print(f'Missing {inp}')
        continue
    im = im.resize((64,64), Image.LANCZOS)
    im.save(out, 'WEBP', quality=80, method=6)
    print(f'Wrote {out}')
