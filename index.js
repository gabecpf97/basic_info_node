const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = "localhost";
const port = "8080";

let errData = '';

fs.readFile('404.html', (err, data) => {
    errData = data;
})

const server = http.createServer((req, res) => {
    let filename = '';
    switch(req.url) {
        case "/":
            filename = 'index';
            break;

        case "/about":
            filename = "about";
            break;

        case "/contact-me":
            filename = "contact-me";
            break;

        default:
            filename = '';
            break;
    }
    filename += '.html';
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(errData);
        } else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
        }
        return res.end();  
    })
});

server.listen(port, hostname, () => {
    console.log(`sercver running at ${hostname}:${port}`);
});