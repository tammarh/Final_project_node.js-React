
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { useSelector } from 'react-redux';


export default function BasicDemo() {
    const { role } = useSelector((state) => state.token)
    const navigate = useNavigate();
    const items = [
        { label: ' מוסדות ', icon: 'pi pi-users', command: () => navigate('/Institution') },
        { label: ' תלמידים ', icon: 'pi pi-users', command: () => navigate('/Students') },
        role === "teacher" ? { label: ' מערכת ', icon: 'pi pi-users', command: () => navigate('/TeacherHours') } : { label: ' משתמשים ', icon: 'pi pi-users', command: () => navigate('/Users') },
        role === "Supervisor" ? { label: ' שעות ', icon: 'pi pi-clock', command: () => navigate('/Hours') } : {},
        role === "Supervisor" ? { label: ' מורות ', icon: 'pi pi-user', command: () => navigate('/Teachers') } : {},
        role === "Supervisor" ? { label: ' פילוחי תמיכות ', icon: 'pi pi-inbox', command: () => navigate('/SupportAllocation') } : {},
    ];

    return (
        <div className="card" style={{ margin: '1.5rem' }}>
            <Menubar model={items} className="custom-menubar" />
        </div>)
}


