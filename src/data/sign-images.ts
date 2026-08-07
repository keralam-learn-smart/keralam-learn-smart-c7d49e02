// Official mandatory-sign artwork (Kerala RTO chart), served from the CDN.
import aheadOrLeft from "@/assets/signs/ahead-or-left.png.asset.json";
import aheadOrRight from "@/assets/signs/ahead-or-right.png.asset.json";
import busLane from "@/assets/signs/bus-lane.png.asset.json";
import cyclePedestrianPath from "@/assets/signs/cycle-pedestrian-path.png.asset.json";
import cycleTrack from "@/assets/signs/cycle-track.png.asset.json";
import goStraight from "@/assets/signs/go-straight.png.asset.json";
import keepLeft from "@/assets/signs/keep-left.png.asset.json";
import keepRight from "@/assets/signs/keep-right.png.asset.json";
import leftAhead from "@/assets/signs/left-ahead.png.asset.json";
import minSpeed30 from "@/assets/signs/min-speed-30.png.asset.json";
import minSpeed50 from "@/assets/signs/min-speed-50.png.asset.json";
import miniRoundabout from "@/assets/signs/mini-roundabout.png.asset.json";
import passEitherSide from "@/assets/signs/pass-either-side.png.asset.json";
import pedestriansOnly from "@/assets/signs/pedestrians-only.png.asset.json";
import rightAhead from "@/assets/signs/right-ahead.png.asset.json";
import snowChains from "@/assets/signs/snow-chains.png.asset.json";
import soundHorn from "@/assets/signs/sound-horn.png.asset.json";
import turnLeft from "@/assets/signs/turn-left.png.asset.json";
import turnRight from "@/assets/signs/turn-right.png.asset.json";

export const MANDATORY_SIGN_IMAGES = {
  "ahead-or-left": aheadOrLeft.url,
  "ahead-or-right": aheadOrRight.url,
  "bus-lane": busLane.url,
  "cycle-pedestrian-path": cyclePedestrianPath.url,
  "cycle-track": cycleTrack.url,
  "go-straight": goStraight.url,
  "keep-left": keepLeft.url,
  "keep-right": keepRight.url,
  "left-ahead": leftAhead.url,
  "min-speed-30": minSpeed30.url,
  "min-speed-50": minSpeed50.url,
  "mini-roundabout": miniRoundabout.url,
  "pass-either-side": passEitherSide.url,
  "pedestrians-only": pedestriansOnly.url,
  "right-ahead": rightAhead.url,
  "snow-chains": snowChains.url,
  "sound-horn": soundHorn.url,
  "turn-left": turnLeft.url,
  "turn-right": turnRight.url,
} as const;

export type MandatorySignImageKey = keyof typeof MANDATORY_SIGN_IMAGES;

/** Wraps the official artwork in an SVG so every existing sign renderer keeps working. */
export const signPhoto = (key: MandatorySignImageKey) =>
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <image href="${MANDATORY_SIGN_IMAGES[key]}" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;
