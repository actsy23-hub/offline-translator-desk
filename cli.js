const readline = require("readline");
const {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_ES
} = require("@qvac/sdk");

async function main() {
  console.log("");
  console.log("======================================");
  console.log("      OFFLINE TRANSLATOR DESK");
  console.log("======================================");
  console.log("QVAC local English -> Spanish");
  console.log("");

  console.log("Loading QVAC translation model...");

  const modelId = await loadModel({
    modelSrc: BERGAMOT_EN_ES,
    modelConfig: {
      engine: "Bergamot",
      from: "en",
      to: "es"
    }
  });

  console.log("Model loaded successfully.");
  console.log("");
  console.log("Type English text to translate.");
  console.log("Type 'exit' to quit.");
  console.log("");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "English > "
  });

  rl.prompt();

  rl.on("line", async (input) => {
    const text = input.trim();

    if (!text) {
      rl.prompt();
      return;
    }

    if (text.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      const result = await translate({
        modelId,
        text,
        modelType: "nmtcpp-translation",
        stream: false
      });

      const translation = await result.text;

      console.log("Spanish >", translation);
      console.log("");
    } catch (error) {
      console.error("Translation error:", error.message);
      console.log("");
    }

    rl.prompt();
  });

  rl.on("close", async () => {
    await unloadModel({ modelId });
    console.log("");
    console.log("QVAC model unloaded.");
    console.log("Goodbye.");
  });
}

main().catch((error) => {
  console.error("Failed to start translator:");
  console.error(error);
  process.exit(1);
});