import React, { useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { useForm, Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { updatePersonalBasketHours } from '../../../services/hours/pHourService'


export default function UpdatePHour({ updateVisible, setUpdateVisible, selectedRow, setVisible, loudData }) {

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
    })
    const source = [
        { label: '24 - סל שילוב - מתיא', value: '24 - סל שילוב - מתיא' },
        { label: '55 - הנחיית צוות המוס"ח', value: '55 - הנחיית צוות המוס"ח' }
    ]


    const designationMap = {
        '24 - סל שילוב - מתיא': [
            { label: '1 - תוכניות לימודים', value: '1 - תוכניות לימודים' },
            { label: '27 - פרא רפואי', value: '27 - פרא רפואי' },
            { label: '28 - לקות שמיעה', value: '28 - לקות שמיעה' },
            { label: '30 - לקות ראיה', value: '30 - לקות ראיה' }
        ],
        '55 - הנחיית צוות המוס"ח': [
            { label: '1 - תוכניות למודים', value: '1 - תוכניות לימודים' },
            { label: '21 - שעות הכנה', value: '21 - שעות הכנה' }
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
    return (
        <><Dialog
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