const messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict"
}

export interface ErrorWithStatus extends Error {
    status?: number;
}

const HttpError = (status: number, message = messages[status as keyof typeof messages]) => {
    const error = new Error(message) as ErrorWithStatus;
    error.status = status;
    return error;
}

export default HttpError;