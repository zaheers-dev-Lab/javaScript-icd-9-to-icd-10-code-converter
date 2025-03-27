<h2>Break down of code, which convert ICD-9 codes to ICD-10 code.</h2>
<ol>
  <li>fs: Interating with the file system, such as reading and writing.</li>
  <li>path: Working with files and directory paths.</li>
  <li>commander: Used for parsing command line arguements. It allow us to define how the script should accept input from the user.</li>
  <li>async: (Used for to execute multiple task at a time)as it wil read the input file, process the icd-9 codes and write the converted icd-10 code to an output file.</li>
  <li>dataTable: create an empty object that will be used as a dictionary to store icd9 to icd10 mappings.</li>
  <li>First try block attempts to read the icd9toicd10dictionary.txt file.</li>
  <li>fs.readFileSync(): reads the files content in to a string.</li>
  <li>data.split('\n'): splits the string into an array of lines.</li>
  <li>lines.shift(): remove the first line of the array, because it is the header.</li>
  <li>lines.forEach(...): iterates over each line in the file.</li>
  <li>line.split('|').map(part => part.trim()): splits each line into parts based on the "|" delimiter and removes leading/trailing whitespace.</li>
  <li>Catch block will handle the error for if dictionary file not found or any other error happen while reading the file.</li>
  <li>Second try block reads the input file, process the icd9 codes and writes the results to the output file.</li>
  <li>fs.createWriteStream() creates a write stream to the output file (infile.out).</li>
  <li>The code iterates through each line of the input file, checks if the ICD-9 code exists in the dataTable, and writes the corresponding ICD-10 code and description to the output file.</li>
  <li>Catch block handles errors that occur while processing the input file.</li>
  <li>The last section uses the commander module to define how the script should accept the input file name from the command line.</li>
  <li>.argument('infile', ...) defines that the script expects one argument, which is the input file name.</li>
  <li>.action(...) defines the function to be executed when the script is run with the argument.</li>
  <li>program.parse(process.argv) parses the command-line arguments.</li>
</ol>

--> To run the code you have to create an input file in which you have to write the icd codes each in one line. and then pass the prompt in terminal:
node icd9to10.js your_input_file.txt <--
