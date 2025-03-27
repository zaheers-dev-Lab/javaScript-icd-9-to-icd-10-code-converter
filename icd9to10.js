const fs = require('fs');
const { program } = require('commander');

async function icd9to10Converter(infile) {
  console.log('Super Simple ICD-9-CM to ICD-10-CM converter!');
  const dataTable = {};

  try {
    const data = fs.readFileSync('icd9to10dictionary.txt', 'utf8');
    const lines = data.split('\n');

    lines.forEach(line => {
      const parts = line.split('|').map(part => part.trim());
      if (parts.length === 3) {
        const nine = parts[0];
        const ten = parts[1];
        const desc = parts[2];
        dataTable[nine] = [ten, desc];
        
      }
    });

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Missing dependency: icd9to10dictionary.txt');
      process.exit(1);
    } else {
        console.error("An error occurred while reading the dictionary file:", error);
        process.exit(1);
    }
  }

  try {
    const inputData = fs.readFileSync(infile, 'utf8');
    const inputLines = inputData.split('\n');

    let count = 0;
    let total = 0;
    const outputFile = infile + '.out';
    const outputStream = fs.createWriteStream(outputFile);

    outputStream.write('icd9\ticd10\tdescription\n');

    inputLines.forEach(line => {
      total++;
      const stripped = line.trim();

      if (stripped in dataTable) {
        count++;
        outputStream.write(`${stripped}\t${dataTable[stripped].join('\t')}\n`);
      } else {
        outputStream.write(`${stripped}\tNA\tNA\n`);
      }
    });

    outputStream.end();

    console.log(`Matched ${count} codes from your list of ${total} codes`);
  } catch (error) {
    console.error("An error occurred while processing the input file:", error);
    process.exit(1);
  }
}

program
  .argument('<infile>', 'File with list of 1 or more ICD-9 Codes in decimal format (e.g. 410.90). Will attempt to match some if decimals are missing but results are not guaranteed! :)')
  .action((infile) => {
    icd9to10Converter(infile);
  });

program.parse(process.argv);