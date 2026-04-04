import fs from "fs";
import path from "path";

const colorMap = {
  // exact hexes (case insensitive handled via regex)
  "#010e24": "var(--theme-surface)",
  "#02132b": "var(--theme-surface-container-low)",
  "#0b203d": "var(--theme-surface-container-high)",
  "#102645": "var(--theme-surface-container-highest)",
  "#58f5d1": "var(--theme-primary)",
  "#45e7c3": "var(--theme-primary-dim)",
  "#1cd0ad": "var(--theme-primary-container)",
  "#005949": "var(--theme-on-primary)",
  "#c197fe": "var(--theme-secondary)",
  "#b48aef": "var(--theme-secondary-dim)",
  "#593090": "var(--theme-secondary-container)",
  "#3d0e74": "var(--theme-on-secondary)",
  "#b8ffbb": "var(--theme-tertiary)",
  "#42ef72": "var(--theme-tertiary-dim)",
  "#ff716c": "var(--theme-error)",
  "#dbe6ff": "var(--theme-on-surface)",
  "#9eabc8": "var(--theme-on-surface-variant)",
  "#94a3b8": "var(--theme-on-surface-variant)",
  "#64748b": "var(--theme-on-surface-variant)",
  
  // Specific linear gradients
  "linear-gradient(135deg, #58f5d1, #1cd0ad)": "linear-gradient(135deg, var(--theme-primary), var(--theme-primary-container))",
  "linear-gradient(135deg, #58f5d1, #c197fe)": "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",

  // Specific rgba colors
  "rgba(16, 38, 69, 0.6)": "var(--theme-surface-container)",
  "rgba(2, 19, 43, 0.85)": "var(--theme-surface-bright)",
  "rgba(21, 44, 78, 0.7)": "var(--theme-surface-container-highest)",

  // specific borders/shadows requiring color-mix
  "rgba(88, 245, 209, 0.2)": "color-mix(in srgb, var(--theme-primary) 20%, transparent)",
  "rgba(88,245,209,0.2)": "color-mix(in srgb, var(--theme-primary) 20%, transparent)",
  "rgba(88, 245, 209, 0.12)": "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
  "rgba(88,245,209,0.1)": "color-mix(in srgb, var(--theme-primary) 10%, transparent)",
  "rgba(88,245,209,0.15)": "color-mix(in srgb, var(--theme-primary) 15%, transparent)",
  "rgba(88,245,209,0.3)": "color-mix(in srgb, var(--theme-primary) 30%, transparent)",
  "rgba(193,151,254,0.1)": "color-mix(in srgb, var(--theme-secondary) 10%, transparent)",
  "rgba(193,151,254,0.15)": "color-mix(in srgb, var(--theme-secondary) 15%, transparent)",
};

const regexMap = Object.entries(colorMap).map(([key, val]) => {
  // escape parens in rgba/gradients
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return { regex: new RegExp(escapedKey, "gi"), replacement: val };
});

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const originalContent = fs.readFileSync(fullPath, "utf-8");
      let newContent = originalContent;
      
      for (const { regex, replacement } of regexMap) {
        newContent = newContent.replace(regex, replacement);
      }
      
      if (originalContent !== newContent) {
        fs.writeFileSync(fullPath, newContent, "utf-8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(process.cwd(), "src"));
console.log("Refactoring complete.");
