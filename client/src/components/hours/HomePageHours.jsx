
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion'
import TeachingHours from './TeachingHour/TeachingHours'
import IntegrationHours from './IntegrationHour/IntegrationHours'
import PersonalBasketHours from './PersonalBasketHour/PersonalBasketHours'
import { InputText } from 'primereact/inputtext'
import { InputIcon } from 'primereact/inputicon'
import { IconField } from 'primereact/iconfield'
import { Button } from 'primereact/button'
import '../hours/hours.css'
import CreateIHour from './IntegrationHour/CreateIHour'
import CreateTHour from './TeachingHour/CreateTHour'
import CreatePHour from './PersonalBasketHour/CreatePHour'
export default function HomePage() {
    const [globalFilter, setGlobalFilter] = useState(null)
    const [icreateVisible, setIcreateVisible] = useState(false)
    const [tcreateVisible, setTcreateVisible] = useState(false)
    const [pcreateVisible, setPcreateVisible] = useState(false)
    const [reloadIHours, setReloadIHours] = useState(false);
    const triggerReloadIHours = () => setReloadIHours(prev => !prev)

    return (<>
        <div className="flex justify-content-end align-items-center" style={{ width: '180px' ,margin: '1.5rem' }}>
            <h4 className="m-0" ></h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש" className="p-inputtext-sm"   />
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
                    <IntegrationHours globalFilter={globalFilter} reload={reloadIHours} />
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

            <CreateIHour icreateVisible={icreateVisible} setIcreateVisible={setIcreateVisible} onSuccess={triggerReloadIHours} />
            <CreateTHour tcreateVisible={tcreateVisible} setTcreateVisible={setTcreateVisible} onSuccess={triggerReloadIHours} />
            <CreatePHour pcreateVisible={pcreateVisible} setPcreateVisible={setPcreateVisible} onSuccess={triggerReloadIHours} />
        </div>
    </>


    )
}
