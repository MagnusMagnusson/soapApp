import BatchTable from './BatchTable';
import IngredientTable from './IngredientTable';

function BatchPage(props){
    return <div>
            <BatchTable></BatchTable>
            <div>New</div>
        </div>
}

function IngredientPage(props){
    return <IngredientTable>

    </IngredientTable>
}

export {BatchPage};