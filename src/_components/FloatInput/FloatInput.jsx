import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'element-react';
import * as utils from './../utils'
// import './FloatInput.css'

export class FloatInput extends Component {
    static propTypes = {        
        isReadOnly: PropTypes.bool.isRequired,
        field_name: PropTypes.string.isRequired      
    }
    
    constructor(props) {
        super(props)
        this.props = props

        //Attach this reference to Input event handlers
        this.onBlur = this.onBlur.bind(this) 
        this.numchange = this.numchange.bind(this)
        //Set Readonly flag for control
        this.isReadOnly = this.props.isReadOnly
        if(utils.validateNumber(props.value)) {                    
          const curatedFloatVal = parseFloat(props.value)              
          console.log('constructor curatedFloatVal ' + curatedFloatVal)
          this.state = { isModified: false, floatValue : curatedFloatVal, field_name: props.field_name }
          if(!this.isReadOnly) {
            const strValue = utils.floatToString(curatedFloatVal)
            this.props.handleChange(strValue, this.props.field_name)
          }
        } else {
          this.state = { isModified: false, floatValue : 0, field_name: props.field_name }
        }
    }
    
    numchange(floatval) {
      console.log('numchange floatval value ' + floatval)                 
      if(utils.validateNumber(floatval)) {
        this.setState({isModified: true, floatValue: floatval})
        if(!this.isReadOnly) {
          const strValue = utils.floatToString(floatval)
          this.props.handleChange(strValue, this.props.field_name)
        }
      } else {
        const zeroValue = 0
        this.setState({isModified: true, floatValue: 0})
        if(!this.isReadOnly) {
          const strValue = utils.floatToString(zeroValue)
          this.props.handleChange(strValue, this.props.field_name)
        }                 
      }     
    }   

    onBlur() {
        let { isModified, floatValue } = this.state 
        if(isModified) {          
          this.setState({isModified: false, floatValue: floatValue})
          if(!this.isReadOnly) {
            const strValue = utils.floatToString(floatValue)
            this.props.handleChange(strValue, this.props.field_name)
          }
        } else {          
          this.setState({isModified: false})        
        } 
    }
    
    render() {
      // let { floatValue } = this.state          
      const strValue = utils.getInitialValue(this.props)
      console.log('ES6 dereference value for strValue ' + strValue)                        
      
      // console.log('ES6 dereference value for floatValue ' + floatValue)                  
      // console.log('Default value for floatValue ' + floatValue)
      
      const isReadOnly = this.props.isReadOnly
      return (
        isReadOnly?        
            <Input
              value={strValue}
              readOnly
              placeholder={this.props.field_name}                
              min="1" 
              size="mini"               
              />
          :
            <Input                          
              placeholder={this.props.field_name}
              value={strValue}
              onChange={this.numchange}
              onBlur={this.onBlur}              
              min="1"  
              size="mini"            
            />
        );      
    }
}
export default FloatInput;