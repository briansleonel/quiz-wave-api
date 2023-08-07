import { IQuestion } from "../interfaces/question.interface";
import { IdParams, TypedRequest } from "../types/request";

export function getQueryQuestionOr(req: TypedRequest<IQuestion, IdParams>) {
    const or = [
        { question: { $regex: req.query.text || "", $options: "i" } },
        { description: { $regex: req.query.text || "", $options: "i" } },
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
