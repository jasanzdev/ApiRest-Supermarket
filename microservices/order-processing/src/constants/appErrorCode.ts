const enum AppErrorCode {
    AccessDenied = 'AccessDenied',
    UserNotExist = 'UserDoesNotExist',
    UserHasPendingOrder = 'UserHasPendingOrder',
    InvalidId = 'InvalidId',
    ProductNotExist = 'ProductNotExist',
    ProductOutOfStock = 'ProductOutOfStock',
    CartNotExist = 'CartNotExist',
    OrderNotExist = 'OrderNotExist',
    OrderStatusConflict = 'OrderStatusConflict',
    InvalidOrderStatus = 'InvalidOrderStatus'
}

export default AppErrorCode

