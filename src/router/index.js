import React, { useState, useEffect, useContext } from "react";

//Ruteo
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//Estructura
import { Layout, Menu, Button, } from "antd";

// Styles
import { Logo, Wrapper,  } from "./styles";

//Rutas programadas
import { routes } from "./routes";

import { AuthContext } from "../App";

//CONSEJO -- Los "const" siempre por debajo de los import

// Layout
const {  Content, Footer, Sider } = Layout;

const Routes = () => {
  //Variables de estado
  // eslint-disable-next-line
  const [selectedKey, setSelectedKey] = useState("1");

  //Reducer del contexto, para hacer logout
  const { dispatch } = useContext(AuthContext);

  // eslint-disable-next-line
  const getKey=(e)=>{
    localStorage.setItem("sub-item", e.keyPath[1]);
    localStorage.setItem("item", e.key);
  }

  //Con esta estructura solo se ejecuta al empezar
  useEffect(() => {
    if (window.location.pathname) {
      let new_route = routes.find((route) => route.path === window.location.pathname);
      if (new_route && new_route.key) setSelectedKey(new_route.key);
    }
  }, []);

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <Router>
      {/* Así se comenta en el "html" */}
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Logo />
          <Menu style={{ height: "calc(100vh - 64px)" }} mode="inline" theme="dark" defaultOpenKeys={[localStorage.getItem("sub-item")]} defaultSelectedKeys={[localStorage.getItem("item")]}>
              <Menu.Item key="rutas">
                <Link to="/routes">
                  Gestion de Rutas
                </Link>
              </Menu.Item>
              <Menu.Item key="preguntas">
                <Link to="/preguntas">
                  Gestion de Preguntas
                </Link>
              </Menu.Item>
              <Menu.Item key="ranking">
                <Link to="/ranking">
                  Gestion de Ranking
                </Link>
              </Menu.Item>
              <Menu.Item key="usuarios">
                <Link to="/usuarios">
                  Gestion de Usuarios
                </Link>
              </Menu.Item>
            <Button onClick={() => logout()}>Cerrar sesión</Button>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Wrapper>
              <Switch>
                {routes.map((data, i) => (
                  <Route key={i} path={data.path} exact={data.exact}>
                    {data.body}
                  </Route>
                ))}
              </Switch>
            </Wrapper>
          </Content>
        <Footer style={{ textAlign: "center" }}>RouteQuest©2021 Created by Mikel Apezetxea, Mélanie Miguel & Javi Sánchez</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Routes;
