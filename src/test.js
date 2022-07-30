function generateIllegalNames(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnm,./;'[]=-0987654321!@#$%^&*()_+;ςερτυθιοπασδφγηξκλζχψωβνμ:΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    let output = "";
    var length;
    if (illegal) {
        length = 30
        let counting = length * Math.random() + length;
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * charset.length);
            output += charset.substring(charIndex, charIndex + 1);
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
function generateIllegalSalutations(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnm,./;'[]=-0987654321!@#$%^&*()_+;ςερτυθιοπασδφγηξκλζχψωβνμ:΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    let output = "";
    var length;
    if (illegal) {
        if (Math.random() < 0.5) {
            length = 9
            let counting = length * Math.random() + length;
            for (let i = 0; i < counting; i++) {
                let charIndex = Math.floor(Math.random() * charset.length);
                output += charset.substring(charIndex, charIndex + 1);
            }
        }
    } else {
        let counting = 9 * Math.random() + 1
        for (let i = 0; i < counting; i++) {
            let charIndex = Math.floor(Math.random() * charset.length);
            output += charset.substring(charIndex, charIndex + 1);
        }
    }
    return output
}

function generateIllegalLongInput(illegal) {
    const charset = "qwertyuiopasdfghjklzxcvbnm         ,./;'[]=-0987654321!@#$%^&*()_+;      ςερτυθιοπασδφγηξκλζχψωβνμ:        ΅ΕΡΤΥΘΙΟΠΑΣΔΦΓΗΞΚΛΖΧΨΩΒΝΜ      ضصثقفغعهخحمنتالبيسشئءؤرلاىةة";
    let output = "";
    var length;
    if (illegal) {
        if (Math.random() < 0.5) {
            length = 1250
            let counting = length * Math.random() + length;
            for (let i = 0; i < counting; i++) {
                let charIndex = Math.floor(Math.random() * charset.length);
                output += charset.substring(charIndex, charIndex + 1);
            }
        }
    } else {
        let counting = 1250 * Math.random() + 1
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

index = 0
while (index < 5) {
    console.log("Salutation: " + generateIllegalSalutations(true))
    console.log("Name: " + generateIllegalNames(true))
    console.log("Input: " + generateIllegalLongInput(true))
    console.log("Random Number: " + generateRandomNumber())
    index++
    console.log("Salutation: " + generateIllegalSalutations(false))
    console.log("Name: " + generateIllegalNames(false))
    console.log("Input: " + generateIllegalLongInput(false))
    console.log("Random Number: " + generateRandomNumber())
}