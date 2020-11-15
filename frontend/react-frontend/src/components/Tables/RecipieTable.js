import React from 'react';
import {post} from '@/scripts/request';
import '@/css/BatchTable.css';
import '@/css/misc.css';


class RecipieTable extends React.Component{
    constructor(props){
        super();
        this.state={
            "data": [],
        }
        this.getData = this.getData.bind(this);
        this.getData();
    }

    getData(){
        fetch("/api/r/").then(d => d.json()).then(d =>
            this.setState({
                data: d.result
            })
        )
    }

    recipies(type){
        let data = this.state.data;
        data = data.map(x => {
            let url = x.url ? <a href={x.url}>{x.url.split("/")[2]}</a> : null;
        return <tr>
            <td>{x.name}</td>
            <td>{x.ingredients.length}</td>
            <td>{x.picture_path}</td>
            <td>{x.notes}</td>
        </tr>;
        });

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
                {this.form()}
            </tbody>
        </table>);
    }


    render(){
        return (
            <div className="classTable">
                <h3>Uppskriftir</h3>
                {this.recipies()}
            </div>
        );
    }
}

export default RecipieTable