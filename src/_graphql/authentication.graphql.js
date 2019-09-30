import gql from 'graphql-tag';
export const authenticationGraphQL = {    
    GET_USER_DETAILS_QUERY: gql`
        query getUserDetails($user_name:String!) {
            userdata:user(username:$user_name){
            id,
            username,
            is_superuser
            }
        }`    
}