import React, { useState, useEffect, useContext } from "react";

//Ruteo
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//Estructura
import { Layout, Menu, Row, Button, Image } from "antd";

// Styles
import { Logo, Wrapper, ImgHeader } from "./styles";



//Rutas programadas
import { routes } from "./routes";

import { AuthContext } from "../App";
import { SVG } from "leaflet";

//CONSEJO -- Los "const" siempre por debajo de los import
const mapaSVG = '/public/openstreetmap.svg'

// Layout
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;


const Routes = () => {
  //Variables de estado
  // eslint-disable-next-line
  const [selectedKey, setSelectedKey] = useState("1");

  //Reducer del contexto, para hacer logout
  const { dispatch } = useContext(AuthContext);

  
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
          <Menu style={{ height: "calc(100vh - 64px)" }} mode="inline"  theme="dark" defaultOpenKeys={[localStorage.getItem("sub-item")]} defaultSelectedKeys={[localStorage.getItem("item")]}>
              <Menu.Item key="ksr1" icon={<mapaSVG/>}>
                <Link to="/routes">
                  Gestion de Rutas
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
          <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Routes;
