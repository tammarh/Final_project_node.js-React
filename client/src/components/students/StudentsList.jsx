import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import AddBasketStudentForm from './AddStudentForm';
import axios from 'axios';

const BasketStudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedSortField, setSelectedSortField] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);


    const sortOptions = [
        { label: 'שם', value: 'name' },
        { label: 'עיר', value: 'city' },
        { label: 'מוגבלות', value: 'disability' },
    ];

    // useEffect(() => {
    //     const fetchStudents = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:8888/api/PersonalBasketStudent');
    //             setStudents(res.data);
    //         } catch (error) {
    //             console.error("Failed to fetch students:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchStudents();
    // }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8888/api/PersonalBasketStudent');
            setStudents(res.data);
        } catch (error) {
            console.error('שגיאה בשליפת נתונים', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleStudentAdded = () => {
        setShowAddForm(false);
        fetchStudents(); 
    };



    const renderEntitlements = (rowData) => {
        return (
            <div className="flex flex-wrap gap-2 mt-2">
                {rowData.entitlementHours.map((ent, index) => (
                    <Tag key={index} value={`${ent.type} (${ent.hours} ש')`} severity="info" />
                ))}
            </div>
        );
    };

    const handleSortChange = async (field) => {
        setSelectedSortField(field);
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8888/api/PersonalBasketStudent/sortby?sortBy=${field}`);
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch sorted students:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderStudentDetailsCard = (student) => {
        const { Id, name, city, disability, grade, hour } = student.details;
        return (
            <Card
                style={{ direction: 'rtl', textAlign: 'right', backgroundColor: '#f9f9f9' }}
                title={`פרטי תלמיד: ${name}`}
            >
                <p><strong>ת״ז:</strong> {Id}</p>
                <p><strong>שם:</strong> {name}</p>
                <p><strong>עיר:</strong> {city}</p>
                <p><strong>כיתה:</strong> {grade}</p>
                <p><strong>שעות:</strong> {hour}</p>
                <p><strong>מוגבלות:</strong> {disability}</p>
                <div><strong>זכאויות:</strong> {renderEntitlements(student)}</div>
            </Card>
        );
    };

    const rowExpansionTemplate = (rowData) => {
        return (
            <div className="p-3">
                {renderStudentDetailsCard(rowData)}
            </div>
        );
    };

    return (
        <div className="p-4" dir="rtl">
            <h2 className="text-right mb-4">תלמידים בסל אישי</h2>

            <div className="flex justify-end mb-4">
                <Dropdown
                    value={selectedSortField}
                    options={sortOptions}
                    onChange={(e) => handleSortChange(e.value)}
                    placeholder="מיין לפי"
                    className="w-52"
                />
            </div>

            <div className="flex justify-end mb-3">
                <Button label="הוסף תלמיד חדש" icon="pi pi-user-plus" onClick={() => setShowAddForm(true)} />
            </div>

            <DataTable
                value={students}
                dataKey="_id"
                loading={loading}
                paginator rows={5}
                responsiveLayout="scroll"
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
            >
                {/* <Column expander style={{ width: '3rem' }} /> */}

                <Column header="שם" body={rowData => rowData.details.name} style={{ textAlign: 'right' }} />
                <Column header="עיר" body={rowData => rowData.details.city} style={{ textAlign: 'right' }} />
                <Column header="מוגבלות" body={rowData => rowData.details.disability} style={{ textAlign: 'right' }} />

                <Column
                    header="פרטים"
                    body={(rowData) => {
                        const isExpanded = expandedRows?.some((r) => r._id === rowData._id);
                        return (
                            <Button
                                label={isExpanded ? "הסתר פרטים" : "הצג פרטים"}
                                className="p-button-text p-button-sm"
                                onClick={() => {
                                    setExpandedRows((prev) =>
                                        isExpanded
                                            ? prev.filter((r) => r._id !== rowData._id)
                                            : [...prev, rowData]
                                    );
                                }}
                            />
                        );
                    }}
                    style={{ textAlign: 'center', width: '8rem' }}
                />
            </DataTable>

            <Dialog
                header="הוספת תלמיד חדש"
                visible={showAddForm}
                onHide={() => setShowAddForm(false)}
                style={{ width: '40vw' }}
                modal
            >
                <AddBasketStudentForm onStudentAdded={handleStudentAdded} />
            </Dialog>

        </div>
    );
};

export default BasketStudentsTable;
