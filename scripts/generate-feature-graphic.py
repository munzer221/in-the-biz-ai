from PIL import Image, ImageDraw, ImageFont
import os

# Create feature graphic (1024x500)
width = 1024
height = 500

# Colors
bg_color = (13, 13, 13)  # #0D0D0D
green_color = (0, 214, 50)  # #00D632
white_color = (255, 255, 255)

# Create image
img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img)

# Add text (using default font - you can customize with TTF fonts)
try:
    # Try to use a nice font if available
    title_font = ImageFont.truetype("arial.ttf", 72)
    subtitle_font = ImageFont.truetype("arial.ttf", 36)
except:
    # Fallback to default
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()

# Draw title
title = "In The Biz AI"
title_bbox = draw.textbbox((0, 0), title, font=title_font)
title_width = title_bbox[2] - title_bbox[0]
title_x = (width - title_width) // 2
draw.text((title_x, 150), title, fill=green_color, font=title_font)

# Draw subtitle
subtitle = "Track Shift Earnings, Tips & Taxes with AI"
subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = (width - subtitle_width) // 2
draw.text((subtitle_x, 280), subtitle, fill=white_color, font=subtitle_font)

# Add gradient effect (optional)
for i in range(height):
    alpha = int(255 * (i / height) * 0.1)
    draw.line([(0, i), (width, i)], fill=(0, 214, 50, alpha))

# Save
output_dir = "store-assets"
os.makedirs(output_dir, exist_ok=True)
img.save(f"{output_dir}/feature-graphic.png")
print(f"✅ Feature graphic created: {output_dir}/feature-graphic.png")
