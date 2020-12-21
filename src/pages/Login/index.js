import React, { useContext, useState } from "react";
import { Form, Input, Button, Layout, Row, Col, Alert, Spin } from "antd";

import { AuthContext } from "../../App";

import { authenticationService } from "../../services/authentication.service";

const logoRquest = "/img/logo2.png";
const fondo = "/img/fondoAmarillo.jpg";

const { Header, Content, Footer } = Layout;

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    name: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    console.log("entrar");
    //event.preventDefault();

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    authenticationService.login(data.username, data.password).then((response) => {
      console.log(response);
      if (response.error) {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: "Usuario o contraseña incorrectos",
        });
      } else {
        dispatch({
          type: "LOGIN",
          payload: { user: response.user, token: response.token },
        });
      }
    });
  };

  return (
    <div>
    
        <Layout className="layout" style={{ minHeight: "100vh", backgroundImage: "url(" + fondo + ")" }}>
          <Header className="header-login" style={{ padding: 0, backgroundColor:'orange' }}></Header>
          <Content>
            <Row >
              <Col sm={24} md={12} lg={6} xl={6} style={{ textAlign: "center" }} className="form">
                <Form onFinish={handleFormSubmit} style={{ padding: 24 }}>
                  <img src={logoRquest} alt="Logo" style={{ width: "85%" }} />
                  <Form.Item>
                    <Input
                      className="input"
                      placeholder="Usuario"
                      name="username"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      className="input"
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Spin spinning={data.isSubmitting}>
                      <Button type="primary" shape="round" htmlType="submit" style={{backgroundColor: 'orange'}} className="button">
                        Entrar
                      </Button>
                    </Spin>
                    {data.errorMessage && <Alert message={data.errorMessage} type="error" showIcon />}
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: "center", color:'black', backgroundColor:'orange' }}>Route Quest &copy; 2021</Footer>
        </Layout>
    </div>
  );
};

export default Login;