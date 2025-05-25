import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/userService';
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
import { Checkbox } from "primereact/checkbox";
import axios from 'axios';
export default function Users() {
    let emptyUser = {
        _id: '',
        name: '',
        password: '',
        username: '',
        role: 'teacher',
        isTeacher: false,
        active: false,
        email: '@'
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
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('שגיאה בקבלת משתמשים:', error);
            }
        };

        fetchData();
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
            // כאן תחליט אם ליצור חדש או לעדכן
            if (user._id) {
                // עדכון
                await updateUser(user);
            } else {
                // יצירה חדשה
                await createUser(user);
            }

            toast.current.show({ severity: 'success', summary: 'הצלחה', detail: 'המשתמש נשמר', life: 3000 });
            setUserDialog(false); // סגירת הדיאלוג
            //loadUsers(); // רענון הרשימה (אם יש)
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

    const deleteuser = () => {
        let _users = users.filter((val) => val.id !== user.id);

        setUsers(_users);
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
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

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

    /*const onCategoryChange = (e) => {
        let _user = { ...user };

        _user['category'] = e.value;
        setUser(_user);
    };*/

    const onInputChange = (e, name) => {
        // const val = (e.target && e.target.value) || '';
        // let _user = { ...user };

        // _user[`${name}`] = val;

        // setUser(_user);
        const val = e.target.value;
        setUser(prevUser => ({ ...prevUser, [name]: val }));

    };

    /*const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = { ...user };

        _user[`${name}`] = val;

        setUser(_user);
    };*/

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2" >
                <Button label="חדש" icon="pi pi-plus" severity="success" onClick={openNew} style={{ margin: '0.5rem' }} />
                <Button label="מחיקה" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedusers || !selectedusers.length} style={{ margin: '0.5rem' }} />
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
        return <Tag value={rowData.role} severity={getSeverity(rowData)}></Tag>;
    }
    

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteuser(rowData)} />
            </React.Fragment>
        );
    };

   const getSeverity = (user) => {
        switch (user.role) {
            case 'Supervisor':
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
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteuser} />
        </React.Fragment>
    );
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedusers} />
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
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {/* <Column field="id" header="מזהה" style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="username" header="שם משתמש" style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="שם" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="מייל" body={emailBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="rolse" header="תפקיד" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="active" header="פעיל" sortable style={{ minWidth: '10rem' }}></Column>
                    {/*<Column field="HourOfTeacher" header="מערכת" sortable style={{ minWidth: '10rem' }}></Column>*/}
                    <Column field="role" header="תפקיד" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> 
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
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
                <div className="card flex justify-content-center"> פעיל
                    <Checkbox onChange={e => setCheckedp(e.checked)} checked={checkedp}>  </Checkbox>
                </div>
                {!user._id && (
                    <div className="field">
                        <label htmlFor="password" className="font-bold">
                            סיסמה
                        </label>
                        <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required className={classNames({ 'p-invalid': submitted && !user.password })} />
                        {submitted && !user.password && <small className="p-error">סיסמה חובה</small>}
                    </div>
                )}

                {/* <div className="card flex justify-content-center"> מורה    
                    <Checkbox value={user.isTeacher} onChange={e => setCheckedm(e.checked)} checked={checkedm}>  </Checkbox> 
                </div> */}

            </Dialog >

            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.name}</b>?
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



