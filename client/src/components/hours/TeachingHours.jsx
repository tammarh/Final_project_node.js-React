
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef } from 'react';
import { getAlltHours, createTeachingHour, updateTeachingHour, deleteTeachingHour } from '../../services/hours/tHourService'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

export default function TeachingHours({ globalFilter }) {
    const [thour, setThour] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [updateVisible, setUpdateVisible] = useState(false)
    const toast = useRef(null);
    const { control, handleSubmit, setValue, reset ,watch} = useForm({
        defaultValues: {
            _id: '',
            institution: '',
            grade: '',
            equivalent: 0,
            studentsAllocation: 0,
            classType: '',
            source: '',
            designation: '',
            fromDate: null,
            untilDate: null,
            calculatedQuota: 0,
            actualQuota: 0,
        },
    });
 
    const grades = [
        { label: 'א', value: 'א' },
        { label: 'ב', value: 'ב' },
        { label: 'ג', value: 'ג' },
        { label: 'ד', value: 'ד' },
        { label: 'ה', value: 'ה' },
        { label: 'ו', value: 'ו' },
        { label: 'ז', value: 'ז' },
        { label: 'ח', value: 'ח' },
    ]
    const classes = [
        { label: 'משה בינוני', value: 'משה בינוני' },
        { label: 'לל', value: 'לל' },
        { label: 'עיכוב התפתחותי - שפתי', value: 'עיכוב התפתחותי - שפתי' },
        { label: 'הפרעות התנהגותיות רגשיות', value: 'הפרעות התנהגותיות רגשיות' },
        { label: 'ASD', value: 'ASD' },
        { label: 'הפרעות נפשיות', value: 'הפרעות נפשיות' },
        { label: 'נכות פיזית', value: 'נכות פיזית' },
    ]
    const source = [
        { label: '5 - סל עדיפות', value: '5 - סל עדיפות' },
        { label: '6 - תקן בסיסי חנמ לקויות מורכבות', value: '6 - תקן בסיסי חנמ לקויות מורכבות' },
        { label: '25 - בסיסי חנמ רגיל לקויות קלות', value: '25 - בסיסי חנמ רגיל לקויות קלות' },
        { label: '16 - סל שחמ', value: '16 - סל שחמ' }
    ]
    /*const designation = [
        { label: '11 - יוחא', value: '11 - יוחא' },
        { label: '85 - ניהול', value: '85 - ניהול' },
        { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
        { label: '18 - חינוך', value: '18 - חינוך' },
        { label: '19 - ניהול', value: '19 - ניהול' },
        { label: '20 - יעוץ', value: '20 - יעוץ' },
        { label: '90 - רופא', value: '90 - רופא' },
        { label: '91 - פרא רפואי', value: '91 - פרא רפואי' },
        { label: '99 - אחות', value: '99 - אחות' },
    ]*/

    const designationMap = {
        '5 - סל עדיפות': [
        { label: '11 - יוחא', value: '11 - יוחא' },
        { label:  '85 - ניהול', value:  '85 - ניהול' }
    ],
    '6 - תקן בסיסי חנמ לקויות מורכבות': [
        { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
        { label: '18 - חינוך', value: '18 - חינוך' },
        { label:  '85 - ניהול', value:  '85 - ניהול' },
        { label:  '20 - יעוץ', value:  '20 - יעוץ' }
    ],
    '25 - בסיסי חנמ רגיל לקויות קלות': [
        { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
        { label: '18 - חינוך', value: '18 - חינוך' },
        { label:  '85 - ניהול', value:  '85 - ניהול' },
        { label:  '20 - יעוץ', value:  '20 - יעוץ' }
    ], 
    '16 - סל שחמ': [
        { label: '90 - רופא', value: '90 - רופא' },
        { label: '91 - פרא רפואי', value: '91 - פרא רפואי'},
        { label: '99 - אחות', value: '99 - אחות' },
    ]
    }
    const sourceValue = watch('source');
    const availableDesignations = designationMap[sourceValue] || [];
    const loudData = async () => {
        try {
            const data = await getAlltHours();
            console.log("Teaching Hours Data:", data);
            setThour(data);
            console.log("Teaching Hours State:", thour);
        } catch (error) {
            console.error("Error loading teaching hours:", error);
        }
    }

    useEffect(() => {
        loudData();
    }, [])


    useEffect(() => {
        if (selectedRow) {
            reset({
                ...selectedRow,
                fromDate: selectedRow.fromDate ? new Date(selectedRow.fromDate) : null,
                untilDate: selectedRow.untilDate ? new Date(selectedRow.untilDate) : null,
            });
        }
    }, [selectedRow]);


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
            await deleteTeachingHour(selectedRow._id);
            setThour(thour.filter(row => row._id !== selectedRow._id));
            setVisible(false)
            setSelectedRow(null)
            //להוסיף כאן הודעה
        } catch (error) {
            console.error("Error deleting teaching hour:", error);
        }
    }

    const updateRow = async (data) => {
        if (!selectedRow) return
        try {
            console.log(data);

            await updateTeachingHour(data)
            setUpdateVisible(false)
            loudData()
        }
        catch (error) {
            if (error.response && error.response.data?.message) {
                alert(error.response.data.message)
            } else {
                alert('שגיאה לא צפויה')
            }
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
                    <Button label={rowData.institution.institutionName} onClick={() => { setVisible(true); setSelectedRow(rowData) }} className="p-button-warning" style={{ minWidth: '10rem' }} />
                </div></>)
    }


    return (
        <div className="card"  >
            <DataTable value={thour} tableStyle={{ minWidth: '50rem' }} size="small" globalFilter={globalFilter}>
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
            <Dialog
                visible={updateVisible}
                modal
                style={{ width: '30vw', direction: 'rtl' }}
                onHide={() => {
                    if (!updateVisible) return;
                    setUpdateVisible(false);
                }}
            >
                {selectedRow ? (
                    <div className="p-4">
                        <h3 className="dialog-title">
                            עדכון שעות הוראה ל־{selectedRow.institution.institutionName}
                        </h3>

                        <form onSubmit={handleSubmit(updateRow)} className="p-fluid .small-input">
                            {/* שדה כללי */}
                            {[
                                { name: "grade", label: "שכבה", component: Dropdown, options: grades },
                                { name: "equivalent", label: "מקבילה", component: InputNumber },
                                { name: "studentsAllocation", label: "מספר תלמידים", component: InputNumber, props: { min: 4, max: 15 } },
                                { name: "classType", label: "סוג כיתה", component: Dropdown, options: classes },
                                { name: "source", label: "מקור", component: Dropdown, options: source ,props: {
                                    onChange: (e) => {
                                        setValue('source', e.value)
                                        setValue('designation', '')
                                    }
                                }},
                                { name: "designation", label: "ייעוד", component: Dropdown, options: availableDesignations  },
                                { name: "fromDate", label: "מתאריך", component: Calendar, props: { dateFormat: 'dd/mm/yy' } },
                                { name: "untilDate", label: "עד תאריך", component: Calendar, props: { dateFormat: 'dd/mm/yy' } },
                                { name: "calculatedQuota", label: "תקן מחושב", component: InputNumber },
                                { name: "actualQuota", label: "תקן בפועל", component: InputNumber }
                            ].map((fieldItem, index) => (
                                <div className="p-field" style={{ marginBottom: '1rem' }} key={fieldItem.name}>
                                    <label style={{ fontWeight: '500', color: '#34495e', marginBottom: '0.25rem', display: 'block' }}>
                                        {fieldItem.label}
                                    </label>
                                    <Controller
                                        name={fieldItem.name}
                                        control={control}
                                        render={({ field }) => {
                                            const Component = fieldItem.component;
                                            return (
                                                <Component
                                                    {...field}
                                                    {...(fieldItem.options ? { options: fieldItem.options, optionLabel: "label", placeholder: fieldItem.label } : {})}
                                                    {...(fieldItem.props || {})}
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e?.value ?? e?.target?.value)}
                                                    className="p-inputtext"
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            ))}

                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <Button
                                    type="submit"
                                    label="עדכון"
                                    className="p-button-update"
                                />
                            </div>
                        </form>
                    </div>
                ) : null}
            </Dialog>

            {/*<Dialog
                visible={updateVisible}
                modal
                style={{ width: '30vw', direction: 'rtl' }}
                onHide={() => {
                    if (!updateVisible) return;
                    setUpdateVisible(false);
                }}

            >
                {selectedRow ? (
                    <div className="p-2">
                        <h3 className="text-xl font-bold text-center mb-4">עדכון שעות הוראה ל{selectedRow.institution.institutionName}</h3>
                           
                        <form onSubmit={handleSubmit(updateRow)} className="space-y-4">
                            <div>
                                <label > שכבה </label>
                                <Controller
                                    name="grade"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            options={grades}
                                            optionLabel="label"                                           
                                            placeholder="בחר שכבה"
                                            className="w-full"
                                        />
                                    )}
                                /></div>
                            <div className="flex-auto">
                                <label htmlFor="minmax-buttons" className="font-bold block mb-2">  מקבילה </label>
                                <Controller

                                    name="equivalent"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            value={field.value}
                                            onValueChange={(e) => field.onChange(e.value)}
                                            mode="decimal"
                                        />
                                    )}
                                /></div>
                            <div className="flex-auto">
                                <label htmlFor="studentsAllocation" className="font-bold">  מספר תלמידים </label>
                                <Controller
                                    name="studentsAllocation"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            value={field.value}
                                            onValueChange={(e) => field.onChange(e.value)}
                                            mode="decimal"
                                            min={4}
                                            max={15}
                                        />
                                    )}
                                /></div>
                            <div className="flex-auto"><label > סוג כיתה </label><Controller
                                name="classType"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={classes}
                                        optionLabel="label"
                                        placeholder="סוג הכיתה"
                                        className="w-full md:w-7rem"
                                    />
                                )}
                            /></div>
                            <div className="flex-auto">   <label > מקור </label>
                            <Controller
                                name="source"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={source}
                                        optionLabel="label"
                                        placeholder="מקור"
                                        className="w-full md:w-7rem"
                                    />
                                )}
                            /></div>
                            <div className="flex-auto">  <label > יעוד </label><Controller
                                name="designation"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={designation}
                                        optionLabel="label"
                                        placeholder="יעוד"
                                        className="w-full md:w-14rem"
                                    />
                                )}
                            /></div>
                            <div className="flex-auto">
                                <label htmlFor="fromDate" className="font-bold">  מתאריך </label>
                                <Controller
                                    name="fromDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Calendar
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)}
                                            dateFormat="dd/mm/yy"
                                        />
                                    )}
                                /></div>
                            <div className="flex-auto">
                                <label htmlFor="untilDate" className="font-bold">  עד תאריך </label>
                                <Controller
                                    name="untilDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Calendar
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.value)}
                                            dateFormat="dd/mm/yy"
                                        />
                                    )}
                                /></div>

                            <div className="flex-auto">
                                <label htmlFor="calculatedQuota" className="font-bold">  תקן מחושב </label>
                                <Controller
                                    name="calculatedQuota"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            value={field.value}
                                            onValueChange={(e) => field.onChange(e.value)}
                                            mode="decimal"
                                        />
                                    )}
                                /></div>
                            <div className="flex-auto">
                                <label htmlFor="actualQuota" className="font-bold">  תקן בפועל </label>
                                <Controller
                                    name="actualQuota"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            value={field.value}
                                            onValueChange={(e) => field.onChange(e.value)}
                                            mode="decimal"
                                        />
                                    )}
                                /></div>
                            <Button type="submit" label="עדכון" />
                        </form>



                    </div >) : <></>
                }
            </Dialog >*/}
        </div >



    );
}

