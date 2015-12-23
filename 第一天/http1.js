/**
 * Created by Eric on 2015/12/22.
 */
var http = require('http');

http.createServer(function (request, response) {
    console.log('----------请求部分----------');
    console.log(request.url);
    console.log(request.method);
    console.log(request.headers);
    console.log('-------响应部分----------');
    console.log(response.contentLength);
    response.statusCode = '200';
    if (request.url != '/favicon.ico') {
        response.write("Hello World!");
    }
    response.end();
}).listen('8080', 'localhost');


