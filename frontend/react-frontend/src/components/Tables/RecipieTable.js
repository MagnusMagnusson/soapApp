import React from 'react';
import {post} from '@/scripts/request';
import '@/css/BatchTable.css';
import '@/css/misc.css';


function IngredientList(props){
    let ings = props.recipie.ingredients.map(ing => 
        <p key={ing.ingredient.id}>{props.ingredients[ing.ingredient.id].ingredient.name}</p>)
    return (
        <div><h3>{props.recipie.name}</h3>
        {ings}
        </div>
    );
}

class RecipieTable extends React.Component{
    constructor(props){
        super();
        this.state={
            "data": [],
            "ingCache":{},
            "selectedRecipie":null,
            "pending_ingredient_fetch":false
        }
        this.getData = this.getData.bind(this);
        this.showIngredients = this.showIngredients.bind(this);
        this.getData();
    }

    getData(){
        fetch("/api/r/").then(d => d.json()).then(d =>
            this.setState({
                data: d.result
            })
        )
    }

    showIngredients(recipie){
        let missingIngredients = [];
        let amountCache = {}
        for(let ing of recipie.ingredients){
            if(!(ing.ingredient.id in this.state.ingCache)){
                missingIngredients.push(ing.ingredient.id);
                amountCache[ing.ingredient.id] = ing.amount;
            }
        }
        let pending = false;
        if(missingIngredients.length > 0){
            pending = true;
            let q = "?ids="+missingIngredients.join(",");
            fetch("/api/i"+q).then(d => d.json()).then(d => {
                if(d.success){
                    let cache = this.state.ingCache;
                    for(let i of d.result){
                        cache[i.id] = {
                            ingredient: i,
                            amount: amountCache[i.id]
                        };

                    }                        
                    this.setState({
                        ingCache:cache,
                        pending_ingredient_fetch:false
                    });
                } else{
                    this.setState({pending_ingredient_fetch:false});
                }
            });
            this.setState({
                selectedRecipie: recipie,
                pending_ingredient_fetch:pending,
            })
        } 

    }

    recipies(){
        let data = this.state.data.map(
            (x) => {
                let img = x.picture_path === "" ? "":<a href={x.picture_path}>Sjá skjal</a>;

                return <tr>
                    <td>
                        {x.name}
                    </td>
                    <td>
                        <span onClick={e => {
                                if(!this.state.selectedRecipie) {
                                    this.showIngredients(x);
                                }
                            }
                        } className="faux_link">Sjá hráefni ({x.ingredients.length})</span>
                    </td>                    
                    <td>
                        {img}
                    </td>                   
                    <td>
                        {x.notes}
                    </td>
                </tr>;
            }
        );

        return (<table>
            <thead>
                <tr>
                <th>Nafn</th>
                <th>Hráefni</th>
                <th>Skjal</th>
                <th>Athugasemd</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>);
    }


    render(){
        let ingredientList = null;
        if (this.state.selectedRecipie && !this.state.pending_ingredient_fetch){
            ingredientList = <IngredientList recipie={this.state.selectedRecipie} ingredients={this.state.ingCache}></IngredientList>
        }

        return (
            <div className="classTable">
                <h3>Uppskriftir</h3>
                {this.recipies()}
                {ingredientList}
            </div>
        );
    }
}

export default RecipieTable