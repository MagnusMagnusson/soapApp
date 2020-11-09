import React from 'react';
import "../css/AppBody.css";
import {BatchPage} from './Pages';
import {Route} from 'react-router-dom';

function AppBody(){
    return <div className='app-body'>
        <Route path="/" exact component={BatchPage}></Route>
    </div>
}

export default AppBody