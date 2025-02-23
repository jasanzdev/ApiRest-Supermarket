import { CookieOptions } from "express"
import { FifteenMinutesFromNow, ThirtyDaysFromNow } from "./date"

const secure = process.env.NODE_ENV === 'production'

const defaults: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure,
}

const getAccessTokenCookieOptions = () => ({
    ...defaults,
    expires: FifteenMinutesFromNow()
})

const getRefreshTokenCookieOptions = () => ({
    ...defaults,
    expires: ThirtyDaysFromNow(),
})

export { getAccessTokenCookieOptions, getRefreshTokenCookieOptions }