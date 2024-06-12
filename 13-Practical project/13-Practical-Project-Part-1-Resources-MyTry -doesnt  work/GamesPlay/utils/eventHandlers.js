import page from '../node_modules/page/page.mjs'
import { requests } from '../api/requests.js'

async function onLoginSubmit(evt) {
    evt.preventDefault();

    let formData = new FormData(evt.currentTarget);

    let {email, password} = Object.fromEntries(formData)

    await requests.user.login(email, password)
    .then(res => {
        if (!res.ok){
            throw new Error('Unable to login!');
        }
        return res.json();
    })
    .then(user => {
        sessionStorage.setItem('game-user', JSON.stringify(user))
        page.redirect('/')
    })
    .catch(err => {
        alert(err.message);
    })
}

export const event = {
    onLoginSubmit
}