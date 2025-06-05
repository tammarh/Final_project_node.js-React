import React, { useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { useForm, Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { updateTeachingHour } from '../../../services/hours/tHourService'


export default function UpdateTHour({ updateVisible, setUpdateVisible, selectedRow, setVisible, loudData }) {
    const { control, handleSubmit, setValue, reset, watch } = useForm({
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


    const designationMap = {
        '5 - סל עדיפות': [
            { label: '11 - יוחא', value: '11 - יוחא' },
            { label: '85 - ניהול', value: '85 - ניהול' }
        ],
        '6 - תקן בסיסי חנמ לקויות מורכבות': [
            { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
            { label: '18 - חינוך', value: '18 - חינוך' },
            { label: '85 - ניהול', value: '85 - ניהול' },
            { label: '20 - יעוץ', value: '20 - יעוץ' }
        ],
        '25 - בסיסי חנמ רגיל לקויות קלות': [
            { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
            { label: '18 - חינוך', value: '18 - חינוך' },
            { label: '85 - ניהול', value: '85 - ניהול' },
            { label: '20 - יעוץ', value: '20 - יעוץ' }
        ],
        '16 - סל שחמ': [
            { label: '90 - רופא', value: '90 - רופא' },
            { label: '91 - פרא רפואי', value: '91 - פרא רפואי' },
            { label: '99 - אחות', value: '99 - אחות' },
        ]
    }
    const sourceValue = watch('source');
    const availableDesignations = designationMap[sourceValue] || []

    useEffect(() => {
        if (selectedRow) {
            reset({
                ...selectedRow,
                fromDate: selectedRow.fromDate ? new Date(selectedRow.fromDate) : null,
                untilDate: selectedRow.untilDate ? new Date(selectedRow.untilDate) : null,
            });
        }
    }, [selectedRow])

    const updateRow = async (data) => {
        if (!selectedRow) return
        try {
            await updateTeachingHour(data)
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


    return (
        <>
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
                            {[
                                { name: "grade", label: "שכבה", component: Dropdown, options: grades },
                                { name: "equivalent", label: "מקבילה", component: InputNumber },
                                { name: "studentsAllocation", label: "מספר תלמידים", component: InputNumber, props: { min: 4, max: 15 } },
                                { name: "classType", label: "סוג כיתה", component: Dropdown, options: classes },
                                {
                                    name: "source", label: "מקור", component: Dropdown, options: source, props: {
                                        onChange: (e) => {
                                            setValue('source', e.value)
                                            setValue('designation', '')
                                        }
                                    }
                                },
                                { name: "designation", label: "ייעוד", component: Dropdown, options: availableDesignations },
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
        </>
    )
}