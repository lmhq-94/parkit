const fs = require('fs');
const path = require('path');

const pagesDir = 'apps/web/src/pages';

const pagesToUpdate = [
  'CompaniesPage',
  'ParkingsPage',
  'ReservationsPage',
  'PaymentsPage',
  'EventsPage',
  'QRScannerPage',
  'ReportsPage',
];

function updatePageImports() {
  pagesToUpdate.forEach(pageName => {
    const pageFile = path.join(pagesDir, pageName, `${pageName}.tsx`);
    const stylesFile = path.join(pagesDir, pageName, `${pageName}.styles.ts`);

    if (fs.existsSync(pageFile)) {
      let content = fs.readFileSync(pageFile, 'utf8');

      // Update the import statement
      const oldImport = `import { ${pageName.toLowerCase()}PageStyles } from './${pageName.toLowerCase()}Page.styles';`;
      const newImport = `import { ${pageName}Styles } from './${pageName}.styles';`;

      content = content.replace(oldImport, newImport);

      // Update the styles usage
      const oldUsage = `${pageName.toLowerCase()}PageStyles`;
      const newUsage = `${pageName}Styles`;

      content = content.replace(new RegExp(oldUsage, 'g'), newUsage);

      fs.writeFileSync(pageFile, content);
      console.log(`✅ Updated imports in: ${pageFile}`);
    }

    if (fs.existsSync(stylesFile)) {
      let content = fs.readFileSync(stylesFile, 'utf8');

      // Update the export name
      const oldExport = `export const ${pageName.toLowerCase()}PageStyles`;
      const newExport = `export const ${pageName}Styles`;

      content = content.replace(oldExport, newExport);

      fs.writeFileSync(stylesFile, content);
      console.log(`✅ Updated export in: ${stylesFile}`);
    }
  });
}

function main() {
  console.log('🚀 Updating page imports...\n');
  updatePageImports();
  console.log('\n✅ Page imports updated successfully!');
}

main();
