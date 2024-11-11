"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTasks_1 = require("./routes/getTasks");
var postTask_1 = require("./routes/postTask");
function router(req, res) {
    var method = req.method, url = req.url;
    console.log("Requ\u00EAte re\u00E7ue : ".concat(method, " ").concat(url));
    // Ajout des entetes cors 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    if (method === 'GET' && url === '/tasks') {
        return (0, getTasks_1.default)(req, res);
    }
    if (method === 'POST' && url === '/tasks') {
        return (0, postTask_1.default)(req, res);
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
}
exports.default = router;
