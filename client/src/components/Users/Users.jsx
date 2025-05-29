import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/userService';
import React, { useState, useEffect, useRef, act } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { OverlayPanel } from 'primereact/overlaypanel';
import axios from 'axios';

export default function Users() {
    let emptyUser = {
        _id: '',
        name: '',
        password: '',
        username: '',
        role: 'teacher',
        //isTeacher: false,
        active: false,
        email: '@',
        HourOfTeacher: []
    };
    const [users, setUsers] = useState([]);
    const [UserDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedusers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [checkedp, setCheckedp] = useState(false);
    const [checkedm, setCheckedm] = useState(false);
    const [ingredient, setIngredient] = useState('');
    const toast = useRef(null);
    const dt = useRef(null)

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('שגיאה בקבלת משתמשים:', error);
        }
    }
    useEffect(() => {
        loadUsers();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const saveuser = async () => {
        console.log(user);
        setSubmitted(true)


        try {
            if (user._id) {
                await updateUser(user);
            } else {
                await createUser(user);
            }
            toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'המשתמש נשמר', life: 3000 });
            setUserDialog(false); // סגירת הדיאלוג
            setIngredient('')
            await loadUsers()
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'שגיאה', detail: 'קרתה תקלה בשמירה', life: 3000 });
            console.error(error);
        }
    };



    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteuser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteduser = async () => {
        await deleteUser(user._id)
        await loadUsers()
        //setUsers(_users);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedusers = () => {
        let _users = users.filter((val) => !selectedusers.includes(val));

        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
    };



    const onInputChange = (e, name) => {
        const val = e.target.value;
        setUser(prevUser => ({ ...prevUser, [name]: val }));

    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2" >
                <Button label="חדש" icon="pi pi-plus" severity="success" onClick={openNew} style={{ margin: '0.5rem' }} />
                {/* <Button label="מחיקה" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedusers || !selectedusers.length} style={{ margin: '0.5rem' }} /> */}
                <Button label="הורדה" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} style={{ margin: '0.5rem' }} />;
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
            <h4 className="m-0" ></h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש" />
            </IconField>
        </div>
    };

    const emailBodyTemplate = (rowData) => {
        return formatCurrency(rowData.email);
    };



    const statusBodyTemplate = (rowData) => {
        // return <span>{rowData.rolse}</span>
        return <Tag value={rowData.rolse} severity={getSeverity(rowData)}></Tag>;
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} style={{ marginLeft: '2rem' }} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteuser(rowData)} style={{ marginLeft: '2rem' }} />
                {rowData.rolse === 'teacher' && <Button icon="pi pi-calendar-plus" rounded outlined severity="success" /*onClick={() => confirmDeleteuser(rowData)}*/ />}
            </React.Fragment>
        );
    }

    const ButtonBodyTemplate = (rowData) => {
        const op = useRef(null)

        const getDitails = (e) => {
            op.current.toggle(e); console.log(rowData.HourOfTeacher)
        }
        return (

            <div className="card flex justify-content-center">
                <Button type="button" label="מערכת שעות" onClick={getDitails} />
                <OverlayPanel ref={op}>
                    <DataTable value={rowData.HourOfTeacher} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="Institution" header="מוסד"></Column>
                        <Column field="integrationhours" header="שעות שילוב"></Column>
                        <Column field="personalbasket" header="סל אישי"></Column>
                        <Column field="additionforpersonalbasket" header="תוספת סל אישי"></Column>
                        <Column header="סך הכל" body={(row) =>
                            (row.integrationhours || 0) +
                            (row.personalbasket || 0) +
                            (row.additionforpersonalbasket || 0)
                        }></Column>
                        <Column field="education" header="חינוך"></Column>
                        <Column field="firstgradeeducation" header="חינוך כיתה א"></Column>
                    </DataTable>
                </OverlayPanel>
            </div>
        );
    }


    const getSeverity = (user) => {
        const rolse = user.rolse?.toLowerCase();

        switch (rolse) {
            case 'supervisor':
                return 'success';

            case 'teacher':
                return 'warning';

            default:
                return null;
        }
    };

    const UserDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {console.log(user)}

            <Button label="Save" icon="pi pi-check" onClick={saveuser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteduser} />
        </React.Fragment>
    );
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteSelectedusers} />

        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card" style={{ margin: '1.5rem' }}>
                <Toolbar className="mb-4" right={leftToolbarTemplate} left={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={users} selection={selectedusers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" globalFilter={globalFilter} >
                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    {/* <Column field="id" header="מזהה" style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="username" header="שם משתמש" style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="name" header="שם" sortable style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="email" header="מייל" body={emailBodyTemplate} sortable style={{ minWidth: '8rem', textAlign: 'right' }}></Column>
                    {/* <Column field="rolse" header="תפקיד" sortable style={{ minWidth: '10rem' }}></Column> */}
                    {/* <Column field="active" header="פעיל" sortable style={{ minWidth: '10rem' }}></Column> */}
                    <Column body={ButtonBodyTemplate} header="מערכת" exportable={false} style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="rolse" header="תפקיד" body={statusBodyTemplate} sortable style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                </DataTable>
            </div>

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

            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            למחוק את <b>{user.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteUsersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && <span>Are you sure you want to delete the selected users?</span>}
                </div>
            </Dialog>


        </div>
    );
}



