import {url} from '../utils/urls.js'
import {userInfo} from '../utils/userInfo.js'

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns response should be ok, if the user is redirected to home page
 */
function login(email, password){
    return fetch(url.getLoginUrl(), {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
          
    })
}

/**
 * 
 * @returns check status 204
 */
function logout(){
    return fetch(url.getLogoutUrl(), {
        method: 'GET',
        headres: { 'X-Authorization' : userInfo.getToken()}
    })
}

function register(user){
    return fetch(url.getRegisterUrl(). {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(user)
    });
}

export const user = {
    login,
    logout,
    register
}