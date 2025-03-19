import axios from 'axios'
import { verifyTokenUrl } from '../constants/urls'

const VerifyAccessTokenService = async (accessToken: string, refreshToken: string, apiSecretKey: string) => {
    const response = await axios.post(verifyTokenUrl, {}, {
        headers: {
            'Authorization': accessToken,
            'X-API-KEY': apiSecretKey,
            'Cookie': `refresh_token=${refreshToken}`
        }
    })

    const setCookies = response.headers['set-cookie']
    const newRefreshToken = setCookies
    const newAccessToken = response.headers['authorization']
    const { user } = response.data

    return { user, newAccessToken, newRefreshToken }
}

export default VerifyAccessTokenService