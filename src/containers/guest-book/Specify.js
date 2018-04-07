import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route,Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { NavBar, Icon ,Tabs, WhiteSpace, Badge,Card} from 'antd-mobile';
import Navigation from '../../components/Navigation';
import { login } from '../../actions';
import '../../assets/css/pages/myguestbook.scss';

const tabs = [
  { title: "指定医生咨询" },
  { title: "快捷咨询" }
];

class Specify extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <section>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title="This is title"
            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            extra={<span>已完成</span>}
          />
          <Card.Body>
            <div>This is content of `Card`</div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
        <a>111111</a>
      </section>
    )
  }
}

Specify.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specify));
