
import React ,{useState}from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import TeachingHours from './TeachingHours'
import IntegrationHours from './IntegrationHours'
import PersonalBasketHours from './PersonalBasketHours'
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';

export default function BasicDemo() {
        const [globalFilter, setGlobalFilter] = useState(null)
    return (<>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                    <h4 className="m-0" ></h4>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש" />
                    </IconField>
                </div>
        <div className="card" style={{ margin: '1.5rem' }}>
            <Accordion activeIndex={0}>
                <AccordionTab header="שעות הוראה">
                    <TeachingHours globalFilter={globalFilter}/>
                </AccordionTab>
                <AccordionTab header="שעות שילוב">
                    <IntegrationHours globalFilter={globalFilter}/>
                </AccordionTab>
                <AccordionTab header="שעות סל אישי">
                    <PersonalBasketHours globalFilter={globalFilter}/>
                </AccordionTab>
            </Accordion>
        </div></>
    )
}
