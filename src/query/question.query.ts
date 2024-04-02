import { IQuestion } from "../types/question";
import { IdParams, TypedRequest } from "../types/request";
import { IUser } from "../types/user";

interface Query {
    verified?: boolean;
    category?: string;
    user?: string;
}

/**
 * Esta función permite definir la query para las consultas de las distintas preguntas.
 * Permite buscar las preguntas por coincidencias de texto en los atributos "question" y "description",
 * además permite filtrar los datos si se encuentran verificados o no, por el atributo "category" y por
 * un determinado usuario
 *
 * @param req petición del cliente
 * @returns una query con los campos de búsqueda
 */
export function getQueryQuestionOr(
    req: TypedRequest<IQuestion | IUser, IdParams>
) {
    const or = [
        { question: { $regex: req.query.text || "", $options: "i" } },
        { description: { $regex: req.query.text || "", $options: "i" } },
    ];

    const queryOr = {
        $or: or,
    };

    // Instancio un nuevo objeto para la query
    let query: Query = {};

    // Verifico si se encuentra alguno de los campos del query y los asigno
    if (req.query.verified)
        query.verified = req.query.verified.toString().toLowerCase() === "true";
    if (req.query.category) query.category = req.query.category as string;
    if (req.query.user) query.user = req.query.user as string;

    return { ...queryOr, ...query };
}
