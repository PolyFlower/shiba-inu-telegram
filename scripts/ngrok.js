'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var dotenv = require('dotenv');
var ngrok = require('ngrok');
var nodemon = require('nodemon');
var path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.dev') });
if (process.env.NODE_ENV === 'production') {
  console.log("Can't be used in production");
  process.exitCode = 1;
  process.exit();
}
ngrok
  .connect({
    proto: 'http',
    addr: Number(process.env['PORT']),
    region: 'eu',
    authtoken: process.env['NGROK_TOKEN']
  })
  .then(function (url) {
    console.log('ngrok tunnel opened at: '.concat(url));
    console.log('Dashboard quick open: http://localhost:4040/');
    nodemon({
      exec: `cross-env VERCEL_URL=${url} ts-node -r tsconfig-paths/register src/index.ts`,
      ext: 'ts',
      ignore: ['.git', 'node_modules/**/*'],
      watch: ['src'],
      verbose: true
    });
  });
