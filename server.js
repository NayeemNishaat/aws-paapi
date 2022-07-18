const http = require("node:http");

const server = http.createServer((req, res) => {
  let rawData = "";
  req.on("data", (chunk) => {
    console.log("sd", chunk);
    rawData += chunk;
  });
  req.on("end", () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );

  res.end(
    JSON.stringify({
      data: "Hello World!"
    })
  );
});

server.listen(5000, () => {
  console.log("Server started at port 5000");
});
