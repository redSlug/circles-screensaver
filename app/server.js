const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const app = express();
app.use(cors());

const server = app.listen(9000);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  proxied: true,
});

app.use("/peerjs", peerServer);

console.log("PeerJS server running on port 9000");
