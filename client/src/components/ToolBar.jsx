import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCredentials } from '../redux/tokenSlice';
import { logOut } from '../redux/tokenSlice';
import axios from 'axios';
import { set, useForm } from "react-hook-form"

export default function CustomDemo() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.token)
    const [visible, setVisible] = useState(false)
    const [dvisible, setDVisible] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        const res = await axios.post('http://localhost:9999/api/auth/register', data)
        setDVisible(false)
    }

    const startContent = (
        <React.Fragment>
            <img
                src="/logo.png"
                alt="Logo"
                style={{ width: '50px', height: '50px' }}
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

    const logIn = async () => {

        try {
            const res = await axios.post('http://localhost:9999/api/auth/login', { username: userName, password })
            dispatch(setCredentials({ token: res.data.token, user: res.data.user, role: res.data.role }))
            if (res.status == 200) {
                console.log('access')
                setVisible(false)
                navigate('./Institution')
                console.log(res.data.role)
            }
        }
        catch (error) {
            console.error("Login failed:", error);
            return;
        }
    }

    const endContent = (
        <React.Fragment>
            <div className="flex flex-wrap align-items-center gap-3">
                {token ?
                    <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                        <i className="pi pi-home text-6xl " onClick={() => { dispatch(logOut()); navigate('/') }} style={{ color: 'white', fontSize: '1.5rem', margin: '1rem', marginLeft: '2rem' }}></i>
                    </button> :
                    <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                        <i className="pi pi-user text-6xl" onClick={() => { setVisible(true); setUserName(null); setPassword(null) }} style={{ color: 'white', fontSize: '1.5rem', margin: '1rem', marginLeft: '2rem' }}></i>
                    </button>}
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => setVisible(false)}
                    content={({ hide }) => (
                        <div
                            className="flex flex-column px-6 py-6 gap-5"
                            style={{
                                borderRadius: '1rem',
                                backgroundImage: 'radial-gradient(circle at top left,rgb(35, 156, 255),rgb(156, 234, 255))',
                                width: '24rem',
                                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)',
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            <div className="flex justify-content-center mb-4">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        margin: '0 auto',
                                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))',
                                        margin: '1rem'
                                    }}
                                />
                            </div>

                            <div className="flex flex-column gap-2">
                                <label
                                    htmlFor="username"
                                    className="text-white font-bold"
                                    style={{ fontSize: '1rem' ,
                                        margin: '1rem'
                                    }}
                                >
                                    שם משתמש
                                </label>
                                <InputText
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="username"
                                    className="p-inputtext p-component"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        border: '1.5px solidrgb(255, 255, 255)',
                                        borderRadius: '6px',
                                        color: 'white',
                                        padding: '0.7rem 1rem',
                                        fontSize: '1rem',
                                        width: '20rem',margin: '1rem' 
                                    }}
                                    placeholder="הכנס שם משתמש"
                                    required 
                                />
                            </div>

                            <div className="flex flex-column gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-white font-bold"
                                    style={{
                                        fontSize: '1rem', margin: '1rem'
                                    }}
                                >
                                    סיסמה
                                </label>
                                <InputText
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type="password"
                                    className="p-inputtext p-component"
                                    required
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        border: '1.5px solid #FFA726',
                                        borderRadius: '6px',
                                        color: 'white',
                                        padding: '0.7rem 1rem',
                                        fontSize: '1rem',
                                        width: '20rem',margin: '1rem' 

                                    }}
                                    placeholder="הכנס סיסמה"

                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    label="כניסה"
                                    onClick={logIn}
                                    className="p-button p-button-sm w-full"
                                    style={{
                                        border: 'none',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        margin: '1rem'
                                    }}
                                />
                                <Button
                                    label="ביטול"
                                    onClick={(e) => hide(e)}
                                    className="p-button-outlined p-button-sm w-full"
                                    style={{
                                        borderColor: 'white',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        margin: '1rem'
                                    }}
                                />
                                <Button
                                    label="הרשמה"
                                    onClick={() => setDVisible(true)}
                                    className="p-button-outlined p-button-sm w-full"
                                    style={{
                                        borderColor: '#42A5F5',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        margin: '1rem'
                                    }}
                                />


                                <Dialog
                                    visible={dvisible}
                                    modal
                                    onHide={() => {
                                        if (!dvisible) return;
                                        setDVisible(false);
                                    }}

                                    content={({ hide }) => (
                                        <div
                                            className="flex flex-column px-8 py-5 gap-4"
                                            style={{
                                                borderRadius: '12px',
                                                backgroundImage:
                                                    'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))',
                                            }}
                                        >
                                            <form onSubmit={handleSubmit(onSubmit)}>



                                                <div className="inline-flex flex-column gap-4">
                                                    <label
                                                        htmlFor="username"
                                                        style={{ margin: '1rem' }}
                                                        className="text-primary-50 font-semibold"
                                                    >
                                                        שם משתמש
                                                    </label>
                                                    <InputText
                                                        id="username"
                                                        {...register('username')}
                                                        label="Username"
                                                        style={{ width: '20rem', margin: '1rem' }}
                                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        required 
                                                    ></InputText>
                                                </div>
                                                <div className="inline-flex flex-column gap-4">
                                                    <label
                                                        htmlFor="username"
                                                        style={{ margin: '1rem' }}
                                                        className="text-primary-50 font-semibold"
                                                    >
                                                        סיסמא
                                                    </label>
                                                    <InputText
                                                        id="password"
                                                        {...register('password')}
                                                        label="Password"
                                                        style={{ width: '20rem' }}
                                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        type="password"
                                                        required 
                                                    ></InputText>
                                                </div>
                                                <div className="inline-flex flex-column gap-4">
                                                    <label
                                                        htmlFor="name"
                                                        style={{ margin: '1rem' }}
                                                        className="text-primary-50 font-semibold"
                                                    >
                                                        שם
                                                    </label>
                                                    <InputText
                                                        id="name"
                                                        {...register('name')}
                                                        label="name"
                                                        style={{ width: '20rem' }}
                                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        required 
                                                    ></InputText>
                                                </div>
                                                <div className="inline-flex flex-column gap-4">
                                                    <label
                                                        htmlFor="email"
                                                        style={{ margin: '1rem' }}
                                                        className="text-primary-50 font-semibold"
                                                    >
                                                        מייל
                                                    </label>
                                                    <InputText
                                                        id="email"
                                                        {...register('email')}
                                                        label="email"
                                                        style={{ width: '20rem' }}
                                                        className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        required 
                                                    ></InputText>
                                                </div>
                                                <div className="flex align-items-center gap-4">
                                                    <Button
                                                        label="הרשמה"
                                                        type="submit"
                                                        text
                                                        style={{ margin: '1rem' }}
                                                        className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                                    ></Button>
                                                    <Button
                                                        label="יציאה"
                                                        onClick={(e) => hide(e)}
                                                        text
                                                        style={{ margin: '1rem' }}
                                                        className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                                    ></Button>
                                                </div></form>
                                        </div>

                                    )}
                                ></Dialog>
                            </div>
                        </div>
                    )
                    }
                />



            </div >

        </React.Fragment >
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, #a8e6a1, #81c784)', margin: '1rem' }} />
        </div>
    );
}

