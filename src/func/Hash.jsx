export function Hash() {
    var characters = '1234567890ABCDEFGHIJKLMNOVQRSTUWXYZabcdefghijklmnovqrstuwxyz';
    var randomString = '';
    var length = 15;

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

export function Token() {
    var characters = '1234567890ABCDEFGHIJKLMNOVQRSTUWXYZabcdefghijklmnovqrstuwxyz';
    var randomString = '';
    var length = 15;

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

export function IdNumber() {
    var characters = '1234567890';
    var randomString = '';
    var length = 10;

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}
export function Otp() {
    var characters = '1234567890';
    var randomString = '';
    var length = 5;

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

// export function Otp () {
//     var randomNumber = Math.floor(Math.random() * 10000); // Menghasilkan angka acak antara 0 dan 99999
//     return randomNumber;
// }