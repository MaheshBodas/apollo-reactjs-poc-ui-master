import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'element-react';
import { connect } from 'react-redux';
import { riskpicklistActions } from '../../_actions';

class RiskFieldTypeList extends Component {  
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selectedValue: PropTypes.string
  }  
  constructor(props) {
    console.log('Calling RiskTypeList constructor')
    super(props)
    this.props = props 
    if(this.props.selectedValue) {
      this.state = { value: this.props.selectedValue }
    } else {
      this.state = { value: 'text' }   
    }    
  }
  componentDidMount() {
    this.props.getRiskFieldTypeList();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  handleChange = (selectValue) => {    
    this.setState({ value: selectValue });
    this.props.onChange(selectValue)
  };
  
  render() {
    const { value } = this.state;
    return (
      <Select value={value} clearable={true} size="small" onChange={this.handleChange}>
        {
          this.props.fieldtypeoptions && this.props.fieldtypeoptions.map(el => {
            return <Select.Option key={el.value} label={el.label} value={el.value} />
          })
        }
      </Select>      
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication, riskpicklist } = state;        
  const { loggingIn } = authentication;
  const {type, message} = alert;
  const { fieldtypeoptions } = riskpicklist;
  // console.log('mapStateToProps FieldTypeOption' + fieldtypeoptions)
  return {      
    loggingIn,
    type,
    message,
    fieldtypeoptions
  }
  //TBD 
}


function mapDispatchToProps(dispatch) {
  return {
      // dispatching plain actions
      getRiskFieldTypeList: () => dispatch( riskpicklistActions.getRiskFieldTypeList() )        
  }
}

const connectedRiskFieldTypeList = connect(mapStateToProps , mapDispatchToProps)(RiskFieldTypeList);
export { connectedRiskFieldTypeList as RiskFieldTypeList }; 

