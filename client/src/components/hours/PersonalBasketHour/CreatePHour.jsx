import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { createPersonalBasketHours } from '../../../services/hours/pHourService'
import { getAllInstitutions } from '../../../services/InstitutionService'
import { useSelector } from 'react-redux'
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


export default function CreatePHour({ pcreateVisible, setPcreateVisible, onSuccess }) {
    const [institutions, setInstitutions] = useState([])
    const { role } = useSelector((state) => state.token)
    const toast = useRef(null)
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
            { label: '1 - תוכנית למודים', value: '1 - תוכנית לימודים' },
            { label: '21 - שעות הכנה', value: '21 - שעות הכנה' }
        ]
    }

    const sourceValue = watch('source');
    const availableDesignations = designationMap[sourceValue] || [];
    useEffect(() => {
        getAllInstitutions()
            .then(data => {
                const formatted = data.map(inst => ({
                    label: inst.institutionName,
                    value: inst._id
                }));
                setInstitutions(formatted);
            })
            .catch(err => console.error('Institution fetch failed:', err));

    }, [])


    const createHour = async (data) => {
        try {
            await createPersonalBasketHours(data)
            reset()
            setPcreateVisible(false)
            if (onSuccess) onSuccess()

        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'שגיאה',
                    detail: error.response.data.message || 'אירעה שגיאה',
                    life: 4000
                });
                reset()
            } else {
                console.error("Error creating integration hour:", error);
            }
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                visible={pcreateVisible}
                modal
                style={{ width: '30vw', direction: 'rtl' }}
                onHide={() => {
                    if (!pcreateVisible) return;
                    setPcreateVisible(false);
                }}
            >
                {role === 'Supervisor' ? (
                    <div className="p-4">
                        <h3 className="dialog-title">
                            יצירת שעות סל אישי
                        </h3>

                        <form onSubmit={handleSubmit(createHour)} className="p-fluid .small-input">
                            {[
                                { name: "institution", label: "שם מוסד", component: Dropdown, options: institutions },
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
                                    label="שמור"
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