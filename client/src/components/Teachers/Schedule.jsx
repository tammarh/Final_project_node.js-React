
import React, { useState } from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';

export default function LazyDemo() {
    const [products, setProducts] = useState([]);
    
    const onOpen = () => {
        ProductService.getProductsSmall().then(data => setProducts(data));
    }

    return (
        <Inplace onOpen={onOpen}>
            <InplaceDisplay>
               מערכת שעות
            </InplaceDisplay>
            <InplaceContent>
                <DataTable value={products}>
                    <Column field="code" header="מוסד"></Column>
                    <Column field="name" header="ת.ז"></Column>
                    <Column field="category" header="שעות שילוב"></Column>
                    <Column field="quantity" header="סל אישי"></Column>
                    <Column field="quantity" header="תוספת סל אישי"></Column>
                    <Column field="quantity" header="סך הכל למורה "></Column>
                    <Column field="quantity" header="חינוך"></Column>
                    <Column field="quantity" header="חינוך כיתה א"></Column>
                </DataTable>
            </InplaceContent>
        </Inplace>
    );
}
        