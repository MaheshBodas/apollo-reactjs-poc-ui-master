import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'element-react';
import { connect } from 'react-redux';
import { riskpicklistActions } from '../../_actions';

class RiskTypeList extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired    
  }  

  constructor(props) {
    console.log('Calling RiskTypeList constructor')
    super(props)
    this.props = props    
    // this.state = { selectedValue: '', isMounted: false }    
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getRiskTypeKeys(); 
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false   
  }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  handleChange = (selectValue) => {  
    if(this._isMounted) {
      // this.setState({ selectedValue: selectValue });
      this.props.onChange(selectValue)
    }
  };

  render() {
    // const { selectedValue } = this.state;
    return (
      // <Select value={selectedValue} clearable={true} onChange={this.handleChange}>
      <Select clearable={true} disabled={this.props.disabled} loading={this.props.loading} onChange={this.handleChange} size="small" className="ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-closed ui-corner-all">
        {
          this.props.risktypekeys && this.props.risktypekeys.map(el => {
            return <Select.Option key={el.id} label={el.risk_type_name} value={el.id} />
          })
        }
      </Select>
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication, riskpicklist } = state; 
  // console.log('riskpicklist ' + riskpicklist.risktypelist.length)       
  const { loggingIn } = authentication;
  const {type, message} = alert;
  const { risktypekeys, loading } = riskpicklist; 
  
  // console.log('mapStateToProps risktypekeys' + risktypekeys)
  return {      
    loggingIn,
    type,
    message,
    risktypekeys,
    loading    
  }  
}


function mapDispatchToProps(dispatch) {
  return {
      // dispatching plain actions
      getRiskTypeKeys: () => dispatch( riskpicklistActions.getRiskTypeKeys() )      
  }
}

const connectedRiskTypeList = connect(mapStateToProps , mapDispatchToProps)(RiskTypeList);
export { connectedRiskTypeList as RiskTypeList }; 

