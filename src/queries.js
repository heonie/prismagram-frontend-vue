import { gql } from "apollo-boost";

export const LOG_IN = gql`
    mutation requestSecret($email: String!) {
        requestSecret(email: $email)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $firstName: String
        $lastName: String
    ) {
        createAccount(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
        )
    }
`;

export const CONFIRM_SECRET = gql`
    mutation confirmSecret($secret: String!, $email: String!) {
        confirmSecret(secret: $secret, email: $email)
    }
`;

export const LOCAL_LOG_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;

export const ME = gql`
    {
        me {
            username
        }
    }
`;

export const SEE_FEED = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                avatar
                username
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    username
                }
            }
            createdAt
        }
    }
`;