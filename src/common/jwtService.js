const ID_TOKEN_KEY = 'set_token'

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY)
}

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export default { getToken, saveToken }