

export const userAuth = async() => {
    try {
        const response = await fetch("http://localhost:8080/auth/authenticate", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        });
        if (response.status === 200) {
            return "valid";
        }
        else {
            return "error"
        }
    }
    catch(error) {
        return "error";
    }
}