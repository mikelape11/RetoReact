import React, { useState, useEffect, useContext } from "react";

//Ruteo
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//Estructura
import { Layout, Menu, Row, Button } from "antd";

// Styles
import { Logo, Wrapper, ImgHeader } from "./styles";


//Rutas programadas
import { routes } from "./routes";

import { AuthContext } from "../App";

//CONSEJO -- Los "const" siempre por debajo de los import

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
            <SubMenu onClick={getKey} key="sub1"  title="Settings">
              <Menu.Item key="ksr1">
                <Link to="/ksrsettings">
                  KSR Parameters
                </Link>
              </Menu.Item>
              <Menu.Item key="network1">
                <Link to="/networks">
                  Networks
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu onClick={getKey} key="sub2" title="Measurement Configuration">
              <Menu.Item key="agents1">
                <Link to="/agentconfig">
                  Agent Configuration
                </Link>
              </Menu.Item>
              <Menu.Item key="testconfig1">
                <Link to="/testconfig">
                  Test Configuration
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu onClick={getKey} key="sub3" title="Results">
              <Menu.Item key="maps1">
                <Link to="/maps">
                  Maps
                </Link>
              </Menu.Item>
              <Menu.Item key="maps_c">
                <Link to="/map_comparison">
                  Maps Comparison
                </Link>
              </Menu.Item>
              <Menu.Item key="charts1">
                <Link to="/charts">
                  Charts
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu onClick={getKey} key="sub4" title="Statistic Results">
              <Menu.Item key="maps2">
                <Link to="/mapquad">
                  Maps
                </Link>
              </Menu.Item> 
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Row type="flex" justify="end" align="middle" gutter={12}>
              <Button onClick={() => logout()}>Cerrar sesión</Button>
              <ImgHeader src={process.env.PUBLIC_URL + "/img/ceit.png"} alt="CEIT" />
            </Row>
          </Header>
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
