import React, {Component, PropTypes} from 'react';

class CheckBox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const label = this.props.item;
    const { handleChange } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleChange(label);
  }

  render() {
    const label = this.props.item;
    const { isChecked } = this.state;
    let checked = this.state.isChecked
    if (label[1] === true) {
      checked = true 
    }

    return (
      <div className="checkbox">
        <label>
          {this.props.item}
          <input
                            type="checkbox"
                            name={label[0]}
                            value={label[0]}
                            checked={isChecked}
                            ref={(input) => { this.test = input; }}
                            onChange={this.toggleCheckboxChange.bind(this)}
                        />

          {label}
        </label>
      </div>
    );
  }
}


export default CheckBox;

/*
class CheckBox extends React.Component {  
  constructor(props){
    super(props)
  
  }


  render() {

    return (
     <div className="field">
        <div>
          <label>{this.props.item[0]}</label>
          <input 
            type="checkbox" 
            name={this.props.item[0]} 
            value={this.props.item[1]} 
            checked={this.props.item[1]} 
            onChange={this.props.handleChange}/>
        </div>
      </div>
    );
  }
}

export default CheckBox; 

/*
CheckBox.propTypes = {  
  item: PropTypes.object.isRequired, 
  handleChange: PropTypes.func.isRequired
};
*/

