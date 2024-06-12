import {render} from "../node_modules/lit-html.js";
import page from "../node_modules/page/page.mjs";

import {requests} from '../api/requests.js';
import {templates} from '../templates/templates.js';

let mainElement = document.querySelector('#box #main-content');
let headerElement = document.querySelector('#box header')

async function homeView(ctx) {
    let games = await requests.games.getMostRecentGames();
    render(templates.getHomeTemplate(games), mainElement);
}

function navView(ctx, next){
    render(templates.getNavTemplate(), headerElement);
    next();
}

async function loginView(ctx){
    render(templates.getLoginTemplate(), mainElement)
}


export const viewHandler = {
    homeView,
     navView,
     loginView
}


