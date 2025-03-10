import { CookieOptions } from 'express'
import { ThirtyDaysFromNow } from './date'

const secure = process.env.NODE_ENV === 'production'

const defaults: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure,
}

const getCookieOptions = () => ({
    ...defaults,
    expires: ThirtyDaysFromNow(),
})

export { getCookieOptions }