import axios from 'axios'
import { refreshTokenUrl } from '../constants/urls'

const RefreshTokenService = async (refreshToken: string, apiSecretKey: string) => {
    const response = await axios.post(refreshTokenUrl, {}, {
        headers: {
            'Cookie': `refresh_token=${refreshToken}`,
            'API_KEY': apiSecretKey
        }
    })

    const setCookies = response.headers['set-cookie']
    const newRefreshToken = setCookies
    const newAccessToken = response.headers['authorization']
    const { user } = response.data

    return { user, newAccessToken, newRefreshToken }
}

export default RefreshTokenService