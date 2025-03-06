import axios from "axios";
import { CookiesHandler } from "../utils/handlerCookie";
import { refreshTokenUrl } from "../constants/urls";

export const NewAccessTokenServices = async (refreshToken: string, userAgent: string) => {

    const response = await axios.post(refreshTokenUrl, {}, {
        headers: {
            'Cookie': `refresh_token=${refreshToken}`,
            'User-Agent': userAgent
        }
    })

    const setCookies = response.headers['set-cookie']
    const newRefreshToken = CookiesHandler(setCookies)
    const newAccessToken = response.headers['authorization']
    const { user } = response.data

    return { newRefreshToken, newAccessToken, user }
}
