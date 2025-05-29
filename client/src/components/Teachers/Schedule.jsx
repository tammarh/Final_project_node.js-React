
import React, { useEffect, useState } from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { getUserById } from '../../services/userService';

export default function LazyDemo() {
    /*    const [products, setProducts] = useState([]);
        
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
        ); */

    const { user } = useSelector((state) => state.token);
    const [hour, setHour] = useState([]);

    useEffect(() => {
        const func = async () => {
            const { HourOfTeacher } = await getUserById(user._id);
            setHour(HourOfTeacher);
        }
        func();
    }, []);



    return (

        <div className="card flex justify-content-center">

            <DataTable value={hour} tableStyle={{ minWidth: '50rem' }}>
                <Column field="Institution" header="מוסד"></Column>
                <Column field="integrationhours" header="שעות שילוב"></Column>
                <Column field="personalbasket" header="סל אישי"></Column>
                <Column field="additionforpersonalbasket" header="תוספת סל אישי"></Column>
                <Column header="סך הכל" body={(row) =>
                    (row.integrationhours || 0) +
                    (row.personalbasket || 0) +
                    (row.additionforpersonalbasket || 0)
                }></Column>
                <Column field="education" header="חינוך"></Column>
                <Column field="firstgradeeducation" header="חינוך כיתה א"></Column>
            </DataTable>

        </div>
    );
}
