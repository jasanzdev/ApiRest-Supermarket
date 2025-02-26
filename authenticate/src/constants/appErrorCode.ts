const enum AppErrorCode {
    InvalidToken = 'InvalidToken',
    AccessDenied = 'AccessDenied',
    AccessTokenExpired = 'AccessTokenExpired',
    UserNotExist = 'UserDoesNotExist',
    InvalidId = 'InvalidId',
    BadRequest = 'BadRequest',
    NoTokenProvider = 'NoTokenProvider',
    InternalServerError = 'InternalServerError'
}

export default AppErrorCode