"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryCollectionOr = void 0;
function getQueryCollectionOr(req) {
    const or = [
        { name: { $regex: req.query.text || "", $options: "i" } },
        { description: { $regex: req.query.text || "", $options: "i" } },
    ];
    const queryOr = {
        $or: or,
    };
    // Instancio un nuevo objeto para la query
    let query = {};
    if (req.query.user)
        query.user = req.query.user;
    return Object.assign(Object.assign({}, queryOr), query);
}
exports.getQueryCollectionOr = getQueryCollectionOr;
