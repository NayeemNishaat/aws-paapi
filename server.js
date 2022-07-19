const http = require("node:http");
const initiateSearch = require("./sampleSearchItemsApi");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.writeHead(200);

  let rawData = "";

  req.on("data", (chunk) => {
    rawData += chunk;
  });

  req.on("end", () => {
    try {
      const parsedData = JSON.parse(`${rawData}`);
      console.log(parsedData);

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
});

server.listen(5000, () => {
  console.log("Server listening on port 5000.");
});
