import React from 'react';
import './Login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Input extends React.Component {
	render() {
		return (
			<div className="Input">
				<input 
					id={this.props.id}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>	
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
}

class Modal extends React.Component {

	render() {
		return (
			<div className="Modal">
				<form 
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
						placeholder="Name" />
					<Input
						id="username"
						type="email"
						placeholder="example@example.com" />
					<Input
						id="password"
						type="password"
						placeholder="password" />
					<button>
						Log in <i className="fa fa-fw fa-chevron-right"></i>
					</button>
				</form>
			</div>
		);
	}
}

class Login extends React.Component{
    constructor(props) {
    super(props)
    
        this.state = {
            mounted:false
        }

    }

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	handleSubmit(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	}

	render() {
		var child;

		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit} />);
		}
		
		return(
			<div className="Login">
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default Login;
