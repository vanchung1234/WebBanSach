const valid = ({ username, password, cfpassword, protectedCode }) => {
    const err = {};

    if (!username) {
        err.username = "Please add your user name.";
    } else if (username.replace(/ /g, "").length > 25) {
        err.username = "User name is up to 25 characters long.";
    }

    if (!password) {
        err.password = "Please add your password.";
    }

    if (!cfpassword) {
        err.cfpassword = "Please add your cfpassword.";
    }

    if (password !== cfpassword) {
        err.cfpassword = "Confirm password did not match.";
    }

    if (!protectedCode) {
        err.protectedCode = "Please add your protected code.";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length,
    };
};

export default valid;