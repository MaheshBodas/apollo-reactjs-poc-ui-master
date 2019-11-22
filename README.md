# Apollo ReactJS PoC

> A Apollo ReactJS PoC is Front end application which consume GraphQL based server. Its sends GraphQL Queries to retrive data and uses GraphQL mutations to create objects on server side.

Here is brief introduction to functionality it offers.

1. Allow user to Create RiskTypes which is defining new Entity in system and attributes associated with that Entity.

2. Frontend makes use of GraphQL mutation and nested input types to create new RiskType (Entity on server)

and Risk based on RiskTypes. User can browse RiskTypes and Risk. It uses ReactJS, Redux for global state store, Redux-thunk middleware and Element React & TypeScript & axios & Redmond theme from jQuery UI, FontAwesome & permission control & lint

## Demo
![demo](https://github.com/MaheshBodas/reactjs-poc-ui-master/blob/master/blob/Dashboard.png)

## Build Setup

``` bash

# Clone project
git clone https://github.com/MaheshBodas/apollo-reactjs-poc-ui-master

# Install dependencies
npm install

# serve with hot reload at localhost:9528
serve -s build

# build for production with minification
react-scripts build

# Running unit test cases
npm run test

```


## License
[MIT](https://github.com/coreui/coreui-free-react-admin-template/blob/master/LICENSE) license.
[MIT](https://github.com/MaheshBodas/reactjs-poc-ui-master/LICENSE) license.

Copyright (c) 2018 creativeLabs Łukasz Holeczek.
Copyright ReactJS PoC (c) 2018-present Mahesh Bodas
