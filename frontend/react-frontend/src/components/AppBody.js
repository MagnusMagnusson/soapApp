import React from 'react';
import "@/css/AppBody.css";
import {BatchPage, IngredientPage} from '@/components/Pages';
import {Route} from 'react-router-dom';

function AppBody(){
    return <div className='app-body'>
        <Route path="/" exact component={BatchPage}></Route>
        <Route path="/hraefni/" component={IngredientPage}></Route>
    </div>
}

export default AppBody