const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_ES
} = require("@qvac/sdk");

const PORT = 3000;
let modelId = null;

async function startModel() {
  console.log("Loading QVAC translation model...");

  modelId = await loadModel({
    modelSrc: BERGAMOT_EN_ES,
    modelConfig: {
      engine: "Bergamot",
      from: "en",
      to: "es"
    },
    onProgress: (p) => {
      process.stdout.write(
        `\rDownloading model: ${p.percentage.toFixed(0)}%`
      );
    }
  });

  console.log(`\nQVAC model loaded: ${modelId}`);
}

async function translateText(text) {
  const result = translate({
    modelId,
    text,
    modelType: "nmtcpp-translation",
    stream: false
  });

  return await result.text;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const html = fs.readFileSync(
      path.join(__dirname, "public", "index.html"),
      "utf8"
    );

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(html);
    return;
  }

  if (req.method === "POST" && req.url === "/translate") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { text } = JSON.parse(body);

        if (!text || !text.trim()) {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify({
            error: "Please enter text to translate."
          }));

          return;
        }

        const translation = await translateText(text);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          translation
        }));
      } catch (error) {
        console.error("Translation error:", error);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          error: error.message || "Translation failed."
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

async function main() {
  try {
    await startModel();

    server.listen(PORT, () => {
      console.log(`\nOffline Translator Desk running at:`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("\nFailed to start QVAC:");
    console.error(error);
    process.exit(1);
  }
}

main();

process.on("SIGINT", async () => {
  console.log("\nShutting down...");

  if (modelId) {
    await unloadModel({
      modelId,
      clearStorage: false
    });
  }

  process.exit(0);
});