import React from "react";
import Nav from "../navBar/backNavBar";
import { Button } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Nav title="can not find the page" hasIcon={false} />
        <div className="center">
       sorry!  can not find the page!
          <Button
            type="primary"
            size="small"
            onClick={() => this.props.history.push("/")}
          >
            back to the first page
          </Button>
        </div>
      </div>
    );
  }
}

export default NotFound;
