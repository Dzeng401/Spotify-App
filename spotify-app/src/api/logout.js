
export const logout = async() => {
    try {
        await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        headers: {
            'Content-Type': 'applcation/json',
        },
        credentials: 'include'
    });
    }
    catch(error) {
        return;
    }
}