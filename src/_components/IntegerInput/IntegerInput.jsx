import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'element-react';
import * as utils from './../utils'
// import './IntegerInput.css'

export default class IntegerInput extends Component {
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

        if(utils.isValidFieldValue(this.props.value)) {
          const curatedIntVal = utils.parseIntValue(this.props.value)        
          console.log('constructor curatedIntVal ' + curatedIntVal)
          this.state = { isModified: false, intValue : curatedIntVal, field_name: props.field_name }
        } else {
          this.state = { isModified: false, field_name: props.field_name, intValue : 0}          
        }
    }
    
    numchange(intval) {
        console.log('numchange intval ' + intval)
        const curatedInt = utils.parseIntValue(intval) 
        const strValue = curatedInt.toString()       
        this.setState({isModified: true, intValue: strValue})
        this.props.handleChange(strValue, this.props.field_name)
    }   

    onBlur() {
        let { isModified, intValue } = this.state 
        if(isModified) {          
          const curatedInt = utils.parseIntValue(intValue)          
          const strValue = curatedInt.toString()       
          this.setState({isModified: false, intValue: curatedInt})
          this.props.handleChange(strValue, this.props.field_name)
        } else {          
          this.setState({isModified: false})        
        } 
    }
    
    render() {
      // let { intValue } = this.state
      const intValue = utils.parseIntValue(utils.getInitialValue(this.props));      
      console.log('ES6 dereference value for intValue ' + intValue)                  
      console.log('Default value for intValue ' + intValue)
      
      const isReadOnly = this.props.isReadOnly
      console.log('Default value for isReadOnly ' + isReadOnly)      
      
      return (
        isReadOnly?        
              <InputNumber
                defaultValue={intValue}
                disabled={true}
                value={intValue}
                placeholder={this.props.field_name}                
                min="0"   
                size="small"    
                controls={false}         
                />                
          :
             <InputNumber
                defaultValue={intValue}    
                value={intValue}          
                placeholder={this.props.field_name}
                onChange={this.numchange}
                onBlur={this.onBlur}                  
                min="0"     
                size="small"         
              />                          
        );      
    }
}