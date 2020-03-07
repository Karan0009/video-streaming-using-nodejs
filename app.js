const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

//consts
const PORT = process.env.PORT || 8080;

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/video", (req, res, next) => {
  const path = "public/videos/testVid.mp4";
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range || "no range";
  console.log(range);

  // res.setHeader("Content-Type", "video/mp4");
  // fs.createReadStream(path).pipe(res);

  fs.readFile(path, (err, data) => {
    if (err) console.log(err);
    else {
      res.setHeader("Content-Type", "video/mp4");
      res.send(data);
    }
  });

  // if (range) {
  //   const parts = range.replace(/bytes=/, "").split("-");
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  //   if (start >= fileSize) {
  //     res
  //       .status(416)
  //       .send("Requested range not satisfiable\n" + start + " >= " + fileSize);
  //     return;
  //   }

  //   const chunksize = end - start + 1;
  //   const file = fs.createReadStream(path, { start, end });
  //   const head = {
  //     "Content-Range": `bytes ${start}-${end}/${fileSize}`,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": chunksize,
  //     "Content-Type": "video/mp4"
  //   };

  //   res.writeHead(206, head);
  //   file.pipe(res);
  // } else {
  //   const head = {
  //     "Content-Length": fileSize,
  //     "Content-Type": "video/mp4"
  //   };
  //   res.writeHead(200, head);
  //   fs.createReadStream(path).pipe(res);
  // }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
