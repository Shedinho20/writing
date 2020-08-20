import * as React from "react";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import "./style/nav.scss";
import { navMobile, navClass } from "../../data/action/project";
interface Props {}

export interface NavbarmobtnProps {
  navmob: Boolean;
  navMobile: () => void;
  navClass: () => void;
  style1: string;
  style2: string;
  style3: string;
}

export interface NavbarmobtnState {}

class Navbarmobtn extends React.Component<NavbarmobtnProps, NavbarmobtnState> {
  state = {};

  clicked = () => {
    this.props.navMobile();
    this.props.navClass();
  };

  clickedQuestion = () => {
    if (this.props.navmob) {
      this.props.navMobile();
      this.props.navClass();
    } else {
      return null;
    }
  };

  render() {
    const { style1, style2, style3 } = this.props;
    return (
      <div className="navmobtn">
        <div className="menu" onClick={() => this.clicked()}>
          <div className={style1}></div>
          <div className={style2}></div>
          <div className={style3}></div>
        </div>
        <Link
          to={`/contact`}
          id="link"
          activeClassName="active"
          className="link"
          onClick={() => this.clickedQuestion()}
        >
          <LiveHelpIcon className="material-icons" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { style1, style2, style3 } = state.projectData;
  return {
    auth: state.firebase.auth,
    navmob: state.projectData.navmob,
    style1,
    style2,
    style3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navMobile: () => dispatch(navMobile()),
    navClass: () => dispatch(navClass()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbarmobtn);
