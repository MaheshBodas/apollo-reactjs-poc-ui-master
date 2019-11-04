import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'element-react';
import { connect } from 'react-redux';
import { riskpicklistActions } from '../../_actions';

class RiskList extends Component {
  _isMounted = false

  static propTypes = {
    onChange: PropTypes.func.isRequired    
  }
  
  constructor(props) {    
    console.log('Calling RiskList constructor')
    super(props)
    this.props = props    
    // this.state = { selectedValue: '' }
    this.handleChange = this.handleChange.bind(this)  
  }
  
  componentDidMount() {
    this._isMounted = true
    this.props.getRiskKeys()
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
    // const { selectedValue = '' } = this.state;
    return (      
        // <Select value={selectedValue} clearable={true} onChange={this.handleChange}>        
        <Select clearable={true} disabled={this.props.disabled} loading={this.props.loading} onChange={this.handleChange} size="small" className="ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-closed ui-corner-all">
          {
            this.props.riskkeys && this.props.riskkeys.map(el => {
              return <Select.Option key={el.id} label={el.risk_name} value={el.id} />
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
  const { riskkeys, loading } = riskpicklist;   
  // console.log('mapStateToProps risktypekeys' + riskkeys)
  return {      
    loggingIn,
    type,
    message,
    riskkeys,
    loading    
  }
  //TBD 
}


function mapDispatchToProps(dispatch) {
  return {
      // dispatching plain actions
      getRiskKeys: () => dispatch( riskpicklistActions.getRiskKeys() )
      // getRiskKeys: () => dispatch( riskpicklistActions.getRiskKeys() )        
  }
}

const connectedRiskList = connect(mapStateToProps , mapDispatchToProps)(RiskList);
export { connectedRiskList as RiskList }; 

