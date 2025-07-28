const fs = require('fs');
const path = require('path');

// Páginas a reorganizar
const pagesToReorganize = [
  'companies',
  'parkings',
  'reservations',
  'payments',
  'events',
  'qr-scanner',
  'reports',
];

const pagesDir = 'apps/web/src/pages';

function createPageFolder(pageName) {
  const folderPath = path.join(pagesDir, `${pageName}Page`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✅ Created folder: ${folderPath}`);
  }
}

function movePageFile(pageName) {
  const sourceFile = path.join(pagesDir, `${pageName}.tsx`);
  const targetFile = path.join(
    pagesDir,
    `${pageName}Page`,
    `${pageName}Page.tsx`
  );

  if (fs.existsSync(sourceFile)) {
    // Read the original file
    let content = fs.readFileSync(sourceFile, 'utf8');

    // Add import for styles
    content = content.replace(
      /import React from 'react'/,
      `import React from 'react';\nimport { ${pageName}PageStyles } from './${pageName}Page.styles';`
    );

    // Write to new location
    fs.writeFileSync(targetFile, content);
    console.log(`✅ Moved and updated: ${sourceFile} → ${targetFile}`);

    // Delete original file
    fs.unlinkSync(sourceFile);
    console.log(`🗑️  Deleted: ${sourceFile}`);
  }
}

function createStylesFile(pageName) {
  const stylesFile = path.join(
    pagesDir,
    `${pageName}Page`,
    `${pageName}Page.styles.ts`
  );

  const stylesContent = `import { SxProps, Theme } from '@mui/material';

export const ${pageName}PageStyles = {
  container: {
    p: 3,
  } as SxProps<Theme>,

  title: {
    mb: 3,
  } as SxProps<Theme>,

  // Add more styles as needed
};
`;

  fs.writeFileSync(stylesFile, stylesContent);
  console.log(`✅ Created styles file: ${stylesFile}`);
}

function main() {
  console.log('🚀 Starting web pages reorganization...\n');

  pagesToReorganize.forEach(pageName => {
    console.log(`📁 Processing: ${pageName}`);
    createPageFolder(pageName);
    movePageFile(pageName);
    createStylesFile(pageName);
    console.log('');
  });

  console.log('✅ Web pages reorganization completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Update imports in Layout.tsx and other files');
  console.log('2. Extract styles from each page to their .styles.ts files');
  console.log('3. Internationalize hardcoded texts');
}

main();
