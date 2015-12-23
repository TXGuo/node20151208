/**
 * Created by tianxing on 2015/12/23.
 */

var http = require('http');
var url = require('url');

var menuList = [{'name': '红烧茄子', 'unit': '份'}, {'name': '巫山烤鱼', 'unit': '条'}, {'name': '五香牛肉', 'unit': '斤'}];

var loadMenu = function () {
    var str = '<ul>';
    menuList.forEach(function (item) {
        str += '<li><a href="/' + item.name + '?unit=' + item.unit + '">' + item.name + '</a></li>';
    });
    str += '</ul>';
    return str;
}

var menu = function (request, response) {
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    var urlObj = url.parse(decodeURIComponent(request.url), true);
    console.log(urlObj);
    if (urlObj.path == '/favicon.ico') {
        response.end('');
        return false;
    }
    if (urlObj.path == '/') {
        response.end(loadMenu());
    } else {
        response.end('您好！请享用一' + urlObj.query.unit + urlObj.pathname.slice(1) + '.');
    }
}

var server = http.createServer(menu);

server.listen('8099', 'localhost', function () {
    console.log('Serving latest png on port 8099 ...');
});