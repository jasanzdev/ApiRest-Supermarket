import { CookieOptions } from 'express'
import { ThirtyDaysFromNow } from './date'
import config from '../config/config'

const secure = !config.node_env.development

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