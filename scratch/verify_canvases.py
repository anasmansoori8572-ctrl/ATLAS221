import os
import re

canvas_files = [
    "components/canvas/Spatial404Canvas.tsx",
    "components/canvas/AirplaneCanvas.tsx",
    "components/canvas/HeroCanvas.tsx",
    "components/canvas/TeamCanvas.tsx",
    "components/canvas/GraduationCapCanvas.tsx",
    "components/canvas/AudioWave3DCanvas.tsx",
    "components/canvas/ScholarshipParticlesCanvas.tsx",
    "components/canvas/GeometricMathCanvas.tsx",
    "components/canvas/CounselingCanvas.tsx",
    "components/canvas/TravelNetworkCanvas.tsx",
    "components/canvas/FooterCanvas.tsx",
    "components/canvas/OrbitUniverseCanvas.tsx",
    "components/canvas/JourneyDieCanvas.tsx",
    "components/canvas/CountryGlobe3DCanvas.tsx"
]

for cf in canvas_files:
    if not os.path.exists(cf):
        continue
    with open(cf, "r") as f:
        content = f.read()

    # If <Canvas has className that doesn't have pointer-events-none
    def replace_canvas_class(match):
        full_tag = match.group(0)
        if "pointer-events-none" not in full_tag:
            if 'className="' in full_tag:
                return full_tag.replace('className="', 'className="pointer-events-none ')
            else:
                return full_tag.replace('<Canvas', '<Canvas className="pointer-events-none !absolute inset-0"')
        return full_tag

    # Match <Canvas ... >
    new_content = re.sub(r'<Canvas[^>]*>', replace_canvas_class, content)
    if new_content != content:
        with open(cf, "w") as f:
            f.write(new_content)
        print(f"Updated Canvas element in {cf}")
    else:
        print(f"Already clean: {cf}")

print("All decorative Canvas elements verified!")
