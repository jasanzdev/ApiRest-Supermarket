import { CookieOptions } from 'express'
import { ThirtyDaysFromNow } from './date'
import { envs } from '../config/config'

const secure = envs.isProduction

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