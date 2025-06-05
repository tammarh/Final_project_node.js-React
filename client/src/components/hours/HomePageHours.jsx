
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import TeachingHours from './TeachingHour/TeachingHours'
import IntegrationHours from './IntegrationHour/IntegrationHours'
import PersonalBasketHours from './PersonalBasketHours'
import { InputText } from 'primereact/inputtext';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield'
import { Button } from 'primereact/button'
import '../hours/hours.css'
import CreateIHour from './IntegrationHour/CreateIHour'
import CreateTHour from './TeachingHour/CreateTHour'
export default function HomePage() {
    const [globalFilter, setGlobalFilter] = useState(null)
    const [icreateVisible, setIcreateVisible] = useState(false)
    const [tcreateVisible, setTcreateVisible] = useState(false)
    const [pcreateVisible, setPcreateVisible] = useState(false)
    const [reloadIHours, setReloadIHours] = useState(false);
    const triggerReloadIHours = () => setReloadIHours(prev => !prev);

    const handleAddNewTeachingHour = () => {
        console.log('ok')

    }

    return (<>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
            <h4 className="m-0" ></h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש" />
            </IconField>
        </div>
        <div className="card" style={{ margin: '1.5rem' }}>
            <Accordion multiple activeIndex={0}>
                <AccordionTab
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>שעות הוראה</span>
                            <Button
                                label="הוסף חדש"
                                className="p-button-text p-button-sm"
                                onClick={() => setTcreateVisible(true)}
                                style={{ marginRight: '1rem', fontWeight: 'bold' }}
                            />
                        </div>
                    }
                >

                    <TeachingHours globalFilter={globalFilter} />
                </AccordionTab>
                <AccordionTab
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>שעות שילוב</span>
                            <Button
                                label="הוסף חדש"
                                className="p-button-text p-button-sm"
                                onClick={() => setIcreateVisible(true)}
                                style={{ marginRight: '1rem', fontWeight: 'bold' }}
                            />
                        </div>
                    }
                >
                    <IntegrationHours globalFilter={globalFilter} reload={reloadIHours}/>
                </AccordionTab>
                <AccordionTab
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>שעות סל אישי</span>
                            <Button
                                label="הוסף חדש"
                                className="p-button-text p-button-sm"
                                onClick={() => setPcreateVisible(true)}
                                style={{ marginRight: '1rem', fontWeight: 'bold' }}
                            />
                        </div>
                    }
                >
                    <PersonalBasketHours globalFilter={globalFilter} />
                </AccordionTab>
            </Accordion>

            <CreateIHour icreateVisible={icreateVisible} setIcreateVisible={setIcreateVisible} onSuccess={triggerReloadIHours}/>
            <CreateTHour tcreateVisible={tcreateVisible} setTcreateVisible={setTcreateVisible} onSuccess={triggerReloadIHours}/>
        </div>
    </>


    )
}
