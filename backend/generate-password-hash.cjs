const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the new password exactly: ", async (password) => {
  try {
    const hash = await bcrypt.hash(password, 12);
    const matches = await bcrypt.compare(password, hash);

    console.log("\nGenerated hash:");
    console.log(hash);

    console.log("\nHash length:");
    console.log(hash.length);

    console.log("\nImmediate verification:");
    console.log(matches);

    if (!matches) {
      console.error("Unexpected error: generated hash did not verify.");
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("Hash generation failed:", error);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
});