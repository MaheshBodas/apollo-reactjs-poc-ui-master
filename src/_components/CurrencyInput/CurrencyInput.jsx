import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'element-react';
import * as utils from './../utils'
// import './CurrencyInput.css'

export class CurrencyInput extends Component {
    static propTypes = {
        // render: PropTypes.func.isRequired,
        isReadOnly: PropTypes.bool.isRequired,
        field_name: PropTypes.string.isRequired      
    }
    
    constructor(props) {
        super(props)
        this.props = props
        
        //Attach this reference to Input event handlers       
        this.onBlur = this.onBlur.bind(this) 
        this.onFocus = this.onFocus.bind(this)
        this.numchange = this.numchange.bind(this)
        this.isReadOnly = this.props.isReadOnly
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })        
        console.log('constructor this.props.value ' + props.value)        
        if(utils.validateCurrency(props.value)) {                    
          const curatedFloatVal = parseFloat(props.value)        
          console.log('constructor curatedFloatVal ' + curatedFloatVal)
          this.state = { isModified: false, isInputActive: false, floatValue : curatedFloatVal, field_name: props.field_name }
          if(!this.isReadOnly) {
            const strValue = curatedFloatVal.toString()
            this.props.handleChange(strValue, this.props.field_name)
          }
          
        } else {          
          this.state = { isModified: false, isInputActive: false, floatValue : 0, field_name: props.field_name }
        }
    }
    
    numchange(floatval) {
      if(utils.validateCurrency(floatval)) {
        console.log('numchange floatval ' + floatval)                 
        this.setState({isModified: true, floatValue: floatval})        
        if(!this.isReadOnly) {
          const strValue = floatval.toString()
          this.props.handleChange(strValue, this.props.field_name)
        }
      } else {
        console.log('validateCurrency failed ' + floatval)                 
      }
    }   

    onBlur() {
        let { isModified, floatValue } = this.state 
        if(isModified) {                    
          this.setState({isModified: false, floatValue: floatValue, isInputActive: false})
          if(!this.isReadOnly) {
            const strValue = floatValue.toString()
            this.props.handleChange(strValue, this.props.field_name)
          }
        } else {          
          this.setState({isModified: false, isInputActive: false})        
        } 
    }  

    onFocus() {
        this.setState({isInputActive: true})
    }      
    
    render() {     
      // let { floatValue } = this.state
      // let floatValue = 0
      let strValue = utils.getInitialValue(this.props)
      console.log('ES6 dereference value for strValue ' + strValue)            
      // console.log('ES6 dereference value for floatValue ' + floatValue)
      if(!this.state.isInputActive) {        
        strValue = this.formatter.format(strValue)          
      }            
      // console.log('Default value for floatValue ' + floatValue)
      const isReadOnly = this.props.isReadOnly
      return (
        isReadOnly?        
              <Input
                value={strValue}
                readOnly
                placeholder={this.props.field_name}                
                min="1"     
                size="small"                  
                >                
              </Input>
          :
            <Input
              value={strValue}
              // placeholder="Pick a day"
              placeholder={this.props.field_name}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onChange={this.numchange}
              min="1"      
              size="small"         
              >              
            </Input>
        );      
    }
}
export default CurrencyInput;