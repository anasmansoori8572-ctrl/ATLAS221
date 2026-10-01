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

    # Revert className="pointer-events-none !absolute inset-0" -> className="!absolute inset-0"
    new_content = content.replace('className="pointer-events-none !absolute inset-0"', 'className="!absolute inset-0"')
    new_content = new_content.replace('className="pointer-events-none h-full w-full"', 'className="h-full w-full"')
    
    if new_content != content:
        with open(cf, "w") as f:
            f.write(new_content)
        print(f"Reverted Canvas in {cf}")

# Revert ReviewsGlobeCanvas.tsx
with open("components/canvas/ReviewsGlobeCanvas.tsx", "r") as f:
    rg_content = f.read()
rg_reverted = rg_content.replace(" touch-pan-y", "")
if rg_reverted != rg_content:
    with open("components/canvas/ReviewsGlobeCanvas.tsx", "w") as f:
        f.write(rg_reverted)
    print("Reverted ReviewsGlobeCanvas.tsx")

print("All canvas files reverted to pre-scroll-bug state!")
