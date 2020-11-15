import React from 'react';
import {post} from '@/scripts/request';
import '@/css/BatchTable.css';
import '@/css/misc.css';


let currencies=[
    "ISK",
    "EUR",
    "GBP",
    "USD",
]

let states=[
    "FR",
    "CL",
    "FT",
    "LQ",
    "AL",
    "OT"
];

let stateNames = {
    "FR":"Ilmefni",
    "CL":"Litarefni",
    "FT":"Fita/Olía",
    "LQ":"Vökvi",
    "AL":"Alkalíð/Basi",
    "OT":"Annað"
};

class IngredientTable extends React.Component{
    constructor(props){
        super();
        this.state={
            "data": [],
            "newButtonForm": false,
            "newIngredientData":{
                name:'',
                type:'FR',
                url:'',
                price:'',
                currency:'ISK',
                notes:''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData(){
        fetch("/api/i/").then(d => d.json()).then(d =>
            this.setState({
                data: d.result
            })
        )
    }

    ingredients(type){
        let data = this.state.data.sort((a,b) => {
            let r = states.indexOf(a.type) - states.indexOf(b.type);
            if(r === 0){
                return (a.name.trim() < b.name.trim()) ? -1 : 1;
            }
            return r;
        })
        data = data.map(x => {
            let url = x.url ? <a href={x.url}>{x.url.split("/")[2]}</a> : null;
        return <tr>
            <td>{x.name}</td>
            <td>{x.type_name}</td>
            <td>{url}</td>
            <td>{x.price}</td>
            <td>{x.currency}</td>
            <td>{x.notes}</td>
        </tr>;
        });

        return (<table>
            <thead>
                <tr>
                <th>Nafn</th>
                <th>Tegund</th>
                <th>Tengill</th>
                <th>Verð</th>
                <th>Gjaldeyri</th>
                <th>Athugasemd</th>
                </tr>
            </thead>
            <tbody>
                {data}
                {this.form()}
            </tbody>
        </table>);
    }

    handleChange(field, value){
        let o = this.state.newIngredientData;
        o[field] = value;
        this.setState({
            newIngredientData: o
        });
    }

    form(){
        if(this.state.newButtonForm){
            let options = states.map(x => <option value={x}>{stateNames[x]}</option>)
            let c = currencies.map(x => <option value={x}>{x}</option>)
            return <tr>
                <td>
                    <input onChange={e => this.handleChange("name",e.target.value)} value={this.state.newIngredientData['name']}></input>
                </td>
                <td>
                    <select onChange={e => this.handleChange("type",e.target.value)}>
                        {options}
                    </select>
                </td>
                <td>
                    <input onChange={e => this.handleChange("url",e.target.value)} value={this.state.newIngredientData['url']} type='url'></input>
                </td>
                <td>
                    <input onChange={e => this.handleChange("price",e.target.value)} value={this.state.newIngredientData['price']} className='short' step={0.01} type='number'></input>
                </td>
                <td>
                    <select onChange={e => this.handleChange("currency",e.target.value)}>
                        {c}
                    </select>
                </td>
                <td>
                    <input  onChange={e => this.handleChange("notes",e.target.value)} value={this.state.newIngredientData['notes']} type='text'></input>
                </td>
            </tr>
        }
    }

    save(){        
        post("/api/i/",this.state.newIngredientData).then(d => d.json()).then(e => {
            if(e.success){
                this.setState({
                    newButtonForm:false,
                    newIngredientData:{
                        name:'',
                        type:'FR',
                        url:'',
                        price:'',
                        currency:'ISK',
                        notes:''
                    }
                })
                this.getData();
            }
        });
    }

    button(){
        if(!this.state.newButtonForm){
            return <div onClick={x => this.setState({newButtonForm:true})} className='blue-button'>
                <b>Nýtt Hráefni</b>
            </div>;
        } else{
            return <span>
                <div onClick={e => this.setState({newButtonForm:false})} className='half blue-button'><b>Bakka</b></div>
                <div onClick={this.save} className='half blue-button'><b>Vista</b></div>
            </span>;
        }
    }

    render(){
        return (
            <div className="classTable">
                <h3>Hráefni</h3>
                {this.ingredients()}
                {this.button()}
            </div>
        );
    }
}

export default IngredientTable