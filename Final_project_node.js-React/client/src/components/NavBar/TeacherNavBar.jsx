
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function BasicDemo() {
    const navigate = useNavigate();
    const items = [
        { label: ' תלמידים ', icon: 'pi pi-users', command: () => navigate('/Students') },
        { label: ' שעות ', icon: 'pi pi-clock', command: () => navigate('/Hours') },
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}




