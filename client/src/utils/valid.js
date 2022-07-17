const valid = ({ username, password, cfpassword, protectedCode }) => {
    const err = {};

    if (!username) {
        err.username = "Hãy nhập vào tên đăng nhập.";
    }

    if (!password) {
        err.password = "Hãy nhập vào mật khẩu.";
    }

    if (!cfpassword) {
        err.cfpassword = "Hãy nhập vào nhập vào mật khẩu.";
    }

    if (password !== cfpassword) {
        err.cfpassword = "Nhập lại mật khẩu không đúng với mật khẩu.";
    }

    if (!protectedCode) {
        err.protectedCode = "Hãy nhập mã bảo vệ.";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length,
    };
};

export default valid;