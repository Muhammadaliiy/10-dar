export function validator(obj) {
    if (obj.username.trim() === "") {
        return {
            target: "username",
            message: "Username is required",
        };
    }
    if (obj.password.trim() === "") {
        return {
            target: "password",
            message: "Password is required",
        };
    }
    return false;
}