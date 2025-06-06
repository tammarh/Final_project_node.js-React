
import React, { useEffect, useState } from 'react';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { getUserById } from '../../services/userService';

export default function LazyDemo() {
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
                <Column field="Institution" header="מוסד" style={{textAlign:'center'}}></Column>
                <Column field="integrationhours" header="שעות שילוב" style={{textAlign:'center'}}></Column>
                <Column field="personalbasket" header="סל אישי" style={{textAlign:'center'}}></Column>
                <Column field="additionforpersonalbasket" header="תוספת סל אישי" style={{textAlign:'center'}}></Column>
                <Column header="סך הכל" body={(row) =>
                    (row.integrationhours || 0) +
                    (row.personalbasket || 0) +
                    (row.additionforpersonalbasket || 0)
                } style={{textAlign:'center'}}></Column>
                <Column field="education" header="חינוך" body={(rowData) => (rowData.education ? '✔️' : '')} style={{textAlign:'center'}}></Column>
                <Column field="firstgradeeducation" header="חינוך כיתה א" body={(rowData) => (rowData.firstgradeeducation ? '✔️' : '')} style={{textAlign:'center'}}></Column>

            </DataTable>

        </div >
    );
}
