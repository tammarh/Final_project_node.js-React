import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import axios from 'axios';

const disabilities = [
    'לקויי למידה', 'הפרעות התנהגות', 'עיכוב התפתחותי', 'עיכוב התפתחותי שפתי',
    'הפרעות נפשיות', 'ASD תקדורת', 'לקויי ראיה', 'לקויי שמיעה', 'נכויות פיזיות', 'מחלות נדירות'
];

const grades = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];

const entitlementTypes = [
    'קלינאית תקשורת', 'מרפאה בעיסוק', 'מטפלת באומנות'
];

const AddBasketStudentForm = ({ onStudentAdded }) => {
    const [details, setDetails] = useState({
        Id: '', name: '', city: '', disability: '', grade: '', hour: 0
    });

    const [entitlements, setEntitlements] = useState([
        { type: '', hours: 0 }
    ]);

    const [institutionId, setInstitutionId] = useState('');

    const handleEntitlementChange = (index, field, value) => {
        const newEntitlements = [...entitlements];
        newEntitlements[index][field] = value;
        setEntitlements(newEntitlements);
    };

    const addEntitlementRow = () => {
        setEntitlements([...entitlements, { type: '', hours: 0 }]);
    };
        

    const handleSubmit = async () => {
        try {
            const student = {
                institution: institutionId,
                details: {
                  Id: details.Id,
                  name: details.name,
                  city: details.city,
                  disability: details.disability,
                  grade: details.grade,
                  hour: details.hour,
                },
                entitlementHours: entitlements 
                        };
            await axios.post('http://localhost:8888/api/PersonalBasketStudent', student);
            setDetails({ Id: '', name: '', city: '', disability: '', grade: '', hour: 0 });
            setEntitlements([{ type: '', hours: 0 }]);
            setInstitutionId('');
            if (onStudentAdded) onStudentAdded();
        } catch (err) {
            console.error("Failed to add student:", err);
        }
    };

    return (
        <div className="p-4 surface-card shadow-2 border-round" dir="rtl">
            <h3>הוספת תלמיד חדש</h3>

            <div className="grid">
                <div className="col-12 md:col-6">
                    <label>מוסד</label>
                    <InputText value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} className="w-full" />
                </div>
                <div className="col-12 md:col-6">
                    <label>ת.ז</label>
                    <InputText value={details.Id} onChange={(e) => setDetails({ ...details, Id: e.target.value })} className="w-full" />
                </div>
                <div className="col-12 md:col-6">
                    <label>שם</label>
                    <InputText value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="w-full" />
                </div>
                <div className="col-12 md:col-6">
                    <label>עיר</label>
                    <InputText value={details.city} onChange={(e) => setDetails({ ...details, city: e.target.value })} className="w-full" />
                </div>
                <div className="col-12 md:col-6">
                    <label>מוגבלות</label>
                    <Dropdown value={details.disability} options={disabilities} onChange={(e) => setDetails({ ...details, disability: e.value })} className="w-full" />
                </div>
                <div className="col-12 md:col-3">
                    <label>כיתה</label>
                    <Dropdown value={details.grade} options={grades} onChange={(e) => setDetails({ ...details, grade: e.value })} className="w-full" />
                </div>
                <div className="col-12 md:col-3">
                    <label>שעות</label>
                    <InputNumber value={details.hour} onValueChange={(e) => setDetails({ ...details, hour: e.value })} className="w-full" />
                </div>
            </div>

            <h4>זכאויות</h4>
            {entitlements.map((ent, index) => (
                <div className="grid align-items-center" key={index}>
                    <div className="col-6">
                        <Dropdown value={ent.type} options={entitlementTypes} onChange={(e) => handleEntitlementChange(index, 'type', e.value)} placeholder="בחר סוג" className="w-full" />
                    </div>
                    <div className="col-4">
                        <InputNumber value={ent.hours} onValueChange={(e) => handleEntitlementChange(index, 'hours', e.value)} placeholder="שעות" className="w-full" />
                    </div>
                </div>
            ))}
            <Button label="הוסף סוג זכאות" icon="pi pi-plus" onClick={addEntitlementRow} className="p-button-text mt-2" />

            <div className="mt-4">
                <Button label="הוסף תלמיד" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default AddBasketStudentForm;
