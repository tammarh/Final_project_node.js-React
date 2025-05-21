


import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';

export default function CustomDemo() {
    const startContent = (
        <React.Fragment>
            <img
                src="/fruit.jpg"
                alt="Logo"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex align-items-center gap-2">
            <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '40px',
                letterSpacing: '1px',
                margin: '1rem'
            }}>
                החינוך המיוחד של החינוך העצמאי
            </span>
            </div>
            );

            const endContent = (
            <React.Fragment>
                <div className="flex flex-wrap align-items-center gap-3">
                    <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                        <i className="pi pi-home text-6xl " style={{ color: 'white', fontSize: '1.5rem', margin: '1rem' }}></i>
                    </button>
                    <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                        <i className="pi pi-user text-6xl" style={{ color: 'white', fontSize: '1.5rem', margin: '1rem' ,marginLeft:'2rem' }}></i>
                    </button>

                </div>
            </React.Fragment>
            );

            return (
            <div className="card">
                <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, #a8e6a1, #81c784)', margin: '1rem' }} />
            </div>
            );
}

