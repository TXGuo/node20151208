/**
 * Created by Eric on 2015/12/23.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var me = require('mime');

var menuList = [{'name': '红烧茄子', 'unit': '份'}, {'name': '巫山烤鱼', 'unit': '条'}, {'name': '五香牛肉', 'unit': '斤'}];

var loadMenu = function () {
    var str = '<ul>';
    menuList.forEach(function (item) {
        str += '<li><a href="/cc/' + item.name + '?unit=' + item.unit + '">' + item.name + '</a></li>';
    });
    str += '</ul>';
    return str;
}

var menu = function (request, response) {
    var urlObj = url.parse(decodeURIComponent(request.url), true);
    console.log(urlObj.pathname + '-----' + urlObj.path);
    if (urlObj.pathname == '/favicon.ico') {
        response.end('');
        return false;
    }
    if (urlObj.pathname == '/') {
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        var content = fs.readFileSync('content.html', 'utf8');
        content = content.replace('###', loadMenu());
        response.end(content);
    } else if (urlObj.pathname.indexOf('/cc') == 0) {
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end('您好！请享用一' + urlObj.query.unit + urlObj.pathname.slice(4) + '.');
    } else {
        var pathName = urlObj.pathname.slice(1);
        console.log(me.lookup(pathName));
        response.setHeader('Content-Type', me.lookup(pathName));
        var styleCss = fs.readFileSync(pathName, 'utf8');
        response.end(styleCss);
    }
}

var server = http.createServer(menu);

server.listen('8099', 'localhost', function () {
    console.log('Serving latest png on port 8099 ...');
});