import React from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import PropTypes from "prop-types";

const RegisterForm = ({ register, radioData, handleTextChange, type }) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem onChange={v => handleTextChange("user", v)}>
          username
        </InputItem>
        <WhiteSpace />
        <InputItem onChange={v => handleTextChange("pwd", v)}>password</InputItem>
        <WhiteSpace />
        {radioData.map(i => (
          <Radio.RadioItem
            key={i.type}
            checked={type === i.type}
            onChange={() => handleTextChange("type", i.type)}
          >
            {i.text}
          </Radio.RadioItem>
        ))}
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={register}>
        sign up
      </Button>
    </WingBlank>
  </div>
);

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  radioData: PropTypes.array.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default RegisterForm;
