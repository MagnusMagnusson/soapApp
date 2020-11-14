import React from 'react';
import '../css/BatchTable.css';

let states={
    "DES":1,
    "PRE":2,
    "MAN":3,
    "DRY":4,
    "CUR":5,
    "DON":6
};

class BatchTable extends React.Component{
    constructor(props){
        super();
        this.state={
            "data": []
        }
        this.getData();
    }

    getData(){
        fetch("/api/b/").then(d => d.json()).then(d =>
            this.setState({
                data: d.result
            })
        )
    }

    current_tables(){
        let data = this.state.data.filter(x => x.current_status !== states.CUR && x.current_status !== states.DON);
        data = data.map(x => <tr>
            <td>{x.name}</td>
            <td>{x.design.name}</td>
            <td>{x.recipie.name}</td>
            <td>{x.current_status.state_description}</td>
        </tr>);

        return (<table>
            <thead>
                <tr>
                <th>Heiti</th>
                <th>Hönnun</th>
                <th>Uppskrift</th>
                <th>Staða</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>);
    }

    curing_tables(){
        let data = this.state.data.filter(x => x.current_status === states.CUR);
        data = data.map(x => <tr>
            <td>{x.name}</td>
            <td>{x.design.name}</td>
            <td>{x.recipie.name}</td>
            <td>{x.current_status.state_description}</td>
        </tr>);

        return (<table>
            <thead>
                <tr>
                <th>Heiti</th>
                <th>Hönnun</th>
                <th>Uppskrift</th>
                <th>Staða</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>);
    }

    done_tables(){
        let data = this.state.data.filter(x => x.current_status === states.DON);
        data = data.map(x => <tr>
            <td>{x.name}</td>
            <td>{x.design.name}</td>
            <td>{x.recipie.name}</td>
            <td>{x.current_status.state_description}</td>
        </tr>);

        return (<table>
            <thead>
                <tr>
                <th>Heiti</th>
                <th>Hönnun</th>
                <th>Uppskrift</th>
                <th>Staða</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>);
    }

    render(){

        
        return (
            <div className="classTable">
                <h3>Sápur í framleiðslu</h3>
                {this.current_tables()}
                <h3>Sápur í þurrkun</h3>
                {this.curing_tables()}
                <h3>Gamlar/Tilbúnar sápur</h3>
                {this.done_tables()}
            </div>
        );
    }
}

export default BatchTable