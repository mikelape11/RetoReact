import React, { useState, useEffect, } from 'react';

//Leaflet
import 'leaflet/dist/leaflet.css';
import {Table, Button, Input, Space, Breadcrumb, Typography, Row, Col} from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Axios from 'axios';

const {Title, Text} = Typography;

const RouteTable = () =>{
    const [routes, setRoute] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
       confirm();
       setSearchText(selectedKeys[0])
       setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
       clearFilters();
       setSearchText('');
    };
    const columns = [
        {title:'ID',dataIndex:'id',key:'id'},{title: 'Nombre Ruta',dataIndex:'nombre',key:'nombre', ...getColumnSearchProps('name')},{ title: 'Distancia',  dataIndex:'distancia',key:'distancia'},{title:'Tiempo est.', dataIndex: 'tiempo', key:'tiempo'},{ title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (_, record) => <b><Button onClick={()=>readRoute(record.id)} icon={<EyeOutlined />}></Button><Button onClick={()=>retrieveRoute(record.id)} icon={<EditOutlined />}/><Button onClick={()=>deleteRoute(record.id)} icon={<DeleteOutlined />}/></b>} 
    ]
    const readRoute = id => {
      window.location.href=`routes/${id}`
    }
    const retrieveRoute = id =>{
        window.location.href=`agentconfig/update/${id}`
    }
    const deleteRoute = id =>{
      console.log(id)
      fetch(process.env.REACT_APP_DB + `testagents/`,{
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
        },body:
          JSON.stringify({
            'id': parseInt(id),
          })
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      window.location.reload();
    }
    useEffect(() => {
        fetch("http://localhost:8080/routes/all", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
          .then(res => res.json()
          .then(
            (result) => {
              console.log(result)
              setRoute(result)
            }
          ))
    }, []);
    return (
       <div>
        <Row justify={'space-between'}>
          <Col span={12}><Title>Gestión de rutas <Text type="secondary">Tabla</Text></Title></Col>
          <Col span={12}>
            <Breadcrumb separator=">" >
              <Breadcrumb.Item>Gestión de Rutas</Breadcrumb.Item>
              <Breadcrumb.Item>Tabla de datos</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Button icon={<PlusOutlined />}><Link to="/routes/create">Añadir nueva ruta</Link></Button>
        </Row>
           <Table dataSource={routes} columns={columns} rowKey='id'></Table>
       </div>
    )
}

export default RouteTable;