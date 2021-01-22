import React, { useState, useEffect } from 'react';

import { Input, Select, Table, Button, Space, Row, Col, Breadcrumb, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Highlighter from 'react-highlight-words';

const {Title, Text} = Typography;


const {Option} = Select;

const Ranking = () =>{
    const [ciudades, setCiudades] = useState(null);
    const [aux, setAux] = useState([]);
    const [rutas, setRutas] = useState(null);
    const [rank, setRank] = useState(null);

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
        {title:'ID',dataIndex:'_id',key:'_id'},{title: 'Usuario',dataIndex:'nombre',key:'nombre', ...getColumnSearchProps('name')},{ title: 'Puntos',  dataIndex:'puntos',key:'puntos'},{title:'Aciertos', dataIndex: 'aciertos', key:'aciertos'},{title:'Fallos', dataIndex: 'fallos', key:'fallos'},{title:'Tiempo', dataIndex: 'tiempo', key:'tiempo'},{ title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (_, record) => <b>o</b>} 
    ]
    useEffect( ()=>{
        if(!ciudades){
            fetch(`http://localhost:8080/routes/all`)
            .then(res => res.json())
            .then(
                (result)=>{
                    // eslint-disable-next-line
                    result && result.map((ruta)=>{
                        setAux(aux =>[...aux, ruta.ciudad])
                    })
                    setCiudades(Array.from(new Set(aux)))
                }
            )
        }
    // eslint-disable-next-line
    },[aux])

    const RutasCiudad = (e) =>{
      fetch(`http://localhost:8080/routes/ciudad/${e}`)
          .then(res => res.json())
          .then(
              (result)=>{
                  console.log(result)
                  setRutas(result)
                  console.log(rutas)
              }
          )
    }

    const RankingRuta = (e) =>{
      fetch(`http://localhost:8080/ranking/${e}`)
          .then(res => res.json())
          .then(
              (result)=>{
                 console.log(result)
                 setRank(result)
              }
          )
    }

    return (
      <div>
        <Row justify={'space-between'}>
          <Col span={12}><Title>Gestión de Rankings <Text type="secondary">Tabla</Text></Title></Col>
          <Col span={12}>
            <Breadcrumb separator=">" >
              <Breadcrumb.Item>Gestión de Rankings</Breadcrumb.Item>
              <Breadcrumb.Item>Tabla de datos</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={12}>
            {ciudades ? <Select showSearch placeholder="Seleccione una ciudad" onChange={RutasCiudad}>
                {ciudades && ciudades.map((ciudad,a)=>{
                    return <Option key={'ciudad'+a} value={ciudad}>{ciudad}</Option>
                }
                )}
            </Select>: null}
          </Col>
          <Col span={12}>
            {rutas ? <Select showSearch placeholder="Seleccione una ruta" onChange={RankingRuta}>
                {rutas && rutas.map((ruta,a)=>{
                    return <Option key={'ruta'+a} value={ruta._id}>{ruta.nombre}</Option>
                }
                )}
            </Select>: null}
          </Col>
        </Row>
        {rank ? <Table dataSource={rank} columns={columns} rowKey='_id'></Table>: null}
      </div>
    )
}

export default Ranking;