const fs = require('fs');
const path = require('path');

const EXCLUDED = [
  'node_modules',
  'package-lock.json',
  '.next',
  '.git',
  'yarn.lock',
  'README.md',
  'fileLister.js',
  'next-env.d.ts',
  'next.config.mjs',
  'postcss.config.mjs',
  'favicon.ico',
  'fonts/GeistMonoVF.woff',
  'globals.css',
  '/fonts'
]; // Add additional exclusions here

function listFiles(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);

    // Exclude specified files and folders
    if (EXCLUDED.some(excluded => filePath.includes(excluded))) continue;

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      listFiles(filePath, fileList); // Recursive call for directories
    } else {
      const content = fs.readFileSync(filePath, 'utf-8');
      fileList.push({ path: filePath, content });
    }
  }

  return fileList;
}

function generateFileList() {
  const projectRoot = path.resolve(__dirname); // Root directory
  const outputFilePath = path.join(projectRoot, 'projectFileContents.txt');

  // Check if the file exists and delete it if it does
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
    console.log(`Existing file deleted: ${outputFilePath}`);
  }

  const fileList = listFiles(projectRoot);

  const fileContent = fileList
    .map(file => `File: ${file.path}\n\n${file.content}\n\n---\n`)
    .join('\n');

  fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
  console.log(`File list generated: ${outputFilePath}`);
}

// Run the script
generateFileList();
