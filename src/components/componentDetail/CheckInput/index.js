const Validator = {
    CheckSpecialCharacter: (str) => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return format.test(str);
    },
    CheckUserValid: (str) => {
        if (str.length === 0) {
            return false;
        }
        return true;
    },
    CheckPassValid: (pass) => {
        if (pass.length < 6 || this.CheckSpecialCharacter(pass)) {
            return false;
        }
        return true;
    },
    CheckRePassValid: (pass, rePass) => {
        if (rePass.length < 6 || this.CheckSpecialCharacter(rePass) || rePass !== pass) {
            return false;
        }
        return true;
    },
};

export default Validator;
