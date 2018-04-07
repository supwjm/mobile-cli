import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route,Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { NavBar, Icon ,Tabs, WhiteSpace, Badge} from 'antd-mobile';
import Navigation from '../../components/Navigation';
import { login } from '../../actions';
import Quick from './Quick';
import Specify from './Specify';
import '../../assets/css/pages/myguestbook.scss';

const tabs = [
  { title: <Link to="/myguestbook/0">指定医生咨询</Link> },
  { title: <Link to="/myguestbook/1">快捷咨询</Link> }
];

class MyGuestBook extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    let type = parseInt( this.props.match.params.type );

    return (
      <section className="content">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >我的咨询</NavBar>
        <Tabs tabs={tabs}
          initialPage={type}
        >
          <Route component={Specify} path="/myguestbook/0"/>
          <Route component={Quick} path="/myguestbook/1"/>
        </Tabs>
      </section>
    )
  }
}

MyGuestBook.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGuestBook));
