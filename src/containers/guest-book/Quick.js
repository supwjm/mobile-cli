import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route,Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { NavBar, Icon ,Tabs, WhiteSpace, Badge} from 'antd-mobile';
import Navigation from '../../components/Navigation';
import { login } from '../../actions';
import '../../assets/css/pages/myguestbook.scss';

const tabs = [
  { title: "指定医生咨询" },
  { title: "快捷咨询" }
];

class Quick extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <section>
        quick
      </section>
    )
  }
}

Quick.propTypes = {
    isLoading: PropTypes.bool,
    loginUserName: PropTypes.string,
    loginError: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.loginPageData.loading,
    loginUserName: state.entities.loginUser && state.entities.loginUser.name || null,
    loginError: state.loginPageData.error && state.loginPageData.error.toString() || null
});

const mapDispatchToProps = {
    login
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quick));
