const yargs = require("yargs");
const { execSync } = require("child_process");

// Parse the command-line arguments
const {
  _: [name],
} = yargs.argv;

const migrationPath = `src/database/migrations/${name}`;
execSync(`yarn typeorm migration:create ${migrationPath}`, { stdio: "inherit" });
