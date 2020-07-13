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

export const TOGGLE_LIKE = gql`
    mutation toggelLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: String!, $text: String!) {
        addComment(postId: $postId, text: $text) {
            id
            text
            user {
                username
            }
        }
    }
`;

export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                url
            }
            likeCount
            commentCount
        }
        searchUser(term: $term) {
            id
            avatar
            username
            isFollowing
            isSelf
        }
    }
`;

export const FOLLOW = gql`
    mutation follow($id: String!) {
        followUser(id: $id)
    }
`;

export const UNFOLLOW = gql`
    mutation unfollow($id: String!) {
        unfollowUser(id: $id)
    }
`;

export const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postsCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

export const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;