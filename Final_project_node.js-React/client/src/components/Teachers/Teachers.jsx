import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import axios from 'axios';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:8888/api/teachersDetails');
        setTeachers(res.data);
      } catch (err) {
        console.error('שגיאה בקבלת רשימת המורים:', err);
      }
    };
    fetchTeachers();
  }, []);

  const openDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setVisible(true);
  };

  const itemTemplate = (teacher) => {
    return (
      <div className="p-3 border-bottom" style={{ textAlign: 'right' }}>
        <h4
          style={{ cursor: 'pointer', color: '#007ad9' }}
          onClick={() => openDetails(teacher)}
        >
          {teacher.name}
        </h4>
        {teacher.HourOfTeacher && teacher.HourOfTeacher.length > 0 ? (
          <p>מוסד חינוכי: {teacher.HourOfTeacher[0]?.Institution?.institutionName || 'לא ידוע'}</p>
        ) : (
          <p>ללא שיוך מוסד חינוכי</p>
        )}
      </div>
    );
  };

  const renderDetails = () => {
    if (!selectedTeacher) return null;

    return (
      <Card title={selectedTeacher.name} subTitle={`שם משתמש: ${selectedTeacher.username}`} style={{ direction: 'rtl' }}>
        <p><strong>דוא״ל:</strong> {selectedTeacher.email}</p>
        <p><strong>תפקיד:</strong> {selectedTeacher.rolse}</p>
        <p><strong>פעיל:</strong> {selectedTeacher.active ? 'כן' : 'לא'}</p>
        <p><strong>מורה:</strong> {selectedTeacher.isTeacher ? 'כן' : 'לא'}</p>
        <div>
          <strong>שעות הוראה:</strong>
          <ul>
            {selectedTeacher.HourOfTeacher.map((hour, index) => (
              <li key={index}>
                מוסד: {hour.Institution?.institutionName || hour.Institution} | שעות שילוב: {hour.integrationhours} | סל אישי: {hour.personalbasket}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    );
  };

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h2>רשימת מורים</h2>
      <DataView value={teachers} itemTemplate={itemTemplate} />

      <Dialog
        header="פרטי מורה"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: '50vw', direction: 'rtl' }}
      >
        {renderDetails()}
      </Dialog>
    </div>
  );
};

export default TeachersList;
