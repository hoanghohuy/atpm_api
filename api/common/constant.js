const RETURN_CODE = {
    OK : "OK",
    PERMISSION_DENIED : "Permisstion denied.",
    TOKEN_EXPIRED : "Token Expired",
    MISSING_PARAMETER: "Missing parameter."
}

const ORDER_CREATED_TOKEN = {
    "returnCode": "1",
    "message": "OK",
    "description": "Created order token",
}

const PERMISSION_DENIED = {
    "returnCode": "2",
    "message": "Permisstion denied.",
    "description": "Permisstion denied.",
}

const TOKEN_EXPIRED = {
    "returnCode": '3',
    "message": "Token Expired.",
    "description": "Token Expired."
}

const USER_MISSING_PARAMETER = {
    "returnCode": "4",
    "message": "Missing parameter.",
    "description": "Missing Parameter on create user token"
}

const ORDER_MISSING_PARAMETER = {
    "returnCode": "4",
    "message": "Missing parameter.",
    "description": "Missing parameter on create order token"
}

const DATA_INCORRECT = {
    "returnCode": "5",
    "message": "Username or password incorrect.",
    "description": "Username or password incorrect."
}



module.exports = {
    ORDER_CREATED_TOKEN,
    PERMISSION_DENIED,
    USER_MISSING_PARAMETER,
    ORDER_MISSING_PARAMETER,
    TOKEN_EXPIRED,
    RETURN_CODE,
    DATA_INCORRECT
}