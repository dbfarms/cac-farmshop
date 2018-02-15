import React, {PropTypes} from 'react';

class CheckBox extends React.Component {  
  constructor(props){
    super(props)
  }

  handleChange = (event) => 
    event.target.value = !event.target.value

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
            onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

/*
CheckBox.propTypes = {  
  item: PropTypes.object.isRequired, 
  handleChange: PropTypes.func.isRequired
};
*/

export default CheckBox; 