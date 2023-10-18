import { ICollectionDTO } from "../types/collection";
import { IdParams, TypedRequest } from "../types/request";

interface CollectionQuery {
    user?: string;
}

export function getQueryCollectionOr(
    req: TypedRequest<ICollectionDTO, IdParams>
) {
    const or = [
        { name: { $regex: req.query.text || "", $options: "i" } },
        { description: { $regex: req.query.text || "", $options: "i" } },
    ];

    const queryOr = {
        $or: or,
    };

    // Instancio un nuevo objeto para la query
    let query: CollectionQuery = {};

    if (req.query.user) query.user = req.query.user as string;

    return { ...queryOr, ...query };
}
