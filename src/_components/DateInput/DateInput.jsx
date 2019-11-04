import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'element-react';
import * as utils from './../utils'

export class DateInput extends Component {
    static propTypes = {
      // render: PropTypes.func.isRequired,
      isReadOnly: PropTypes.bool.isRequired,
      field_name: PropTypes.string.isRequired      
    }
    
    constructor(props) {
        super(props)
        this.props = props
        // console.log('DateInput props: ' + JSON.stringify(this.props))
        // console.log('DateInput props.field_name: ' + props.field_name)
        // console.log('DateInput props.render: ' + props.render)
        // Attach this reference to Input event handlers        
        this.datechange = this.datechange.bind(this) 

        console.log('DateInput props.value: ' + props.value)        
        if(utils.isValidFieldValue(props.value)) {          
        // if(props.value !== null) {          
          // const curatedDate = utils.parseDateValue(props.value)
          const curatedDate = new Date(props.value)
          console.log('DateInput curatedDate: ' + curatedDate)                  
          const strCuratedDate = curatedDate.toString('MM/dd/yyyy')
          // this.state = { field_name: props.field_name, strValue : strCuratedDate }            
          this.state = { datevalue : curatedDate, field_name: props.field_name, strValue : strCuratedDate }
        } else {
          this.state = { datevalue : null, field_name: props.field_name}          
        }        
      }

      datechange(dateval) {
          try {                
            this.setState({datevalue: dateval})      
            var vDate = dateval
            // if (vDate != null || vDate !== '') {
            if(utils.isValidFieldValue(vDate)) {          
              var curr_date = vDate.getDate()
              var curr_month = vDate.getMonth() + 1 // getMonth() is zero-based
              var curr_year = vDate.getFullYear()  
              var vDateString = (curr_month > 9 ? '' : '0') + curr_month + '/' + (curr_date > 9 ? '' : '0') + curr_date + '/' + curr_year
              console.log(vDateString)                        
              this.setState({strValue: vDateString, isModified: true})
              this.props.handleChange(vDateString, this.props.field_name)
              // this.props.handleChange(dateval, this.props.field_name)
            } else {
              this.setState({strValue: ''})
            }
          } catch (err) {
              this.setState({strValue: ''})
          }          
      }   
      
      onBlur() {
        let { isModified, strValue } = this.state 
        if(isModified) {          
          // const curatedDate = utils.parseDateValue(strValue)          
          this.setState({isModified: false})
          // const strValue = curatedDate.toString("MM/dd/yyyy")
          this.props.handleChange(strValue, this.props.field_name)
        } else {          
          this.setState({isModified: false})        
        } 
    }
      
      render() {        
        const strValue = utils.getInitialValue(this.props)        
        let datevalueParsed = null
        let datevalue = null
        
        console.log('strValue')
        console.log(strValue)
        
        datevalueParsed = utils.parseDateValue(strValue)
        console.log('datevalueParsed')
        console.log(datevalueParsed)
        
        if(datevalueParsed == null) {
          datevalue = null
        } else {
          datevalue = new Date(datevalueParsed)
        }
        
        console.log('datevalue')
        console.log(datevalue)
        // const {datevalue} = this.state
        // console.log('datevalue')
        // console.log(datevalue)
        // console.log('Default value for datevalue ' + datevalue)
        console.log('Default value for this.props.isReadOnly ' + this.props.isReadOnly)
        const isReadOnly = this.props.isReadOnly
          return (
              isReadOnly?            
                <DatePicker
                  value={datevalue}
                  isDisabled={isReadOnly}
                  format="MM/dd/yyyy"
                  // placeholder="Pick a day"
                  placeholder={this.props.field_name}   
                  isShowTrigger={false}
                  size="mini"                                 
                >                  
                </DatePicker>
              :
              <DatePicker
                value={datevalue}
                format="MM/dd/yyyy"
                // placeholder="Pick a day"
                placeholder={this.props.field_name}
                onChange={this.datechange} 
                size="mini"                                            
                >                
              </DatePicker>         
              
          );      
      }
}
export default DateInput;