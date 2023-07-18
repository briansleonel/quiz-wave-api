import { IUser } from "../interfaces/user.interface";
import { IdParams, TypedRequest } from "../types/request";

export function getQueryUser(req: TypedRequest<IUser, IdParams>) {
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

export function getQueryUserOr(req: TypedRequest<IUser, IdParams>) {
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
