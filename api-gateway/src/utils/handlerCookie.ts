export const CookiesHandler = (setCookie: string[] | undefined) => {
    if (setCookie && Array.isArray(setCookie)) {
        const newRefreshTokenCookie = setCookie.find(cookie => cookie.startsWith('refresh_token='))
        if (newRefreshTokenCookie) {
            const newRefreshToken = newRefreshTokenCookie.split(';')[0].split('=')[1]
            return newRefreshToken
        }
    }
    return null
}
