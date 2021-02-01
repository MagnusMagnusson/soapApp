import React from 'react';

function ExtraHead(p){
    if(p.editable){
        return <th>Fjarlægja</th>;
    }
    return null;
}
function ExtraColumn(p){
    if(p.editable){
        return <td><a href="#" onClick={p.onClick}>X</a></td>;
    }
    return null;  
}

function RecipeIngredientTable(props){
    let ings = props.ingredients.map(ing => <tr key={ing.ingredient.id}>
        <td>{ing.ingredient.name}</td>
        <td>{ing.amount}</td>
        <td><a href="#">Nánar</a></td>
        <ExtraColumn editable = {props.editable} onClick={e => props.removeIngredient(ing.ingredient.id)}></ExtraColumn>
    </tr>);
    
    return <table>
        <thead>
            <tr>
                <th>Hráefni</th>
                <th>Magn</th>
                <th>Nánar</th>
                <ExtraHead editable={props.editable}></ExtraHead>
            </tr>
        </thead>
        <tbody>
            {ings}
        </tbody>
    </table>
}

export default RecipeIngredientTable;