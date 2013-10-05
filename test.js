var http = require('http');

/*var postItem = "{"
+   "\"method\": \"getApplicationInfo\","
+   "\"params\": [],"
+   "\"id\": 1,"
+   "\"version\": \"1.0\"}";
*/
var cmd = {
   "method": "getVersions",
   "params": [],
   "id": 1,
   "version": "1.0"
};

var cmd2 = {
"method": "echo",
"params": ["Hello Camera Remote API"], "id": 1,
"version": "1.0"
};

var livecmd = {
   "method": "startLiveview",
   "params": [],
   "id": 1,
   "version": "1.0"
};

var acttake = {
   "method": "actTakePicture",
   "params": [],
   "id": 1,
   "version": "1.0"
};

var startrec = {
   "method": "startRecMode",
   "params": [],
   "id": 1,
   "version": "1.0"
};

var stoprec = {
   "method": "stopRecMode",
   "params": [],
   "id": 1,
   "version": "1.0"
};

var methodtype = {
   "method": "getMethodTypes",
   "params": ["1.0"],
   "id": 1,
   "version": "1.0"
};


var postItem = JSON.stringify(methodtype);

var urlOpts = {
    host: '192.168.122.1',
    path: '/sony/camera',
    port: '8080',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postItem.length
    }
};

var SSDP_PORT = 1900;
var SSDP_MX = 1;
var SSDP_ADDR = '239.255.255.250';
var SSDP_ST = "urn:schemas-sony-com:service:ScalarWebAPI:1";
var ssdpRequest = "M-SEARCH * HTTP/1.1\r\n"
    + "HOST: " + SSDP_ADDR + ":" + SSDP_PORT + "\r\n"
    + "MAN: \"ssdp:discover\"\r\n"
    + "MX: " + SSDP_MX + "\r\n" 
    + "ST: " + SSDP_ST + "\r\n";
//console.log(ssdpRequest);
var ssdpUrlOpts = {
    host: SSDP_ADDR,
    port: SSDP_PORT
/*    headers: {
        'Content-Type': 'application/text',
        'Content-Length': ssdpRequest.length
    }*/
};

var req = http.request(urlOpts, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.on('data', function (chunk) {
        console.log("RET:" + chunk.toString());
    });
});

req.on('error', function (e) {
    console.log('ERROR:' + e.stack);
});

req.write(postItem);
req.end();