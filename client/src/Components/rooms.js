//Here we are establishing the primary socket.io connections

var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");

app.listen(80);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}
//When socket.io successfully connects, we track it by console.logging the unique data of that connection 
io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});
