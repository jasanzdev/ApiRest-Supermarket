const enum AppErrorCode {
    InvalidToken = 'InvalidToken',
    AccessDenied = 'AccessDenied',
    AccessTokenExpired = 'AccessTokenExpired',
    UserNotExist = 'UserDoesNotExist',
    InvalidId = 'InvalidId',
    BadRequest = 'BadRequest',
    NoTokenProvider = 'NoTokenProvider',
    InvalidCredentials = 'InvalidCredentials',
    InternalServerError = 'InternalServerError',
    InvalidSecretKey = 'InvalidSecretKey',
    ValidationError = 'ValidationError'
}

export default AppErrorCode