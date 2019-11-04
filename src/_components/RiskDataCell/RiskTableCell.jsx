import * as React from 'react';
import { Layout, Form } from 'element-react';
import { RiskInput } from './../RiskInput/RiskInput'
import * as utilsfunc from '../../utils/commonutils'

export default class RiskDataCell extends React.Component {
  _isMounted = false
    constructor(props) {
        super(props);     
        console.log('constructor RiskDataCell')
        
    }
    componentDidMount() {      
      this._isMounted = true;
      console.log('RiskDataCell mounted')
      this.forceUpdate()
    }
  
    componentWillUnmount() {
      console.log('RiskDataCell unmounted')
      this._isMounted = false;
    }
  
    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)                
    }    

    render(){
      const {riskField, formInputState, isReadOnly, iColumn, handleChange } = this.props      
      let fieldCaption = ''
      if(riskField) {
        fieldCaption = utilsfunc.capitalize(riskField.risk_type_field_description)
      }
      // console.log('Render readonly controls ' + isReadOnly)
      const cellMarkup = isReadOnly ?           
             <Layout.Col span="6" key={iColumn}>
              <Form.Item  label={fieldCaption}>                                   
                  <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} isReadOnly={true} value={riskField.risk_field_value} />  
              </Form.Item>
          </Layout.Col>
        : 
          <Layout.Col span="6" key={iColumn}>
              {         
              <Form.Item  label={fieldCaption} prop={riskField.risk_type_field_name} size="mini">                                              
                  <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} formInputState={formInputState} value={riskField.risk_field_value} isReadOnly={false}  handleChange={handleChange} />  
              </Form.Item>
              }
          </Layout.Col>            
      if(this._isMounted) {
        return cellMarkup 
      }
      else{
        console.log('RiskDataCell not mounted')
        return null
      }
    }

  }

/*
  export default function RiskDataCell1({
  riskField,
  formInputState,
  isReadOnly,
  iColumn,    
  handleChange  
}) {
    console.log('Render readonly controls ' + isReadOnly)
    const cellMarkup = isReadOnly? (
    <Layout.Col span="6" key={iColumn}>
      <Form.Item  label={riskField.risk_type_field_name}>                                   
          <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} isReadOnly={true} value={riskField.risk_field_value} />  
      </Form.Item>
    </Layout.Col>
  ) : (
    <Layout.Col span="6" key={iColumn}>
        {         
        <Form.Item  label={riskField.risk_type_field_name} prop={riskField.risk_type_field_name} size="mini">                                              
            <RiskInput field_name={riskField.risk_type_field_name} field_type={riskField.risk_type_field_enum} formInputState={formInputState} value={riskField.risk_field_value} isReadOnly={false}  handleChange={handleChange} />  
        </Form.Item>
        }
    </Layout.Col>
  );

    
  return (cellMarkup);
}
*/