
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';


export default function BasicDemo() {
    const navigate = useNavigate();
    const orangeStyle = {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginLeft: '2rem'
    };
    const items = [
        { label: ' תלמידים ', icon: 'pi pi-users', command: () => navigate('/Students') },
        { label: ' שעות ', icon: 'pi pi-clock', command: () => navigate('/Hours') },
        { label: ' מורות ', icon: 'pi pi-user', command: () => navigate('/Teachers') },
        { label: ' פילוחי תמיכות ', icon: 'pi pi-inbox', command: () => navigate('/SupportAllocation') },
    ];

    return (
        <div className="card" style={{margin:'1.5rem'}}>
            <Menubar model={items} className="custom-menubar"/>
        </div>)
}


