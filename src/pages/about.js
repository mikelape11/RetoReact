import React from "react"
import "../App.css"

const logoRquest = "/img/azul1.png";
const About = () => {
    return (
        <div className="about">
            <h1 style={{fontSize: "50px"}}>Bienvenido, {JSON.parse(localStorage.getItem("user") || null)}</h1>
            <img className="about-img" width="550" src={logoRquest} alt=""/>
        </div>
    )
}

export default About