const FuseBox = require("fuse-box");
const express = require('express');

let fuse = FuseBox.FuseBox.init({
   homeDir: "./src",
   outFile: "./build/bundle.js",
   sourceMap: {
      bundleReference: "./bundle.js.map",
      outFile: "./build/bundle.js.map",
   },
   plugins: [
      FuseBox.JSONPlugin(),
      FuseBox.EnvPlugin({ NODE_ENV: "production" }),
       [FuseBox.LESSPlugin(), FuseBox.CSSPlugin()]
   ]
})

fuse.devServer(">index.tsx", {port: 5555});
