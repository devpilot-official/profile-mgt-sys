"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
exports.androidBuild = (req, res, next) => {
    if (!/Android/i.test(req.headers['user-agent']))
        return next();
    let buildNum;
    if (buildNum = req.get('x-build-number')) {
        if (parseInt(buildNum, 10) >= 0)
            next();
        else
            res.jSend.error(null, 'Invalid value format for header', http_status_codes_1.UNAUTHORIZED);
    }
    else {
        res.jSend.error(null, 'Missing required header', http_status_codes_1.UNAUTHORIZED);
    }
};
//# sourceMappingURL=android.middleware.js.map