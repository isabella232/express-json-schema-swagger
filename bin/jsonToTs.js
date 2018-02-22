const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const compileFromFile = require('json-schema-to-typescript').compileFromFile;

const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

const matchJson = /\.json$/;
const schemasDir = path.resolve(__dirname, '../src/schemas');
const distDir = path.resolve(__dirname, '../dist');

const filterJson = arr => arr.filter(item => matchJson.test(item));
const compile = filename => compileFromFile(path.join(schemasDir, filename));

readdir(schemasDir)
  .then(filterJson)
  .then(jsonFiles =>
    Promise.all(
      jsonFiles.map(file => {
        const basename = path.basename(file);
        return compile(file).then(ts => writeFile(path.join(distDir, `${basename}.d.ts`), ts));
      })
    )
  )
  .then(() => console.log('...done'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
