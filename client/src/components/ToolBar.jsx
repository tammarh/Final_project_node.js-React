import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setToken, setUser, setRole } from '../redux/tokenSlice';
import { logOut } from '../redux/tokenSlice';
import axios from 'axios';
//import { register } from '../';
import { set, useForm } from "react-hook-form"

export default function CustomDemo() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.token)
    const [visible, setVisible] = useState(false)
    const [dvisible, setDVisible] = useState(false)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const res = await axios.post('http://localhost:5555/api/auth/register', data)
        setDVisible(false)
    }

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

    const logIn = async () => {
        try {
            //const res = await login({ username: userName, password })
            const res = await axios.post('http://localhost:5555/api/auth/login', { username: userName, password })

            dispatch(setUser(res.data.user));
            console.log(res.data.user)

            dispatch(setRole(res.data.role));
            console.log(res.data.role)

            dispatch(setToken(res.data.token))
            console.log(res.data.token)

            if (res.status == 200) {
                console.log('access')
                setVisible(false)
                navigate('./Institution')
                console.log(res.data.role);
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
                        <i className="pi pi-home text-6xl " onClick={() => { dispatch(logOut()); navigate('/') }} style={{ color: 'white', fontSize: '1.5rem', margin: '1rem' }}></i>
                    </button> :
                    <button className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                        <i className="pi pi-user text-6xl" onClick={() => {setVisible(true); setUserName(null);setPassword(null)}} style={{ color: 'white', fontSize: '1.5rem', margin: '1rem', marginLeft: '2rem' }}></i>
                    </button>}
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => setVisible(false)}
                    content={({ hide }) => (
                        <div
                            className="flex flex-column px-6 py-5 gap-4"
                            style={{
                                borderRadius: '1rem',
                                backgroundImage: 'radial-gradient(circle at top left, #FFD180, #FB8C00)',
                                width: '22rem',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                fontFamily: 'Arial, sans-serif' // שינוי גופן
                            }}
                        >
                            <div className="flex justify-content-center">
                                <img
                                    src="/fruit.jpg"
                                    alt="Logo"
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        border: '2px solid white'
                                    }}
                                />
                            </div>

                            <div className="flex flex-column gap-1">
                                <label htmlFor="username" className="text-white font-bold" style={{ fontSize: '0.9rem' }}>
                                    שם משתמש
                                </label>
                                <InputText
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="username"
                                    className="bg-white-alpha-20 border-none p-3 text-white"
                                    placeholder="הכנס שם משתמש"
                                />
                            </div>

                            <div className="flex flex-column gap-1">
                                <label htmlFor="password" className="text-white font-bold" style={{ fontSize: '0.9rem' }}>
                                    סיסמה
                                </label>
                                <InputText
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    type="password"
                                    className="bg-white-alpha-20 border-none p-3 text-white"
                                    placeholder="הכנס סיסמה"
                                />
                            </div>

                            <div className="flex gap-2 pt-3">

                                <Button
                                    label="כניסה"
                                    onClick={logIn}
                                    className="p-button p-button-sm w-full text-white"
                                    style={{ backgroundColor: '#EF6C00', border: 'none' }}
                                />
                                <Button
                                    label="ביטול"
                                    onClick={(e) => hide(e)}
                                    className="p-button-outlined p-button-sm w-full text-white"
                                    style={{ borderColor: 'white', color: 'white' }}
                                />
                                {/* <Button
                                    label="הרשמה"
                                    onClick={(e) => hide(e)}
                                    className="p-button-outlined p-button-sm w-full text-white"
                                    style={{ borderColor: 'white', color: 'white' }}
                                /> */}
                                <div className="card flex justify-content-center">
                                    <Button
                                        label="הרשמה"
                                        //icon="pi pi-user"
                                        onClick={() => setDVisible(true)}
                                        className="p-button-outlined p-button-sm w-full text-white"
                                        style={{ borderColor: 'white', color: 'white' }}
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



                                                    <div className="inline-flex flex-column gap-2">
                                                        <label
                                                            htmlFor="username"
                                                            className="text-primary-50 font-semibold"
                                                        >
                                                            Username
                                                        </label>
                                                        <InputText
                                                            id="username"
                                                            {...register('username')}
                                                            label="Username"
                                                            className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        ></InputText>
                                                    </div>
                                                    <div className="inline-flex flex-column gap-2">
                                                        <label
                                                            htmlFor="username"
                                                            className="text-primary-50 font-semibold"
                                                        >
                                                            Password
                                                        </label>
                                                        <InputText
                                                            id="password"
                                                            {...register('password')}
                                                            label="Password"
                                                            className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                            type="password"
                                                        ></InputText>
                                                    </div>
                                                    <div className="inline-flex flex-column gap-2">
                                                        <label
                                                            htmlFor="name"
                                                            className="text-primary-50 font-semibold"
                                                        >
                                                            name
                                                        </label>
                                                        <InputText
                                                            id="name"
                                                            {...register('name')}
                                                            label="name"
                                                            className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        ></InputText>
                                                    </div>
                                                    <div className="inline-flex flex-column gap-2">
                                                        <label
                                                            htmlFor="email"
                                                            className="text-primary-50 font-semibold"
                                                        >
                                                            Email
                                                        </label>
                                                        <InputText
                                                            id="email"
                                                            {...register('email')}
                                                            label="email"
                                                            className="bg-white-alpha-20 border-none p-3 text-primary-50"
                                                        ></InputText>
                                                    </div>
                                                    <div className="flex align-items-center gap-2">
                                                        <Button
                                                            label="Sign-In"
                                                            type="submit"
                                                            text
                                                            className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                                        ></Button>
                                                        <Button
                                                            label="Cancel"
                                                            onClick={(e) => hide(e)}
                                                            text
                                                            className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                                        ></Button>
                                                    </div></form>
                                            </div>

                                        )}
                                    ></Dialog>
                                </div>
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

