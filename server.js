const http = require("node:http");
const fs = require("node:fs/promises");
const initiateSearch = require("./sampleSearchItemsApi");

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  if (req.url === "/") {
    const data = await fs.readFile(`${__dirname}/index.html`);

    res.end(data);
  }

  if (req.url === "/api/search" && req.method === "POST") {
    let rawData = "";

    req.on("data", (chunk) => {
      rawData += chunk;
    });

    req.on("end", () => {
      try {
        const parsedData = rawData && JSON.parse(rawData);

        initiateSearch(parsedData);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            status: "success"
          })
        );
      } catch (e) {
        console.error(e.message);

        res.statusCode = 500;
        res.end(JSON.stringify({ status: "fail" }));
      }
    });
  }
});

server.listen(5000, () => {
  console.log("Server listening on port 5000.");
});

// tar --exclude "./node_modules" --exclude "./.git" -zcvf aws.tgz ./ -> Create Archive
// tar --exclude "./node_modules" -X "package-lock.json" -zcvf aws.tgz ./
// tar -zxvf aws.tgz -> Extract Archive
