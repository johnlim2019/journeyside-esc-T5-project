export const isEmoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
export const isPrinting = /(\p{Other})/u;
export const isCard = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/;
export const isAscii = /(^[\u0021-\u007E]+$)/
export const isWhitespace = /(\p{Separator})/u
export const isNumber = /(\p{Number})/u
export const isSymbol = /(\p{Punctuation}|\p{Symbol})/u
export const isLetter = /(\p{Letter})/u
export const isEmail = /^\S+@\w+\.\w{2,7}(\.\w{2,7}){0,3}$/
export const isPhone = /(^[6,8,9]{1}[0-9]{7})$/

