const fs = require("fs-extra");
const path = require("path");

// Source and destination directories
const filesToCopy = [".env.production", "yarn.lock", "prisma/schema.prisma"];
const destDir = path.resolve(__dirname, "../build");

filesToCopy.forEach((file) => {
  const srcPath = path.resolve(__dirname, `../${file}`);
  const destPath = path.join(destDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copySync(srcPath, destPath);
    console.log(`Copied ${file} to build directory`);
  } else {
    console.warn(`File ${file} not found`);
  }
});
