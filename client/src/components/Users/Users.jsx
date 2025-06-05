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
import TeacherHoursDialog from '../Users/TeacherHoursDialog';
import SaveUser from './SaveUser'

export default function Users() {
    let emptyUser = {
        _id: '',
        name: '',
        password: '',
        username: '',
        rolse: 'teacher',
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
    const [showHoursDialog, setShowHoursDialog] = useState(false);
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

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

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
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const openHoursDialog = (rowData) => {
        setUser({ ...rowData });
        setIngredient(rowData.rolse);
        setShowHoursDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2" >
                <Button label="חדש" icon="pi pi-plus" severity="success" onClick={openNew} style={{ margin: '0.5rem' }} />
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
    }

    const emailBodyTemplate = (rowData) => {
        return formatCurrency(rowData.email);
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.rolse} severity={getSeverity(rowData)}></Tag>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} style={{ marginLeft: '2rem' }} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteuser(rowData)} style={{ marginLeft: '2rem' }} />
                {rowData.rolse === 'teacher' && <Button icon="pi pi-calendar-plus" rounded outlined severity="success" onClick={() => openHoursDialog(rowData)} />}
            </React.Fragment>
        );
    }

    const ButtonBodyTemplate = (rowData) => {
        const op = useRef(null)

        const getDitails = (e) => {
            op.current.toggle(e)
        }
        return (

            <div className="card flex justify-content-center">
                {rowData.rolse === 'teacher' && (<Button type="button" label="מערכת שעות" onClick={getDitails} />)}
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
                        <Column field="education" header="חינוך"
                            body={(rowData) => (rowData.education ? '✔️' : '')} style={{ textAlign: 'center' }}></Column>
                        <Column field="firstgradeeducation" header="חינוך כיתה א"
                            body={(rowData) => (rowData.education ? '✔️' : '')} style={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </OverlayPanel>
            </div >
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
    }

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteduser} />
        </React.Fragment>
    )

    return (
        <div>
            <Toast ref={toast} />
            <div className="card" style={{ margin: '1.5rem' }}>
                <Toolbar className="mb-4" right={leftToolbarTemplate} left={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={users} selection={selectedusers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                    dataKey="id" paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" globalFilter={globalFilter} >
                    <Column field="username" header="שם משתמש" style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="name" header="שם" sortable style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="email" header="מייל" body={emailBodyTemplate} sortable style={{ minWidth: '8rem', textAlign: 'right' }}></Column>
                    <Column body={ButtonBodyTemplate} header="מערכת" exportable={false} style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column field="rolse" header="תפקיד" body={statusBodyTemplate} sortable style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem', textAlign: 'right' }}></Column>
                </DataTable>
            </div>

            <SaveUser user={user}
                setUser={setUser}
                loadUsers={loadUsers}
                submitted={submitted}
                setSubmitted={setSubmitted}
                UserDialog={UserDialog}
                setUserDialog={setUserDialog}
                ingredient={ingredient}
                setIngredient={setIngredient} />

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

            <TeacherHoursDialog
                visible={showHoursDialog}
                //onHide={() => setShowHoursDialog(false)}
                user={user}
                setUser={setUser}
                ingredient={ingredient}
                setIngredient={setIngredient}
                loadUsers={loadUsers}
                setShowHoursDialog={setShowHoursDialog}
            />

        </div>
    );
}