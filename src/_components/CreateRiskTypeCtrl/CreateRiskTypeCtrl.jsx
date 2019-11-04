import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Layout, Form, Dialog, Table, Notification } from 'element-react';
import { ComposableContainer } from './../ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../ToggleContainer/ToggleContainer'
import { RiskFieldTypeList } from './../RiskFieldTypeList/RiskFieldTypeList'
import { createsinglerisktypeActions} from '../../_actions';


const emptyRiskTypeobj = {}
const emptyRiskTypeField = {
    id: undefined,
    risk_type_field_name: '',
    risk_type_field_enum: 'text',
    risk_type_field_description: ''
    }
const emptyRulesArray = {}
// const emptyrisktypefieldTableColumns = []
const emptyRiskTypeFieldInstances = []
class CreateRiskTypeCtrl extends Component {
    constructor(props) {
        super(props);     
        console.log('constructor CreateRiskTypeCtrl')           
        this.state = {              
            showCreateDialog: true,
            dialogVisible: false,
            risktypeform: {
              risk_type_name: '',              
              risk_type_description: ''
            },            
            risktypefieldform: {
              id: undefined,
              risk_type_field_name: '',
              risk_type_field_enum: 'text',
              risk_type_field_description: ''
            }
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleCreate = (data) => {
      // event.preventDefault();  
      console.log("handleCreate")
      this.setState({
        risktypefieldform: Object.assign({}, this.props.risktypefieldform),
        showCreateDialog: true,
        dialogVisible: true
      });
      console.log(data)      
    }
    
    handleUpdate = (data) => {
      // event.preventDefault();  
      console.log("handleUpdate")
      this.setState({
        risktypefieldform: Object.assign({}, this.state.risktypefieldform, data),
        showCreateDialog: false,
        dialogVisible: true
      });
      console.log(data)      
    }
        
    handleDelete = (data) => {
      // event.preventDefault();  
      console.log("handleUpdate")
      this.props.deleteRiskTypeField(data).then(response => {          
      })   
      console.log(data)      
    }
    
    componentDidMount() {
      if(this.props.isAdmin) {
        this.props.getRiskType()
      }      
    }
    
    onRiskFieldTypeListChange = event => {
      const selectedValue = (event !== '') ? event : 'None'      
      console.log('onRiskFieldTypeListChange selectedValue is ' + selectedValue)
      if(selectedValue !== 'None') {
        this.setState({
          risktypefieldform: Object.assign({}, this.state.risktypefieldform, { risk_type_field_enum: selectedValue })
        });                    
      } 
    }        
    

    onChange(key, value) {
      if(key === 'risk_type_field_name'){
        value = value.toLowerCase()
      }
      this.setState({
        risktypefieldform: Object.assign({}, this.state.risktypefieldform, { [key]: value })
      });      
    }
    
    onRiskTypeChange(key, value) {
      this.setState({
        risktypeform: Object.assign({}, this.state.risktypeform, { [key]: value })
      });      
    }

    clearRiskFormData() {      
      if(this.refs.risktypefieldform) {
        this.refs.risktypefieldform.resetFields();
      }
      this.setState({
        risktypefieldform: Object.assign({}, {})
      });         
    }

    resetRiskTypeFieldFormData() { 
      this.setState({
        risktypefieldform: Object.assign({}, this.state.risktypefieldform, emptyRiskTypeField),
        dialogVisible: false
      }); 
      if(this.refs.risktypefieldform)          
        this.refs.risktypefieldform.resetFields();        
    } 

    //
    resetRiskTypeFormData() { 
      this.setState({
        risktypeform: Object.assign({}, this.state.risktypeform, emptyRiskTypeField),
        dialogVisible: false
      }); 
      if(this.refs.risktypeform)          
        this.refs.risktypeform.resetFields();        
    } 
    //

    //
    isDuplicateRiskTypeField() {
      let {risktypefieldform} = this.state
      var isDuplicateRiskTypeField = true      
      var value = risktypefieldform.risk_type_field_name
      var iIndex = this.props.risktypefields.findIndex((node) => node.risk_type_field_name === value)
      if (iIndex === -1) {
        isDuplicateRiskTypeField = false
      }
      return isDuplicateRiskTypeField
    }
    //
    createRiskTypeFieldData = event => {
      let {risktypefieldform} = this.state
      this.refs.risktypefieldform.validate((valid) => {
        if (valid) {          
            var bIsDuplicateRiskTypeField = this.isDuplicateRiskTypeField()
            if(!bIsDuplicateRiskTypeField) {
              console.log('this.state.risktypefieldform')
              console.log(this.state.risktypefieldform)
              Object.keys(this.state.risktypefieldform).forEach((key) => {
                console.log('key is ' + key + ' Having value ' + this.state.risktypefieldform[key]);              
              });    
              risktypefieldform.id = new Date().getTime()
              this.props.addRiskTypeField(risktypefieldform).then(response => {  
                Notification({
                  title: 'Success',
                  message: 'Risk Type Field created successfully',
                  type: 'success',
                  duration: 2000
                }) 
                this.resetRiskTypeFieldFormData()      
              })              
            } else {
              Notification({
                title: 'Error',
                message: 'Duplicate Risk Type Field',
                type: 'error',
                duration: 2000
              })
            }          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }    
    editRiskTypeFieldData = event => {      
      this.refs.risktypefieldform.validate((valid) => {
        if (valid) {          
          console.log('this.state.risktypefieldform')
          console.log(this.state.risktypefieldform)
          Object.keys(this.state.risktypefieldform).forEach((key) => {
            console.log('key is ' + key + ' Having value ' + this.state.risktypefieldform[key]);              
          });    
          // risktypefieldform.id = new Date().getTime()
          this.props.editRiskTypeField(this.state.risktypefieldform).then(response => {          
            Notification({
              title: 'Success',
              message: 'Risk Type Field edited successfully',
              type: 'success',
              duration: 2000
            }) 
            this.resetRiskTypeFieldFormData()              
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }    
    onClickSubmit = event => {    
      const {risktypeform} = this.state
      event.preventDefault();     
      this.refs.risktypeform.validate((valid) => {
        if (valid) {
          // alert('submit!');
          if (this.props.risktypefields.length === 0) {
            Notification({
              title: 'Failure',
              message: 'You must add Risk Type Field(s)',
              type: 'error',
              duration: 2000
            })
            return
          }
          console.log('this.state.risktypeform')
          console.log(this.state.risktypeform)
          Object.keys(this.state.risktypeform).forEach((key) => {
            console.log('key is ' + key + ' Having value ' + this.state.risktypeform[key]);              
          });    
          
          this.props.createRiskType(risktypeform, this.props.risktypefields, this.state.detailform).then(response => {          
            Notification({
              title: 'Success',
              message: 'Risk Type created successfully',
              type: 'success',
              duration: 2000
            })
            this.resetRiskTypeFormData()            
          })
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });      
    }
    
    onClickCancel = event => {      
      event.preventDefault();  
      this.resetRiskTypeFieldFormData()
      this.refs.risktypefieldform.resetFields();   
    }

    onDialogCancel =  event => {    
      console.log('onDialogCancel')  
      event.preventDefault();  
      this.resetRiskTypeFieldFormData()      
    }

    componentDidCatch(error, info) {
      console.log('componentDidCatch ' + error)      
    }

    
    setListLoading(isLoading) {
      this.setState({ listLoading: isLoading })         
    }
    
    getDialogTitle() {
      const {showCreateDialog} = this.state
      if(showCreateDialog) {
        return 'Create'
      }
      return 'Update'
    }

    onClickAddRiskFieldType() {
      this.setState({ dialogVisible: true})
    }
    
    render() {    
      const parent = this  
      const {type, message,risktypefieldTableColumns,risktypefields,isAdmin, loading} = this.props;    
      const {showCreateDialog, dialogVisible} = this.state
      const dialogTitle = showCreateDialog ? 'Create' : 'Update'
      const risktypename_validator = this.props.risktypename_validator || emptyRulesArray
      const risktypefield_validator = this.props.risktypefield_validator || emptyRulesArray
      let oRiskTypeFieldTableColumns = []
      if(risktypefieldTableColumns) {
        oRiskTypeFieldTableColumns.push(...risktypefieldTableColumns)
        oRiskTypeFieldTableColumns.push({
          label: "Action",
          render: function(data) {
            // console.log(parent)
            return (
              <span>
              <Button size="small" onClick={ parent.handleUpdate.bind(parent ,data)}>Edit</Button>
              <Button type="danger" size="small" onClick={ parent.handleDelete.bind(parent ,data)} >Delete</Button>
              </span>
            )
          }
        })
      }
      
      const strUnauthorizeMsg = "You do not have permission to access this page."
      const strContactAdmin = "Please contact Site Admin."      
      const oRiskTypeFieldInstancesArray = risktypefields || emptyRiskTypeFieldInstances
      const errorInfo = {type: type, message: message}       
      let risktype = this.state.risktypeform || emptyRiskTypeField
      let risktypefield = this.state.risktypefieldform || emptyRiskTypeField
      

      console.log('Dialog is visible')
      console.log(dialogVisible)
      return (
        <div>
          { isAdmin &&  
          <Dialog
            title= {dialogTitle}   
            size="tiny"         
            visible={ dialogVisible }            
            onCancel={ () => this.setState({ dialogVisible: false }) }          >
            <Dialog.Body>
              <Form id="risktypefieldform" ref="risktypefieldform" model={risktypefield} rules={risktypefield_validator} labelPosition="top" labelWidth="80px" size="mini"  style={{flex:1, align:'left', marginLeft:5}} >
                  <Layout.Row  gutter="20">
                      <Layout.Col span="16">                        { 
                        <Form.Item label="Name" prop="risk_type_field_name">
                            { showCreateDialog && <Input value={risktypefield.risk_type_field_name} size="small" onChange={this.onChange.bind(this, 'risk_type_field_name')}/> }
                            { (!showCreateDialog) && <Input value={risktypefield.risk_type_field_name} size="small" readOnly /> }
                        </Form.Item> 
                      }
                      </Layout.Col>                  
                    </Layout.Row>
                    <Layout.Row>
                      <Layout.Col span="16">                        { 
                        <Form.Item label="Enum" prop="risk_type_field_enum">                            
                            { showCreateDialog && <RiskFieldTypeList onChange={this.onRiskFieldTypeListChange}></RiskFieldTypeList> }
                            { (!showCreateDialog) && <RiskFieldTypeList selectedValue={risktypefield.risk_type_field_enum} onChange={this.onRiskFieldTypeListChange}></RiskFieldTypeList> }
                        </Form.Item> 
                      }
                      </Layout.Col>
                    </Layout.Row>
                    <Layout.Row>
                      <Layout.Col span="16">                        { 
                        <Form.Item label="Description" prop="risk_type_field_description">
                            <Input value={risktypefield.risk_type_field_description} size="small" onChange={this.onChange.bind(this, 'risk_type_field_description')}/>
                        </Form.Item> 
                      }
                      </Layout.Col>
                    </Layout.Row>                                                      
              </Form>
            </Dialog.Body>

            <Dialog.Footer className="dialog-footer">
              <Layout.Row gutter="20">
                <Layout.Col span="16">
                  <Button size="small" onClick={this.onDialogCancel}>Cancel</Button>
                  { showCreateDialog && <Button type="primary" size="small" onClick={this.createRiskTypeFieldData}>Create</Button>
                  }
                  { (!showCreateDialog) && <Button type="primary" size="small" onClick={this.editRiskTypeFieldData}>Update</Button>
                  }
                </Layout.Col>                                        
              </Layout.Row>                              
            </Dialog.Footer>
          </Dialog>
          }
          <ComposableContainer showHeader={false}>
          {{
            content: (
              <ToggleContainer loading={loading} shouldDisplayMain={isAdmin} 
                  showFooter={isAdmin} hasError={this.props.hasError}>
              {{
                warningmsg: (
                  <Form ref="warningform" labelPosition="left" style={{flex:1, align:'left', marginLeft:5}} model={emptyRiskTypeobj}>
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">
                          { (!isAdmin) && <h4>                            
                            { strUnauthorizeMsg } <br />
                            { strContactAdmin }                                                       
                          </h4>
                          }
                        </Layout.Col>                                        
                  </Layout.Row>
                </Form>
                ),                                           
                content: (               
                  <div className='parent'>
                    <Form id="risktypeform" ref="risktypeform" model={risktype} rules={risktypename_validator} labelPosition="left" labelWidth="120px" size="mini"  style={{flex:1, align:'left', marginLeft:5}} >
                      <Layout.Row  gutter="20">
                        <Layout.Col span="8">                        { 
                          <Form.Item label="Name" prop="risk_type_name">
                              <Input value={this.state.risktypeform.risk_type_name} size="small" onChange={this.onRiskTypeChange.bind(this, 'risk_type_name')}/>
                          </Form.Item> 
                        }
                        </Layout.Col>                  
                        <Layout.Col span="8">                        { 
                          <Form.Item label="Description" prop="risk_type_description">
                              <Input value={this.state.risktypeform.risk_type_description} size="small" onChange={this.onRiskTypeChange.bind(this, 'risk_type_description')}/>
                          </Form.Item> 
                        }
                        </Layout.Col>
                    </Layout.Row>     
                    <Layout.Row gutter="20">
                        <Layout.Col span="16">                        
                        { <Button type="primary" size="small" onClick={ this.handleCreate }>Add Type Field</Button>}                        
                        </Layout.Col>                                        
                  </Layout.Row>  
                  <Layout.Row gutter="20">
                        <Layout.Col span="16">                                                
                        </Layout.Col>                                        
                  </Layout.Row>
                  <br/>                                                                                      
                  { (oRiskTypeFieldInstancesArray.length > 0) &&
                   <Table 
                    style={{width: '100%'}}
                    action={this.handleUpdate}
                    columns={oRiskTypeFieldTableColumns} 
                    data={oRiskTypeFieldInstancesArray}
                    height={250}
                  />
                  }
                </Form>
                </div>
                ),
                footer: (
                  <Layout.Row gutter="20" justify="end">
                    <Layout.Col>
                      <Button type="primary" onClick={this.onClickSubmit}>Submit</Button>
                    </Layout.Col>                        
                  </Layout.Row>                              
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
    const { alert, authentication, createsinglerisktype } = state;
    const { isAdmin, loggedIn } = authentication;
    const {type, message} = alert;
    const { risktypeform, risktypefieldform, risktypename_validator, risktypefield_validator, risktypefieldTableColumns, risktypefields } = createsinglerisktype;    
    
    let hasError = false
    if(type === 'alert-danger') {
      hasError = true
      console.log('This is an error')
    }    
    
    return {      
      loggedIn,
      type,
      message,
      risktypeform,      
      risktypefieldform,
      risktypename_validator, 
      risktypefield_validator, 
      risktypefieldTableColumns,
      risktypefields,
      isAdmin,
      hasError
    }    
}

function mapDispatchToProps(dispatch) {
    return {   
        getRiskType: () => dispatch( createsinglerisktypeActions.getRiskType() ),
        addRiskTypeField: (risktypefieldform) => dispatch( createsinglerisktypeActions.addRiskTypeField(risktypefieldform)),
        editRiskTypeField: (risktypefieldform) => dispatch( createsinglerisktypeActions.editRiskTypeField(risktypefieldform)),
        deleteRiskTypeField: (risktypefieldform) => dispatch( createsinglerisktypeActions.deleteRiskTypeField(risktypefieldform)),
        createRiskType: (strRiskTypeName, strRiskTypeDesc, risktypefields) => dispatch (createsinglerisktypeActions.createRiskType(strRiskTypeName, strRiskTypeDesc, risktypefields)),
    }
}

const connectedCreateRiskTypeCtrl = connect(mapStateToProps , mapDispatchToProps)(CreateRiskTypeCtrl);
export { connectedCreateRiskTypeCtrl as CreateRiskTypeCtrl }; 