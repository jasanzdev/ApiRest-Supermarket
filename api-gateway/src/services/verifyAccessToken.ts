import axios from "axios"
import { CookiesHandler } from "../utils/handlerCookie"

const verifyTokenUrl = process.env.NODE_ENV === 'production'
    ? 'http://authentication:4000/verify-token'
    : 'http://localhost:4000/verify-token'


const VerifyAccessTokenServices = async (accessToken: string, refreshToken: string) => {
    const response = await axios.post(verifyTokenUrl, {}, {
        headers: {
            'Authorization': accessToken,
            'Cookie': `refresh_token=${refreshToken}`
        }
    })

    const setCookies = response.headers['set-cookie']
    const newRefreshToken = setCookies
    const newAccessToken = response.headers['authorization']
    const { user } = response.data

    return { user, newAccessToken, newRefreshToken }
}

export { VerifyAccessTokenServices }