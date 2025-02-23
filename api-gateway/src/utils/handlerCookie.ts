export const CookiesHandler = (setCookie: string[]) => {
    if (Array.isArray(setCookie)) {
        const newAccessTokenCookie = setCookie.find(cookie => cookie.startsWith('access_token='))
        if (newAccessTokenCookie) {
            const newAccessToken = newAccessTokenCookie.split(';')[0].split('=')[1]
            return newAccessToken
        }
    }
    return null
}
