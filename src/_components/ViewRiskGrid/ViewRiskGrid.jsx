import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Layout, Form, Table } from 'element-react';
import { viewRisksActions} from '../../_actions';
import {viewrisksConstants} from '../../_constants';
import styles from './ViewRiskGrid.css.js'
import './ViewRiskGrid.css';

import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'
import { RiskTypeList } from './../RiskTypeList/RiskTypeList'

// const ComposableContainer = React.lazy(() => import('./../ComposableContainer/ComposableContainer').then(module => ({ default: module.ComposableContainer })))
// const ToggleContainer = React.lazy(() => import('./../ToggleContainer/ToggleContainer').then(module => ({ default: module.ToggleContainer })))
// const RiskTypeList = React.lazy(() => import('./../RiskTypeList/RiskTypeList').then(module => ({ default: module.RiskTypeList })))


const emptySelectRiskInstance = {}
const emptyColumnNames = []
class ViewRiskGrid extends Component {
    _isMounted = false
    constructor(props) {
        super(props);     
        console.log('constructor ViewAllRiskCtrl')
        this.state = {
          isMounted: false      
        }; 
        this.props.resetRisks()        
    }
    
    componentDidMount() {
      console.log(this.props.user)
      this._isMounted = true
    }
  
    componentWillUnmount() {
      this._isMounted = false
    }

    onRiskTypeChange = event => {
      const PER_PAGE_RECORDS = viewrisksConstants.GET_RISKS_PAGE_SIZE
      const selectedValue = (event !== '') ? event : 'None'      
      console.log('onRiskTypeChange selectedValue is ' + selectedValue)
      
      // Fetch data related to selected RiskType
      if(selectedValue !== 'None') { 
        if(this._isMounted) {                 
          this.props.getRisks(selectedValue, PER_PAGE_RECORDS, undefined)
        }
      } else {
        console.log('Dispacting resetAllRisks')        
        if(this._isMounted) {         
          this.props.resetRisks()
        }
      }
    }

    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)                
    }        

    render() {            
      const {type, message, risk_type_id, record_count, riskInstancesTable, riskInstanceTableColumns, pageInfo} = this.props;      
      const errorInfo = {type: type, message: message}      
      const oRiskTableColumns = riskInstanceTableColumns || emptyColumnNames      
      console.log('riskInstancesTable')    
      // console.log(riskInstancesTable)            
      return (
        <div>           
          <ComposableContainer showHeader={true}>
          {{
            header:(
              <Form ref="form" labelPosition="left" style={styles.formselectriskinstance}  model={emptySelectRiskInstance} label-position="left" label-width="130px">
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                      <Form.Item label="Select Risk Type" labelWidth="120px">                        
                        <RiskTypeList disabled={this.props.loading} onChange={this.onRiskTypeChange}></RiskTypeList>
                      </Form.Item>                      
                    </Layout.Col>              
                </Layout.Row>
              </Form>     
            ),
            content: (
              <ToggleContainer loading={this.props.loading} shouldDisplayMain={this.props.shouldDisplayMain} 
                  showFooter={this.props.showFooter} hasError={this.props.hasError} showSuccess={this.props.showSuccessMsg}>
              {{
                warningmsg: (
                  <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptySelectRiskInstance}>
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                          <h4>Invalid Risk Type Name or No Data found</h4>
                        </Layout.Col>                                        
                  </Layout.Row>
                </Form>
                ),              
                content: (               
                  <div className="ui-tabs ui-widget ui-widget-content ui-corner-all">                      
                    { riskInstancesTable && <Table 
                          style={{width: '100%'}}                          
                          columns={oRiskTableColumns} 
                          data={riskInstancesTable}
                          border={true}
                          height={250}
                     />
                    } 
                    <br/>  
                    {
                      riskInstancesTable && pageInfo && 
                      <Pagination>
                        <Pagination.Item disabled={!pageInfo.hasPreviousPage} 
                          onClick={() => this.props.getPrevRisks(risk_type_id, record_count, pageInfo.lastFetchedCursor)}>&larr; Previous Page</Pagination.Item>
                        <Pagination.Item disabled={!pageInfo.hasNextPage} 
                          onClick={() => this.props.getNextRisks(risk_type_id, record_count, pageInfo.endCursor)}>Next Page &rarr;</Pagination.Item>
                      </Pagination>
                    }                 
                  </div>
                ),                
                errorInfo: errorInfo
              }}
            </ToggleContainer>
            )
          }}
          </ComposableContainer>
        </div>
      );      
    }
}

function mapStateToProps(state) {
    // const { alert, authentication, viewallrisks } = state;        
    const { alert, authentication, viewrisks } = state;        
    const { loggingIn } = authentication;
    const {type, message} = alert;
    const { risk_type_id, record_count, riskInstancesTable, riskInstanceTableColumns, pageInfo, loading } = viewrisks;        
    
    let shouldDisplayMain = false    
    let showFooter = false    
    let hasError = false
    
    if(riskInstancesTable && riskInstancesTable.length > 0) {
      shouldDisplayMain = true   
      showFooter = true
    }

    if(type === 'alert-danger') {
      hasError = true
      console.log('This is an error')
    }    
    console.log('mapStateToProps Single risk' + viewrisks)    
    return {      
      loggingIn,
      type,
      message,
      shouldDisplayMain,
      showFooter,
      risk_type_id,
      record_count,
      riskInstancesTable,
      riskInstanceTableColumns,
      pageInfo,      
      loading,
      hasError
    }    
}

function mapDispatchToProps(dispatch) {
    return {        
        getRisks: (risktypeid, record_count, fetchAfterCursor) => dispatch( viewRisksActions.getRisks(risktypeid, record_count, fetchAfterCursor) ),        
        getNextRisks: (risktypeid, record_count, fetchAfterCursor) => dispatch( viewRisksActions.getNextRisks(risktypeid, record_count, fetchAfterCursor) ),        
        getPrevRisks: (risktypeid, record_count, fetchAfterCursor) => dispatch( viewRisksActions.getPrevRisks(risktypeid, record_count, fetchAfterCursor) ),        
        resetRisks: () => dispatch(viewRisksActions.resetRisks())
    }
}

const connectedViewRiskGrid = connect(mapStateToProps , mapDispatchToProps)(ViewRiskGrid);
export { connectedViewRiskGrid as ViewRiskGrid }; 
