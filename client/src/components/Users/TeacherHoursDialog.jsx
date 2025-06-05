import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { getAllInstitutions } from '../../services/InstitutionService'

export default function TeacherHoursDialog({ visible, onHide, user, setUser, onSave }) {
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        if (visible) {
            getAllInstitutions()
                .then(data => {
                    const formatted = data.map(inst => ({
                        label: inst.institutionName,
                        value: inst._id
                    }));
                    setInstitutions(formatted);
                })
                .catch(err => console.error('Institution fetch failed:', err));
        }
    }, [visible]);

    const updateHourField = (value, rowIndex, field) => {
        const updatedHours = [...user.HourOfTeacher];
        updatedHours[rowIndex][field] = value._id;
        setUser({ ...user, HourOfTeacher: updatedHours });
    };

    const addNewRow = () => {
        const newRow = {
            institutionId: "",
            integrationhours: null,
            personalbasket: null,
            additionforpersonalbasket: null,
            education: false,
            firstgradeeducation: false
        };
        setUser({ ...user, HourOfTeacher: [...user.HourOfTeacher, newRow] });
    };

    const toggleIsTeacher = (e) => {
        setUser({ ...user, isTeacher: e.checked });
    };

    const footer = (
        <>
            <Button label="ביטול" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="שמור" icon="pi pi-check" onClick={onSave} autoFocus />
        </>
    );

    return (
        <Dialog header="מערכת שעות" visible={visible} style={{ width: '60vw' }} footer={footer} onHide={onHide}>
          
            <Button label="הוסף שעות למוסד" onClick={addNewRow} className="mb-3" />

            <DataTable value={user.HourOfTeacher} responsiveLayout="scroll" editMode="cell">
                <Column field="_id" header="מוסד" editor={(options) => (
                    <Dropdown
                    options={institutions}
                    value={options.rowData.institutionId || ''}
                    onChange={(e) => updateHourField(e.value, options.rowIndex, 'institutionId')}
                    placeholder="בחר מוסד"
                    optionLabel="label"
                    optionValue="value"
                    style={{ width: '100%' }}
                  />
                  
                )} body={(rowData) => {
                    const inst = institutions.find(i => i.value === rowData._id);
                    return inst ? inst.label : '';
                }} />
                <Column field="integrationhours" header="שעות שילוב" editor={(options) => (
                    <InputNumber
                        value={options.rowData.integrationhours}
                        onValueChange={(e) => updateHourField(e.value, options.rowIndex, 'integrationhours')}
                    />
                )} />
                <Column field="personalbasket" header="סל אישי" editor={(options) => (
                    <InputNumber
                        value={options.rowData.personalbasket}
                        onValueChange={(e) => updateHourField(e.value, options.rowIndex, 'personalbasket')}
                    />
                )} />
                <Column field="additionforpersonalbasket" header="תוספת סל אישי" editor={(options) => (
                    <InputNumber
                        value={options.rowData.additionforpersonalbasket}
                        onValueChange={(e) => updateHourField(e.value, options.rowIndex, 'additionforpersonalbasket')}
                    />
                )} />
                <Column field="education" header="חינוך" editor={(options) => (
                    <Checkbox
                        checked={options.rowData.education || false}
                        onChange={(e) => updateHourField(e.checked, options.rowIndex, 'education')}
                    />
                )} body={(rowData) => rowData.education ? '✔️' : ''} />
                <Column field="firstgradeeducation" header="חינוך כיתה א" editor={(options) => (
                    <Checkbox
                        checked={options.rowData.firstgradeeducation || false}
                        onChange={(e) => updateHourField(e.checked, options.rowIndex, 'firstgradeeducation')}
                    />
                )} body={(rowData) => rowData.firstgradeeducation ? '✔️' : ''} />
            </DataTable>
        </Dialog>
    );
}
