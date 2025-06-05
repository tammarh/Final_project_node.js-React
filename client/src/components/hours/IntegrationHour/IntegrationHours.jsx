
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef } from 'react';
import { getAlliHours, updateIntegrationHour, deleteIntegrationHour } from '../../../services/hours/iHourService'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import UpdateIHour from './UpdateIHour';

export default function IntegrationHours({ globalFilter, reload }) {
    const [ihour, setIhour] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [updateVisible, setUpdateVisible] = useState(false)

    useEffect(() => {
        loudData();
    }, [reload]);

    const loudData = async () => {
        try {
            const data = await getAlliHours();
            setIhour(data);
        } catch (error) {
            console.error("Error loading teaching hours:", error);
        }
    }

    useEffect(() => {
        loudData();
    }, [])

    const formatDate = (rowData) => {
        const date = new Date(rowData.untilDate);
        return date.toISOString().split('T')[0]
    }

    const differenceTemplate = (rowData) => {
        const calculated = rowData.calculatedQuota || 0;
        const actual = rowData.actualQuota || 0;
        return calculated - actual;
    }
    const deleteRow = async () => {
        if (!selectedRow) return;
        try {
            await deleteIntegrationHour(selectedRow._id);
            setIhour(ihour.filter(row => row._id !== selectedRow._id));
            setVisible(false)
            setSelectedRow(null)
            //להוסיף כאן הודעה
        } catch (error) {
            console.error("Error deleting teaching hour:", error);
        }
    }


    const footerContent = (
        <div>
            <Button label="עדכון" onClick={() => setUpdateVisible(true)} className="p-button-text" />
            <Button label="מחיקה" onClick={deleteRow} className="p-button-text" />
        </div>
    );

    const ditails = (rowData) => {
        return (
            <>
                <div className="flex flex-wrap justify-content-center gap-2 mb-2">
                    <Button label={rowData.institution.institutionName} onClick={() => { setVisible(true); setSelectedRow(rowData) }} className="p-button-warning" style={{ width: '10rem' }} />
                </div></>)
    }

    return (
        <div className="card"  >
            <DataTable value={ihour} tableStyle={{ minWidth: '50rem' }} size="small" globalFilter={globalFilter}>
                <Column header="מוסד " body={ditails}></Column>
                <Column field="grade" header="שכבה" style={{ textAlign: 'center' }}></Column>
                <Column field="equivalent" header="מקבילה" style={{ textAlign: 'center' }}></Column>
                <Column field="studentsAllocation" header="מספר תלמידים" style={{ textAlign: 'center' }}></Column>
                <Column field="classType" header="סוג כיתה" style={{ textAlign: 'right' }}></Column>
                <Column field="source" header="מקור" style={{ textAlign: 'right' }}></Column>
                <Column field="designation" header="יעד" style={{ textAlign: 'right' }}></Column>
                <Column field="fromDate" header="מתאריך" body={formatDate} style={{ textAlign: 'right' }} bodyStyle={{ whiteSpace: 'nowrap' }} ></Column>
                <Column field="untilDate" header="עד תאריך" body={formatDate} style={{ textAlign: 'right' }} bodyStyle={{ whiteSpace: 'nowrap' }} ></Column>
                <Column field="calculatedQuota" header="תקן מחושב" style={{ textAlign: 'center' }}></Column>
                <Column field="actualQuota" header="תקן בפועל" style={{ textAlign: 'center' }}></Column>
                <Column header="הפרש" body={differenceTemplate} style={{ textAlign: 'center' }}></Column>
            </DataTable>

            <Dialog
                visible={visible}
                position={'top-left'}
                style={{ width: '15vw' }}
                onHide={() => { if (!visible) return; setVisible(false); }}
                footer={footerContent}
                draggable={false}
                resizable={false}>
                {selectedRow ? (
                    <div>
                        <p>סמל מוסד: {selectedRow.institution.institutionSymbol}</p>
                        <p>ישוב: {selectedRow.institution.settlement}</p>
                        <p>רשות מקומית: {selectedRow.institution.localAuthority}</p>
                        <p>מפקח: {selectedRow.institution.Supervisor}</p>
                    </div>
                ) : (<></>)}
            </Dialog>
            <UpdateIHour selectedRow={selectedRow}
                updateVisible={updateVisible}
                setVisible={setVisible}
                setUpdateVisible={setUpdateVisible}
                loudData={loudData} />
        </div >
    );
}

