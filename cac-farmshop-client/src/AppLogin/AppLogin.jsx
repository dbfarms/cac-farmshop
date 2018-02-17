import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { history } from '../helpers/history';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';
 
class AppLogin extends React.Component {
    constructor(props) {
        super(props);
 
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
 
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                    <div className="see commented out section below"/>
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}
/*

{alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }

*/
 
function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
 
const connectedAppLogin = connect(mapStateToProps)(AppLogin);
export { connectedAppLogin as AppLogin };