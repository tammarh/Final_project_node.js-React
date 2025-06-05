import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useForm, Controller } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { updateIntegrationHour } from '../../../services/hours/iHourService'


export default function UpdateIHour({ updateVisible, selectedRow, setVisible, setUpdateVisible, loudData }) {
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
    const designation = [
        { label: '19 - ניהול', value: '19 - ניהול' },
        { label: '21 - שעות הכנה', value: '21 - שעות הכנה' },
        { label: '24 - מקדמות', value: '24 - מקדמות' },
        { label: '27 - פרא רפואי', value: '27 - פרא רפואי' }
    ]
    const updateRow = async (data) => {
        if (!selectedRow) return
        try {
            console.log(data);

            await updateIntegrationHour(data)
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
    useEffect(() => {
        if (selectedRow) {
            reset({
                ...selectedRow,
                fromDate: selectedRow.fromDate ? new Date(selectedRow.fromDate) : null,
                untilDate: selectedRow.untilDate ? new Date(selectedRow.untilDate) : null,
            });
        }
    }, [selectedRow]);
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
                            עדכון שעות שילוב ל־{selectedRow.institution.institutionName}
                        </h3>

                        <form onSubmit={handleSubmit(updateRow)} className="p-fluid .small-input">
                            {[
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