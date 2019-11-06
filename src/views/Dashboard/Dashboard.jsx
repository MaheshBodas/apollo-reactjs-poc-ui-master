import React, { Component } from 'react';
import { Layout } from 'element-react';
import { ComposableContainer } from './../../_components/ComposableContainer/ComposableContainer'
import { ToggleContainer } from './../../_components//ToggleContainer/ToggleContainer'
// import { RotatingDisplay } from './../../_components//RotatingDisplay/RotatingDisplay'
import { connect } from 'react-redux';
import { authenticationActions } from '../../_actions';
import styles from './Dashboard.css'
// import { DashboardConst } from './classes'
// Main Chart

export class Dashboard extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    console.log(this.props.user)
    this.props.getUserDetails(this.props.user);    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { type, message, user, userRoles } = this.props
    const errorInfo = {type: type, message: message}    
    return (      
    <div>      
      { this._isMounted && <ComposableContainer showHeader={true}>
      {{
        header:(
          <div style={{height:'90px', border: '1px', solid: '#eee'}}>
            <div style={styles.dashboardLabel}>Hi, {user} </div>
            <div style={styles.dashboardLabel}>Roles: {userRoles}</div>
            <div style={styles.dashboardLabel}>This site is best viewed with latest Firefox or Chrome with 80% zoom.</div>
            <br/>
          </div>
        ),
        content: (
          <ToggleContainer loading={this.props.loading} shouldDisplayMain={true} 
              showFooter={false} hasError={this.props.hasError} showSuccess={false}>
          {{
            warningmsg: (
              null
            ),              
            content: (                                    
              <div style={{width:'90%', border: '1px', solid: '#eee'}}>
                <Layout.Row>
                  <Layout.Col span="24" >
                    <h3>Create Risk Type</h3>
                  </Layout.Col>
                </Layout.Row>  
                <br/>              
                <Layout.Row>
                  <Layout.Col span="24" gutter="20">
                    <img src={'assets/img/avatars/createrisktype.jpg'} className="img-fluid" alt="Create Risk Type" />                                      
                  </Layout.Col>
                </Layout.Row>                
                <br/>
                <Layout.Row>
                  <Layout.Col span="24" style={styles.helpTextLabel}>
                     Admin User can define Risk types. User Enters Risk type name and description.
										  	Click Add Risk Type Field button to bring up dialog box where user define Risk type fields. User need to select Field type from Dropdown, either text / date / interger / currency / float and specify field name. Submit Risk type form after adding 
											/ editing Risk type	fields. Loosely speaking here user creates strcuture of n column wide entity.										                      
                  </Layout.Col>
                </Layout.Row> 
                <br/>
                <hr/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <h3>Create Risk Instance</h3>
                  </Layout.Col>
                </Layout.Row>
                <br/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <img src={'assets/img/avatars/createriskinstance.jpg'} className="img-fluid" alt="Create Risk Type" />                                      
                  </Layout.Col>
                </Layout.Row>
                <br/>
                <Layout.Row>
                  <Layout.Col span="24" style={styles.helpTextLabel} >
                    Only Admin user can create Risk Instance based on Risk types.Select appropriate Risk Type from dropdown box. Page will create dynamic forms to fill up all Risk Instance fields based on selected Risk Type. Risk Instance page will create appropriate control either Textinput or Date Select or Currency or Interger or float input control based on specified Risk field type. To keep things simple, required field validation is added for all risk fields by default. Hence user can not post form untill he/she fills out all fields. Form shows appropriate error message if any required field is left blank.
                  </Layout.Col>
                </Layout.Row>
                <br/>
                <hr/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <h3>View Single Risk</h3>
                  </Layout.Col>
                </Layout.Row>                
                <br/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <img src={'assets/img/avatars/viewriskinstance.jpg'} className="img-fluid" alt="Create Risk Type" />                                      
                  </Layout.Col>
                </Layout.Row>                
                <br/>
                <Layout.Row>
                  <Layout.Col span="24" style={styles.helpTextLabel}>
                      Any User can view details of Single Risk Instance. User will select Risk instance name from Auto Complete dropdown.
											Once user click Get Risk Detail button, Page will populate dynamic form having appropriate controls based on each Risk type field defined in given Risk Instance.
											Thus page will render either text or date or interger or currency or float control in readonly mode to show field value per Risk Field.										                      
                  </Layout.Col>
                </Layout.Row>
                <br/>
                <hr/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <h3>View All Risk</h3>
                  </Layout.Col>
                </Layout.Row>                
                <br/>
                <Layout.Row>
                  <Layout.Col span="24">
                    <img src={'assets/img/avatars/viewallrisk.jpg'} className="img-fluid" alt="Create Risk Type" />                                      
                  </Layout.Col>
                </Layout.Row>                
                <br/>
                <Layout.Row>
                  <Layout.Col span="24" style={styles.helpTextLabel}>
                      Any User can paginate through All Risk Instance(s) for selected Risk Type. User will select Risk Type name from Dropdown.
											Page will show Risk instance name, description along with all Risk Fields associated with given instance in tabular format.
                      User can navigate forward and backward through various pages of Risk Instances records for selected Risk Type.
                  </Layout.Col>
                </Layout.Row>                                         
              </div>
              // <RotatingDisplay helpTextArray={DashboardConst.CarouselHelpText}></RotatingDisplay>
            ),                
            errorInfo: errorInfo
          }}
        </ToggleContainer>
        )
      }}
      </ComposableContainer>
      }
    </div>
    );
    //
  }
}

function mapStateToProps(state) {
  const { alert, authentication } = state;
  const { user, loggedIn, isAdmin, loading, userRoles } = authentication;
  const {type, message} = alert;
  let hasError = false  
  
  if(type === 'alert-danger') {
    hasError = true
    console.log('This is an error')
  }

  return {
      user,
      userRoles,
      loggedIn,
      type,
      message,      
      loading,
      isAdmin,
      hasError
  };
}

function mapDispatchToProps(dispatch) {
  return {
      // dispatching plain actions
      getUserDetails : (userName) => dispatch( authenticationActions.getUserDetails(userName))      
  }
}

// const connectedDashboard = connect(mapStateToProps , mapDispatchToProps)(Dashboard);
// export { connectedDashboard as Dashboard };

const ConnectedDashboard = connect(mapStateToProps , mapDispatchToProps)(Dashboard);
export default ConnectedDashboard

// export default connect(mapStateToProps , mapDispatchToProps)(Dashboard);

// export default Dashboard;
/* <Row>
  <Col>
    <Card>
      <CardHeader>
        <span> LoggedIn User is {user} </span>
        <span> User Role is {userRoles} </span>
        <span> Has loggedIn {loginStatus} </span>
        <span> Avatar is {avatar} </span>
      </CardHeader>              
    </Card>
  </Col>
</Row> */