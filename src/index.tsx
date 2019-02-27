import jss from "jss";
import preset from "jss-preset-default";
import parse from "url-parse";

jss.setup(preset());

const DRAW_SPEED = 50; // [px/s]

(async () => {
  const chars = parse(location.href, true).query.c!.split(/,/);

  const char = chars[Math.floor(Math.random() * chars.length)];

  let code = char
    .charCodeAt(0)
    .toString(16)
    .toLowerCase();
  code = "0".repeat(5 - code.length) + code;
  const resp = await fetch(`./kanji/${code}.svg`);
  const svgXML = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgXML, "image/svg+xml");

  const svg = doc.querySelector("svg")!;
  svg.removeAttribute("height");
  svg.removeAttribute("width");

  const paths = doc.querySelectorAll(
    '[id^="kvg:StrokePaths_"] path'
  ) as NodeListOf<SVGPathElement>;

  let animationDelay = 0;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    const len = path.getTotalLength();
    const drawDuration = len / DRAW_SPEED;
    const sheet = jss
      .createStyleSheet({
        "@keyframes draw": {
          from: {
            "stroke-dashoffset": len
          },
          to: {
            "stroke-dashoffset": 0
          }
        },
        draw: {
          "stroke-dasharray": len,
          "stroke-dashoffset": len,
          "animation-name": "$draw",
          "animation-delay": `${animationDelay}s`,
          "animation-duration": `${drawDuration}s`,
          "animation-timing-function":
            i === paths.length - 1 ? "cubic-bezier(.98,.61,.97,.4)" : "linear",
          "animation-fill-mode": "both"
        }
      } as any)
      .attach();
    path.setAttribute("class", sheet.classes.draw);
    animationDelay += drawDuration;
  }

  document
    .querySelector("#svg-container")!
    .insertAdjacentHTML("afterbegin", doc.querySelector("svg")!.outerHTML);
})();
