import React, { useState, useEffect } from 'react';

//Leaflet
import 'leaflet/dist/leaflet.css';
import {Table, Button, Input, Space, Breadcrumb, Typography, Row, Col} from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";

const {Title, Text} = Typography;

const UserTable = () =>{
    const [users, setUsers] = useState(null);
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
        {title:'ID',dataIndex:'_id',key:'_id'},{title: 'Nombre de usuario',dataIndex:'usuario',key:'usuario', ...getColumnSearchProps('usuario')},{ title: 'Contraseña',  dataIndex:'password',key:'password'},{ title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (_, record) => <b><Button onClick={()=>retrieveRoute(record.id)} icon={<EditOutlined />}/><Button onClick={()=>deleteRoute(record.id)} icon={<DeleteOutlined />}/></b>} 
    ]
    const retrieveRoute = id =>{
        window.location.href=`agentconfig/update/${id}`
    }
    const deleteRoute = id =>{
      fetch(`http://localhost:8080/usuarios/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      window.location.reload();
    }
    useEffect(() => {
        fetch("http://localhost:8080/usuarios/todos_registrados", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
          .then(res => res.json()
          .then(
            (result) => {
              setUsers(result)
            }
          ))
    }, []);
    return (
       <div>
        <Row justify={'space-between'}>
          <Col span={12}><Title>Gestión de usuarios <Text type="secondary">Tabla</Text></Title></Col>
          <Col span={12}>
            <Breadcrumb separator=">" >
              <Breadcrumb.Item>Gestión de Usuarios</Breadcrumb.Item>
              <Breadcrumb.Item>Tabla de datos</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
           <Table dataSource={users} columns={columns} rowKey='id'></Table>
       </div>
    )
}

export default UserTable;