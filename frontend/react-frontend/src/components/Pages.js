 
import BatchTable from './BatchTable';
import IngredientTable from '@/components/Tables/IngredientTable';
import RecipieTable from '@/components/Tables/RecipieTable';

function BatchPage(props){
    return <div>
            <BatchTable></BatchTable>
            <div>New</div>
        </div>
}

function IngredientPage(props){
    return <div>
        <IngredientTable></IngredientTable>
    </div>
}

function RecipiePage(props){
    return <div>
        <RecipiePage></RecipiePage>
    </div>
}

export {BatchPage,IngredientPage};