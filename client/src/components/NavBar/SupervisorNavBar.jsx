
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate  } from 'react-router-dom';

export default function BasicDemo() {
    const navigate = useNavigate();
    const items = [
        { label: ' תלמידים ', icon: 'pi pi-users', command: () => navigate('/Students') },
    { label: ' שעות ', icon: 'pi pi-clock', command: () => navigate('/Hours') },
    { label: ' מורות ', icon: 'pi pi-user', command: () => navigate('/Teachers') },
    { label: ' פילוחי תמיכות ', icon: 'pi pi-inbox', command: () => navigate('/SupportAllocation')}
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}
        