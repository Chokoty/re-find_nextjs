const fs = require('fs');
const https = require('https');
const next = require('next');

const port = 3000;
// const hostname = 'localhost';
const hostname = '0.0.0.0';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const httpsOptions = {
//   key: fs.readFileSync('./localhost.key'), // mkcert로 생성된 개인 키 파일
//   cert: fs.readFileSync('./localhost.crt'), // mkcert로 생성된 인증서 파일
// };

const httpsOptions = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
