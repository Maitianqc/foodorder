import React from "react";
import { List } from "antd-mobile";

const Item = List.Item;

const My = ({ history }) => (
  <div className="goods-list">
    <List style={{ marginTop: "100px" }}>
      <Item arrow="horizontal" onClick={() => history.push("/me/orders")}>
        My Orders
      </Item>
    </List>
  </div>
);

export default My;
