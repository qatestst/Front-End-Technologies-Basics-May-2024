const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]', 
    REGISTER_BUTTON: 'a[href="/register"]',
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    LOGIN_BUTTON: '#login-form input[type="submit"]'

}

const LOGGED_NAVBAR = {
    USER_EMAIL: '//span[text()="Welcome, test@test.bg"]',
    MY_BOOKS_BUTTON: 'a[href="/profile"]',
    ADD_BOOK_BUTTON: 'a[href="/create"]',
    LOGOUT_BUTTON: '#logoutBtn'
}

export {
    NAVBAR,
    LOGIN_FORM,
    LOGGED_NAVBAR
}