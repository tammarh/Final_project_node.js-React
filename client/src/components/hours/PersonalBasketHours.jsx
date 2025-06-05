
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef } from 'react';
import { getAllpHours , createPersonalBasketHours ,updatePersonalBasketHours ,deletePersonalBasketHours} from '../../services/hours/pHourService'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';

export default function PersonalBasketHours({ globalFilter }) {
    const [phour, setPhour] = useState([]);
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
 
  
    
    const source = [
        { label: '24 - סל שילוב - מתיא', value: '24 - סל שילוב - מתיא' },
        { label: '55 - הנחיית צוות המוס"ח', value: '55 - הנחיית צוות המוס"ח' }
    ]
   

    const designationMap = {
      '24 - סל שילוב - מתיא': [
        { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
        { label: '27 - פרא רפואי', value: '27 - פרא רפואי' },
        { label:  '28 - לקות שמיעה', value:  '28 - לקות שמיעה' },
        { label:  '30 - לקות ראיה', value:  '30 - לקות ראיה' }
    ],
    '55 - הנחיית צוות המוס"ח' :[
        { label: '1 - תוכנית למודים', value: '1 - תוכנית לימודים' },
        { label:  '21 - שעות הכנה', value:  '21 - שעות הכנה' }
    ]   
    }
    const sourceValue = watch('source');
    const availableDesignations = designationMap[sourceValue] || [];
    const loudData = async () => {
        try {
            const data = await getAllpHours();
            console.log("Teaching Hours Data:", data);
            setPhour(data);
            console.log("Teaching Hours State:", phour);
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
            await deletePersonalBasketHours(selectedRow._id);
            setPhour(phour.filter(row => row._id !== selectedRow._id));
            setVisible(false)
            setSelectedRow(null)
            //להוסיף כאן הודעה
        } catch (error) {
            console.error("Error deleting personal basket hour:", error);
        }
    }

    const updateRow = async (data) => {
        if (!selectedRow) return
        try {
            console.log(data);

            await updatePersonalBasketHours(data)
            setUpdateVisible(false)
            setVisible(false)
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
                    <Button label={rowData.institution.institutionName} onClick={() => { setVisible(true); setSelectedRow(rowData) }} className="p-button-warning" style={{ width: '10rem' ,backgroundColor:'pink'}} />
                </div></>)
    }


    return (
        <div className="card"  >
            <DataTable value={phour} tableStyle={{ minWidth: '50rem' }} size="small" globalFilter={globalFilter}>
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
                            עדכון שעות סל אישי ל־{selectedRow.institution.institutionName}
                        </h3>

                        <form onSubmit={handleSubmit(updateRow)} className="p-fluid .small-input">
                            {/* שדה כללי */}
                            {[
                               
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
        </div >



    );
}

