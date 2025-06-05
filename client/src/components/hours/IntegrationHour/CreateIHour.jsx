import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { createIntegrationHour } from '../../../services/hours/iHourService'
import { getAllInstitutions } from '../../../services/InstitutionService'
import { useSelector } from 'react-redux'
import { Toast } from 'primereact/toast';
import { useRef } from 'react';



export default function CreateIHour({ icreateVisible, setIcreateVisible, onSuccess }) {
    const [institutions, setInstitutions] = useState([])
    const { role } = useSelector((state) => state.token)
    const toast = useRef(null)
    const { control, handleSubmit, reset } = useForm({
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
    const designation = [
        { label: '19 - ניהול', value: '19 - ניהול' },
        { label: '21 - שעות הכנה', value: '21 - שעות הכנה' },
        { label: '24 - מקדמות', value: '24 - מקדמות' },
        { label: '27 - פרא רפואי', value: '27 - פרא רפואי' }
    ]

    const createHour = async (data) => {
        try {
            await createIntegrationHour(data)
            reset()
            setIcreateVisible(false)
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
                visible={icreateVisible}
                modal
                style={{ width: '30vw', direction: 'rtl' }}
                onHide={() => {
                    if (!icreateVisible) return;
                    setIcreateVisible(false);
                }}
            >
                {role === 'Supervisor' ? (
                    <div className="p-4">
                        <h3 className="dialog-title">
                            יצירת שעות שילוב
                        </h3>

                        <form onSubmit={handleSubmit(createHour)} className="p-fluid .small-input">
                            {[
                                { name: "institution", label: "שם מוסד", component: Dropdown, options: institutions },
                                { name: "source", label: "מקור", component: Dropdown, options: [{ label: '49 - סל שילוב והכלה', value: '49 - סל שילוב והכלה' }] },
                                { name: "designation", label: "ייעוד", component: Dropdown, options: designation },
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