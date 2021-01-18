import React, { useState, useEffect } from 'react';

import {Button, Form, Input} from 'antd';


const ActUsuario = () =>{
    const [user, setUser] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:8080/usuarios/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}`)
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result)
                setUser(result)
            }
        )
    },[])
    return (
        <div>
            <Form>
                <Form.Item>

                </Form.Item>
            </Form>
        </div>
    )
}

export default ActUsuario;