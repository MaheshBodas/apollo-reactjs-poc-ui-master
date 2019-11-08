# reactjs-poc-ui-master

## Intro 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

It uses Sass (with .scss). The styles are loaded at the template level with n`ode-sass-chokidar` css preprocessor

Dependencies are handled by **npm**.

## Directories
```
reactjs-poc-ui-master\trunk#v1.0.0
|   .editorconfig
|   .env
|   .gitignore
|   CHANGELOG.md
|   CONTRIBUTING.md
|   CRA.md
|   LICENSE
|   package-lock.json
|   package.json
|   REACT.md
|   tsconfig.json
|   
|   
+---public
|   |   favicon.ico
|   |   index.html
|   |   manifest.json
|   |   
|   \---assets
|       |   .gitkeep
|       |   
|       \---img
|           |   favicon.png
|           |   
|           \---avatars
|                   7.jpg
|                   admin_office.gif
|                   createriskinstance.jpg
|                   createrisktype.jpg
|                   editor.gif
|                   Mahesh4.jpg
|                   viewallrisk.jpg
|                   viewriskinstance.jpg
|                   
\---src
    |   App.js
    |   App.scss
    |   ConnectedApp.js
    |   index.css
    |   index.js
    |   polyfill.js
    |   react-app-env.d.ts
    |   routes.js         (routes config)
    |   serviceWorker.js
    |   setupTests.js
    |   _nav.js           (sidebar config)
    |   
    +---api
    |       auth.js
    |       session.js
    |       table.js 
    |       apolloclient.js
	|  
    +---assets
    |   \---img
    |       \---brand
    |               logo.png
    |               logo.svg
    |               
    +---containers
    |   |   index.js
    |   |   
    |   \---DefaultLayout
    |           DefaultAside.js
    |           DefaultFooter.js
    |           DefaultHeader.js
    |           DefaultLayout.js
    |           ExportDefaultLayout.js
    |           index.js
    |           package.json
    |           
    +---icons
    |   |   index.js
    |   |   
    |   \---svg
    |           example.svg
    |           eye.svg
    |           form.svg
    |           password.svg
    |           table.svg
    |           tree.svg
    |           user.svg
    |           
    +---scss
    |   |   style.scss
    |   |   _custom.scss
    |   |   _ie-fix.scss
    |   |   _variables.scss
    |   |   
    |   \---vendors
    |           .gitkeep
    |           _variables.scss
    |           
    +---themes
    |   \---redmond
    |       |   jquery-ui.css
    |       |   jquery-ui.min.css
    |       |   theme.css
    |       |   
    |       \---images
    |               ui-bg_glass_75_d0e5f5_1x400.png
    |               ui-bg_glass_85_dfeffc_1x400.png
    |               ui-bg_glass_95_fef1ec_1x400.png
    |               ui-bg_gloss-wave_55_5c9ccc_500x100.png
    |               ui-bg_inset-hard_100_f5f8f9_1x100.png
    |               ui-bg_inset-hard_100_fcfdfd_1x100.png
    |               ui-icons_217bc0_256x240.png
    |               ui-icons_2e83ff_256x240.png
    |               ui-icons_469bdd_256x240.png
    |               ui-icons_6da8d5_256x240.png
    |               ui-icons_cd0a0a_256x240.png
    |               ui-icons_d8e7f3_256x240.png
    |               ui-icons_f9bd01_256x240.png
    |               
    +---utils
    |       auth.js
    |       commonutils.js
    |       createriskctrl.js
    |       createrisktypectrl.js
    |       index.js
    |       inputvalidation.js
    |       request.js
    |       risk.js
    |       riskfieldinstance.js
	|       stack.js
    |       validate.js
	|
	|
	+---_graphql
	|		authentication.graphql.js
	|		createrisktype.graphql.js
	|		createsinglerisk.graphql.js
	|		riskpicklist.graphql.js
	|		viewallrisks.graphql.js
	|		viewrisks.graphql.js
	|		viewsinglerisk.graphql.js
    |       
    +---views
    |   |   index.js
    |   |   
    |   +---AboutMe
    |   |       AboutMe.css.js
    |   |       AboutMe.jsx
    |   |       package.json
    |   |       
    |   +---Dashboard
    |   |       classes.js
    |   |       Dashboard.css.js
    |   |       Dashboard.jsx
    |   |       
    |   \---Login
    |           Login.jsx
    |           package.json
    |           
    +---_actions
    |       alert.actions.js
    |       authentication.actions.js
    |       createsinglerisk.action.js
    |       createsinglerisktype.action.js
    |       index.js
    |       riskpicklist.action.js
    |       user.actions.js
    |       viewrisks.action.js
    |       viewsinglerisk.actions.js
    |       
    +---_components
    |   |   utils.js
    |   |       
    |   | --- Start Top Level components in reactjs-poc-ui-master
    |   |
    |   +---CreateRiskCtrl
    |   |       CreateRiskCtrl.css
    |   |       CreateRiskCtrl.css.js
    |   |       CreateRiskCtrl.jsx
    |   |       
    |   +---CreateRiskTypeCtrl
    |   |       CreateRiskTypeCtrl.jsx
    |   |       
    |   +---ViewRiskCtrl
    |   |       ViewRiskCtrl.css
    |   |       ViewRiskCtrl.jsx
    |   |       
    |   \---ViewRiskGrid
    |           ViewRiskGrid.css
    |           ViewRiskGrid.css.js
    |           ViewRiskGrid.jsx
    |
    |   | --- End Top Level components   
    |
    |
    |   | --- Start components that define UI structure of Top Level components in reactjs-poc-ui-master
    |           
    |   +---ComposableContainer
    |   |       card.css
    |   |       ComposableContainer.tsx
    |   |       
    |   +---ToggleContainer
    |   |       card.css
    |   |       ToggleContainer.tsx
    |   |    
    |   |--- End components that define UI structure of Top Level components in in reactjs-poc-ui-master
    |
    |    
    |   | --- Start Helper components in reactjs-poc-ui-master
    |
    |   +---LoaderComponent
    |   |       LoaderComponent.jsx
    |   |       
    |   +---RiskDataCell
    |   |       RiskTableCell.jsx
    |   |       
    |   +---RiskDataTable
    |   |       RiskDataTable.css
    |   |       RiskDataTable.jsx
    |   |       
    |   +---RiskFieldTypeList
    |   |       RiskFieldTypeList.jsx
    |   |       
    |   +---RiskInput
    |   |       RiskInput.css
    |   |       RiskInput.jsx
    |   |       
    |   +---RiskList
    |   |       RiskList.jsx
    |   |       
    |   +---RiskTypeList
    |   |       RiskTypeList.jsx
    |   |       
    |   | --- End Helper components in reactjs-poc-ui-master
    |
    |
    |
    |   | --- Start Input components in reactjs-poc-ui-master
    |    
    |
    |   +---RiskInput             (Main driver component which decide what Control to render based on field_type)
    |   |       RiskInput.css
    |   |       RiskInput.jsx
    |   |       
    |   +---CurrencyInput
    |   |       CurrencyInput.css
    |   |       CurrencyInput.jsx
    |   |       
    |   +---DateInput
    |   |       DateInput.jsx
    |   |       
    |   +---FloatInput
    |   |       FloatInput.css
    |   |       FloatInput.jsx
    |   |       
    |   +---IntegerInput
    |   |       IntegerInput.css
    |   |       IntegerInput.jsx
    |   |       
    |   +---TextInput
    |   |       TextInput.css
    |   |       TextInput.jsx
    |   |           
    | --- End Input components in reactjs-poc-ui-master
    |
    |
    +---_constants
    |       alert.constants.js
    |       authentication.constants.js
    |       createsinglerisk.constants.js
    |       createsinglerisktype.constants.js
    |       index.js
    |       riskpicklist.constants.js
    |       user.constants.js
    |       viewrisks.constants.js
    |       viewsinglerisk.constants.js
    |       
    +---_data
    |       allrisks.json
    |       get_single_risk_success_response.json
    |       riskkeys.json
    |       risktypekeys.json
    |       singlerisk.json
    |       
    +---_helpers
    |       auth-header.js
    |       fake-backend.js
    |       history.js
    |       index.js
    |       store.js
    |       
    +---_images
    |       ListLoading.gif
    |       
    +---_reducers
    |       alert.reducer.js
    |       authentication.reducer.js
    |       createsinglerisk.reducer.js
    |       createsinglerisktype.reducer.js
    |       index.js
    |       registration.reducer.js
    |       riskpicklist.reducer.js
    |       spliceriskfields.reducer.js
    |       users.reducer.js
    |       viewrisks.reducer.js
    |       viewsinglerisk.reducer.js
    |       
    +---_services
    |       authentication.services.js
    |       createsinglerisk.services.js
    |       createsinglerisktype.services.js
    |       index.js
    |       riskpicklist.service.js
    |       user.service.js
    |       viewallrisks.services.js
    |       viewsinglerisk.services.js
    |       
    +---__mocks__
    |       axios.js
    |       
    \---__tests__
            App.test.js
            Dashboard.test.jsx
            DefaultFooter.test.js
            DefaultHeader.test.js
            DefaultLayout.test.js
            RiskInput.test.js
            ToggleContainer.test.js
            ViewRiskCtrl.test.jsx
            viewsinglerisk.actions.test.js
            viewsinglerisk.reducer.test.js
            

```


        

## Usage
`npm i` - to install dependencies

## Sctipts 
`npm start` for developing (it runs webpack-dev-server)  
`npm run build` to run a dev build  

## See also
[Create-React-App](CRA.md)
[Changelog](./CHANGELOG.md)  
[Readme](./README.md)
