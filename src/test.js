
function generateIllegalNames(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnmςερτυθιοπασδφγηξκλζχψωβνμΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    let output = "";
    var length;
    if (illegal) {
        length = 30
        if (Math.random() < 0.5) {
            length = 0
        }
        let counting = length * Math.random() + length;
        const illegalchars = "<>?:\"{}+_)(*&^%$#@!~`,.;/'][=-😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
        let chosenCharSet = charset;
        if (Math.random() < 0.5) {
            chosenCharSet = illegalchars;
        }
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * chosenCharSet.length);
            output += chosenCharSet.substring(charIndex, charIndex + 1);
        }
    } else {
        let counting = 25 * Math.random() + 1
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * charset.length);
            output += charset.substring(charIndex, charIndex + 1);
        }
    }
    return output
}
function generateIllegalSalutations(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnmςερτυθιοπασδφγηξκλζχψωβνμΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    let output = "";
    var length;
    if (!illegal) {
        // correct length length 
        length = 6
        let counting = length * Math.random() + 1;
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * charset.length);
            output += charset.substring(charIndex, charIndex + 1);
        }

    } else {
        const illegalchars = "<>?:\"{}+_)(*&^%$#@!~`,.;/'][=-😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
        let chosenCharSet = charset;
        if (Math.random() < 0.5) {
            // wrong charset 
            chosenCharSet = illegalchars;
            for (let i = 0; i < 6; i++) {
                let charIndex = Math.floor(Math.random() * chosenCharSet.length);
                output += chosenCharSet.substring(charIndex, charIndex + 1);
            }
        } else {
            // wrong length 
            let counting = 8 * Math.random() + 9
            if (Math.random() < 0.5) {
                counting = 0
            }
            for (let i = 0; i < counting; i++) {
                let charIndex = Math.floor(Math.random() * chosenCharSet.length);
                output += chosenCharSet.substring(charIndex, charIndex + 1);
            }
        }

    }
    return output
}

function generateIllegalLongInput(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnm         ,./;'[]=-0987654321!@#$%^&*()_+;      ςερτυθιοπασδφγηξκλζχψωβνμ:        ΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜ      ضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    const illegalchars = "😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾"
    let output = "";
    var length;
    if (illegal) {
        length = 30
        let counting = length * Math.random() + length;
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * illegalchars.length);
            output += illegalchars.substring(charIndex, charIndex + 1);
            if (Math.random() < 0.5) {
                charIndex = Math.floor(Math.random() * charset.length);
                output += charset.substring(charIndex, charIndex + 1);
            }
        }
    } else {
        let counting = 30 * Math.random() + 1
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * charset.length);
            output += charset.substring(charIndex, charIndex + 1);
        }
    }
    return output
}

function generateRandomNumber() {
    const charset = "1234567890";
    let output = "";
    const choose = Math.random();
    let length = -1;
    if (choose <= 0.5) {
        length = 9;
    }
    else {
        length = 16;
    }
    for (let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        output += charset.substring(charIndex, charIndex + 1);
    }
    return output
}

function generateLegalEmail() {
    const charset = "abcdefghjklmnopqrstuvwxyz"
    const back = "@gmail.com"
    let output = ""
    for (let i = 0; i < 12; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        output += charset.substring(charIndex, charIndex + 1);
    }
    output = output + back
    return output
}

function generateLegalNumber() {
    const charset = '1234567890'
    let output = "9"
    for (let i = 0; i < 7; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        output += charset.substring(charIndex, charIndex + 1);
    }
    return output
}

function generateIllegalEmail() {
    const charset = "abcdefghjklmnopqrstuvwxyz"
    let back = ""
    for (let i = 0; i < 7; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        back += charset.substring(charIndex, charIndex + 1);
    }
    let back1 = ""
    for (let i = 0; i < 10; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        back1 += charset.substring(charIndex, charIndex + 1);
    }
    let output = ""
    for (let i = 0; i < 12; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        output += charset.substring(charIndex, charIndex + 1);
    }
    output = output + "@" + back + "." + back1
    return output
}

index = 0
while (index < 50) {
    let Salutation = generateIllegalSalutations(false);
    console.log("Salutation: " + Salutation + " Length: " + Salutation.length)
    // let name = generateIllegalNames(true)
    // console.log("Name: " + name + " Length: " + name.length)
    // console.log("Input: " + generateIllegalLongInput(true))
    // console.log("Random Number: " + generateRandomNumber())
    // console.log("email: "+generateIllegalEmail())
    index++
}