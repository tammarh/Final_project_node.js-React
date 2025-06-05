import React, { useEffect, useState, useRef } from 'react'
import { getAllInstitutions } from '../../services/InstitutionService'
import { Toast } from 'primereact/toast'
import { updateUser } from '../../services/userService'

export default function SimpleTeacherHoursDialog({ visible, setShowHoursDialog, user, setUser, loadUsers }) {
    const [institutions, setInstitutions] = useState([]);
    const toast = useRef(null);

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

    const saveHours = async () => {
        try {
            const cleanedUser = {
                ...user,
                HourOfTeacher: user.HourOfTeacher.map(row => ({
                    ...row,
                    institutionId: row.institutionId || '',
                    integrationhours: row.integrationhours === '' ? null : row.integrationhours,
                    personalbasket: row.personalbasket === '' ? null : row.personalbasket,
                    additionforpersonalbasket: row.additionforpersonalbasket === '' ? null : row.additionforpersonalbasket,
                })),
            }            
            await updateUser(cleanedUser);
            toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'השעות עודכנו', life: 3000 });
            await loadUsers();
            setShowHoursDialog(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'שגיאה בעדכון השעות', life: 3000 });
            console.error(error);
        }
    };

    const updateField = (value, rowIndex, field) => {
        const updated = [...user.HourOfTeacher];
        updated[rowIndex] = { ...updated[rowIndex], [field]: value };
        setUser({ ...user, HourOfTeacher: updated });
    };

    const addNewRow = () => {
        const newRow = {
            institutionId: '',             
            integrationhours: null,
            personalbasket: null,
            additionforpersonalbasket: null,
            education: false,
            firstgradeeducation: false
        };
        setUser({ ...user, HourOfTeacher: [...(user.HourOfTeacher || []), newRow] });
    };

    if (!visible) return null;

    return (
        <div>
            <Toast ref={toast} />
            <div className="dialog-overlay">
                <div className="dialog-box">
                    <h2>מערכת שעות</h2>
                    <button onClick={addNewRow}>➕ הוסף שעות למוסד</button>

                    <table className="hours-table">
                        <thead>
                            <tr>
                                <th>מוסד</th>
                                <th>שעות שילוב</th>
                                <th>סל אישי</th>
                                <th>תוספת סל אישי</th>
                                <th>חינוך</th>
                                <th>חינוך כיתה א</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(user.HourOfTeacher || []).map((row, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <select
                                            value={row.institutionId}
                                            onChange={e => updateField(e.target.value, idx, 'institutionId')}
                                        >
                                            <option value="">בחר מוסד</option>
                                            {institutions.map(inst => (
                                                <option key={inst.value} value={inst.value}>
                                                    {inst.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={row.integrationhours ?? ''}
                                            onChange={e => updateField(e.target.value === '' ? null : Number(e.target.value), idx, 'integrationhours')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={row.personalbasket ?? ''}
                                            onChange={e => updateField(e.target.value === '' ? null : Number(e.target.value), idx, 'personalbasket')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={row.additionforpersonalbasket ?? ''}
                                            onChange={e => updateField(e.target.value === '' ? null : Number(e.target.value), idx, 'additionforpersonalbasket')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={!!row.education}
                                            onChange={e => updateField(e.target.checked, idx, 'education')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={!!row.firstgradeeducation}
                                            onChange={e => updateField(e.target.checked, idx, 'firstgradeeducation')}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="dialog-actions">
                        <button onClick={() => setShowHoursDialog(false)}>ביטול</button>
                        <button onClick={saveHours}>שמור</button>
                    </div>
                </div>

                <style>{`
          .dialog-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .dialog-box {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 80%;
            max-height: 90vh;
            overflow-y: auto;
          }
          .hours-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }
          .hours-table th, .hours-table td {
            border: 1px solid #ccc;
            padding: 0.5rem;
            text-align: center;
          }
          .dialog-actions {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
          }
        `}</style>
            </div>
        </div>
    );
}
