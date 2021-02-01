import React from 'react';
import RecipeIngredientTable from '@/components/Tables/RecipieIngredientTable';
import '@/css/BatchTable.css';

function IngredientList(props){
    let ings = props.recipie.ingredients.map(ing => 
        <p key={ing.ingredient.id}>{props.ingredients[ing.ingredient.id].ingredient.name}</p>)
    return (
        <div className="dialog app-body"><h3>{props.recipie.name}</h3>
        {ings}
        </div>
    );
}



class Recipie extends React.Component{
    constructor(props){
        super();
        this.state={
            "recipie":props.recipie,
            "ingredientCache":props.ingredients
        }
        this.getRecipie = this.getRecipie.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getRecipie();
        if(this.props.recipie){
            this.getIngredients();
        }
    }
    getRecipie(){
        if(!this.state.recipie && this.props.id){
            fetch("/api/r/"+this.props.id).then(d => d.json).then(
                d => {
                    if(d.success){
                        console.log(d.result);
                        this.setState({"recipie":d.result}, this.getIngredients);
                    }
                }
            )
        }
    }

    getIngredients(){
    }

    handleChange(field, value){
        this.state.recipie[field] = value;
        this.setState({recipie:this.state.recipie});
    }

    render(){
        let rec = this.state.recipie;
        return <div className="smallWindow">
            <h3>Uppskrift</h3>
            <input onChange={e => this.handleChange('name',e.target.value)} className="title" placeholder="Name" value={rec.name || ""}></input>
            <textarea className="description" onChange={ e => this.handleChange('notes',e.target.value)} value={rec.notes || ""}></textarea>
            <div className="recipe-ingredient-table">
                <RecipeIngredientTable  editable={true} ingredients={rec.ingredients}></RecipeIngredientTable>
            </div>

        </div>
    }
}

export default Recipie;