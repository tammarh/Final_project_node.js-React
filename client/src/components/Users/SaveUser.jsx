import React, { useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { updateUser, createUser } from '../../services/userService'
import { Toast } from 'primereact/toast'
import { RadioButton } from 'primereact/radiobutton'
import { classNames } from 'primereact/utils';

export default function SaveUser({ user, setUser, setSubmitted, submitted, UserDialog, setUserDialog, ingredient, setIngredient, loadUsers }) {
    const toast = useRef(null);

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }
    const onInputChange = (e, name) => {
        const val = e.target.value;
        setUser(prevUser => ({ ...prevUser, [name]: val }));

    };
    const saveuser = async () => {
        setSubmitted(true)
        try {
            if (user._id) {
                await updateUser(user);
            } else {
                await createUser(user);
            }
            setUserDialog(false); // סגירת הדיאלוג
            setIngredient('')
            await loadUsers()
            toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'המשתמש נשמר', life: 3000 });

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'קרתה תקלה בשמירה', life: 3000 });
            console.error(error);
        }
    }
    const UserDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveuser} />
        </React.Fragment>
    )
    return (
        <>
            <Toast ref={toast} />
            <Dialog visible={UserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="פרטי משתמש" modal className="p-fluid" footer={UserDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="username" className="font-bold">
                        שם משתמש
                    </label>
                    <InputText id="username" value={user.username} onChange={(e) => onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.username })} />
                    {submitted && !user.username && <small className="p-error">שם משתמש חובה</small>}
                </div>

                <div className="field">
                    <label htmlFor="password" className="font-bold">
                        סיסמה
                    </label>
                    <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required className={classNames({ 'p-invalid': submitted && !user.password })} />
                    {submitted && !user.password && <small className="p-error">סיסמה חובה</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם
                    </label>
                    <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
                    {submitted && !user.name && <small className="p-error">שם חובה</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        מייל
                    </label>
                    <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                    {submitted && !user.email && <small className="p-error">מייל חובה</small>}
                </div>
                {/* <div className="card flex justify-content-center"> פעיל
                            <Checkbox id='active' value={user.active} onChange={e => setCheckedp(e.checked)} checked={checkedp}>  </Checkbox>
                        </div> */}


                {/* <div className="card flex justify-content-center"> מורה
                            <Checkbox value={user.isTeacher} onChange={e => setCheckedm(e.checked)} checked={checkedm}>  </Checkbox>
                        </div> */}
                <div className="flex flex-wrap gap-3"> תפקיד
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="teacher"
                            value="teacher"
                            onChange={(e) => {
                                setIngredient(e.value);
                                setUser(prev => ({ ...prev, rolse: e.value }));
                            }}
                            checked={ingredient === 'teacher'}
                        />                        <label htmlFor="ingredient1" className="ml-2">מורה</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="supervisor"
                            value="Supervisor"
                            onChange={(e) => {
                                setIngredient(e.value);
                                setUser(prev => ({ ...prev, rolse: e.value }));
                            }}
                            checked={ingredient === 'Supervisor'}
                        />
                        <label htmlFor="ingredient2" className="ml-2">מפקחת</label>


                    </div>
                </div>

            </Dialog >

        </>
    )
}