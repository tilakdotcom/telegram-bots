import http from "http";

http
  .createServer((req, res) => {
    res.write("Alive");
    res.end();
  })
  .listen(8080);
 