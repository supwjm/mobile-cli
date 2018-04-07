import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import { withRouter } from 'react-router'
import Navigation from '../components/Navigation';

class PersonalCenter extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.login();
  }
  render() {
    if (this.props.isLoading) {
        return (<p> loading... </p>);
    }
    if (this.props.loginUserName) {
        return (
          <section className="content">
            <Navigation/>
          </section>
        )
    }
    if (this.props.loginError) {
        return (<p>{this.props.loginError}</p>)
    }
    return null;
  }
}

PersonalCenter.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonalCenter));
