import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'element-react';
import * as utils from './../utils'

export class TextInput extends Component {
    static propTypes = {        
        isReadOnly: PropTypes.bool.isRequired,
        field_name: PropTypes.string.isRequired      
    }
    constructor(props) {
        super(props)
        this.props = props

        //Attach this reference to Input event handlers
        this.textchange = this.textchange.bind(this)
        this.onBlur = this.onBlur.bind(this)      
        
        //Save initial value in Component local state.
        if(utils.isValidFieldValue(this.props.value)) {
            console.log('constructor curated field value ' + this.props.value)
            this.state = { isModified: false, textValue : this.props.value, field_name: this.props.field_name }
        } else {
            this.state = { isModified: false, textValue : '', field_name: props.field_name }                
        }
    }
    textchange(textval) {
        console.log('textchange floatval ' + textval)        
        this.setState({isModified: true, textValue: textval})
        this.props.handleChange(textval, this.props.field_name)
    }
    onBlur() {
        let { isModified, textValue } = this.state 
        if(isModified) {
          this.setState({isModified: false, textValue: textValue})
          this.props.handleChange(textValue, this.props.field_name)
        } else {          
          this.setState({isModified: false})        
        } 
    }
    getInitialValue() {
      let strValue = ''
      if(this.props.isReadOnly) {
          strValue = this.props.value
      }
      else {
          const {formInputState} = this.props;
          if((formInputState !== null) || (formInputState !== undefined)) {
            if(typeof(formInputState[this.props.field_name]) !== "undefined"){
              strValue = formInputState[this.props.field_name] 
            }
            else {
              strValue = undefined
            }   
          }            
      }
      return strValue
    }
    
    render() {
      // Read value from local state or passed in formInputState depending 
      // on readonly mode
      let textValue = this.getInitialValue()     
      console.log('ES6 dereference value for textValue ' + textValue)                  
      console.log('Default value for textValue ' + textValue)
      const isReadOnly = this.props.isReadOnly
      return (
        isReadOnly?        
              <Input
                value={textValue}
                readOnly
                placeholder={this.props.field_name}                  
                size="small"              
                />                                
          :
            <Input
              value={textValue}              
              placeholder={this.props.field_name}
              onChange={this.textchange.bind(this)}                            
              // onChange={(e) => this.props.handleChange(e, this.props.field_name)}
              onBlur={this.onBlur.bind(this)}   
              size="small"               
              />                          
        );      
    }
}


export default TextInput;

/* const TextInputFunc = ({
  formInputState,
  isReadOnly,
  field_name,
  handleChange
}) => {
  return (
    isReadOnly?        
          <Input            
            readOnly
            placeholder={field_name}                
            >                
            </Input>
      :
        <Input          
          placeholder={field_name}          
          onChange={handleChange(field_name)}                            
          onBlur={this.onBlur.bind(this)}              
          >              
        </Input>
  )
} */