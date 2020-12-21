import styled from "styled-components";
import "antd/dist/antd.less";
import { Button } from 'antd';

export const StyledButton = styled( Button )`
  background-color: @primary-color;
`;

export const Wrapper = styled.section`
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 158px)
`;

export const Logo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

export const ImgHeader = styled.img`
  height: 34px;
  width: auto;
  margin: 15px 34px;
`;
