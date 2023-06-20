import { StatusCodes } from "http-status-codes";

export interface APIResponse<I> {
    status: number;
    data?: I;
    message: string;
}
