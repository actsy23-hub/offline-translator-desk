const {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_ES
} = require("@qvac/sdk");

async function main() {
  console.log("Starting QVAC...");

  const modelId = await loadModel({
    modelSrc: BERGAMOT_EN_ES,
    modelConfig: {
      engine: "Bergamot",
      from: "en",
      to: "es"
    },
    onProgress: (p) => {
      process.stdout.write(
        `\rDownloading: ${p.percentage.toFixed(0)}%`
      );
    }
  });

  console.log("\nModel loaded:", modelId);

  const result = translate({
    modelId,
    text: "Hello, how are you today?",
    modelType: "nmtcpp-translation",
    stream: false
  });

  const translatedText = await result.text;

  console.log("Translation:", translatedText);

  await unloadModel({
    modelId,
    clearStorage: false
  });

  console.log("QVAC test completed successfully.");
}

main().catch((error) => {
  console.error("\nQVAC test failed:");
  console.error(error);
  process.exit(1);
});