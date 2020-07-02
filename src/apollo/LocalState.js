export const isAuthenticated = () => !!(localStorage.getItem("token"));

export const defaults = {
    isLoggedIn: isAuthenticated()
};

export const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token");
            window.location = "/";
            return null;
        }
    }
};
