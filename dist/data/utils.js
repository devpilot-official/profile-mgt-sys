"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = __importDefault(require("date-fns/format"));
/**
 * Equivalent of Array.prototype.map but for asynchronous
 * actions
 * @param ts array to transform
 * @param callback async function to make transformation
 */
async function mapAsync(ts, callback) {
    const results = [];
    for (const t of ts) {
        const result = await callback(t);
        if (result) {
            results.push(result);
        }
    }
    return results;
}
exports.mapAsync = mapAsync;
function fromQueryAttr(query, queryMap) {
    const mongoQuery = {};
    Object.keys(queryMap).forEach(key => {
        if (query[key]) {
            Object.assign(mongoQuery, queryMap[key]);
        }
    });
    return mongoQuery;
}
exports.fromQueryAttr = fromQueryAttr;
function parseTime(time, base = new Date()) {
    return new Date(`${format_1.default('yyyy-MM-dd')}T${time}`);
}
exports.parseTime = parseTime;
function withinRange(before, after, greenwood) {
    return before <= greenwood && greenwood <= after;
}
exports.withinRange = withinRange;
//# sourceMappingURL=utils.js.map