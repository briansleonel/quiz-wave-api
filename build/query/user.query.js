"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryUserOr = exports.getQueryUser = void 0;
function getQueryUser(req) {
    const username = { $regex: req.query.username || "", $options: "i" };
    const firstName = { $regex: req.query.firstName || "", $options: "i" };
    const lastName = { $regex: req.query.lastName || "", $options: "i" };
    const normalQuery = { username, firstName, lastName };
    const queryWithVerified = {
        normalQuery,
        verified: req.query.verified,
    };
    return req.query.verified ? queryWithVerified : normalQuery;
}
exports.getQueryUser = getQueryUser;
function getQueryUserOr(req) {
    const or = [
        { username: { $regex: req.query.text || "", $options: "i" } },
        { firstName: { $regex: req.query.text || "", $options: "i" } },
        { lastName: { $regex: req.query.text || "", $options: "i" } },
    ];
    const queryOr = {
        $or: or,
    };
    const queryOrWithVerified = {
        $or: or,
        verified: req.query.verified,
    };
    return req.query.verified ? queryOrWithVerified : queryOr;
}
exports.getQueryUserOr = getQueryUserOr;
