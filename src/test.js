function illegalUserName(charsetIndex){
  let string ="";
  const charsetArr = [
    "qwertyuiopasdfghjklzxcvbnm,./;'[]=-0987654321!@#$%^&*()_+",
    "ℹ⏫⏬⏰⏳⛅⛔✅❓❗➰🃏🆑🆓🆖🆘🌁🌉🌋🌌🌍🌎🌏🌐🌒🌓🌔🌕🌖🌗🌘🌚🌛🌜🌝🌞🌠🌰🌱🌲🌳🌼🌽🌿🍄🍇🍈🍋🍌🍍🍏🍐🍑🍒🍕🍖🍗🍠🍤🍥🍨🍩🍪🍫🍬🍭🍮🍯🍷🍹🍼🎊🎋🎠🎣🎪🎭🎮🎲🎳🎴🎹🎻🎼🎽🏂🏇🏉🏡🏤🏮🐀🐁🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐏🐐🐓🐕🐖🐜🐝🐞🐡🐢🐣🐥🐩🐪🐲🐼🐽🐾👅👓👖👚👛👝👞👤👥👪👬👭👰👹👺💌💕💖💞💠💥💧💫💬💭💮💯💲💳💴💵💶💷💸💾📁📂📃📄📅📆📇📈📉📊📋📌📍📎📏📐📑📒📓📔📕📗📘📙📚📛📜📞📟📤📥📦📧📨📪📬📭📯📰📵📹🔀🔁🔂🔃🔄🔅🔆🔇🔈🔉🔋🔌🔎🔏🔐🔕🔖🔗🔘🔙🔚🔛🔜🔟🔠🔡🔢🔣🔤🔦🔧🔩🔪🔬🔭🔮🔵🔶🔷🔸🔹🔺🔻🔼🔽🕚🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🗾🗿😅😆😇😈😋😎😐😤😩😫😵😶😸😹😺😻😼😽😾😿🙀🙈🙉🙊🙋🙍🙎🚁🚂🚆🚈🚊🚋🚍🚎🚐🚔🚖🚘🚛🚜🚝🚞🚟🚠🚡🚣🚦🚨🚩🚪🚫🚮🚯🚰🚱🚳🚴🚵🚷🚸🚿🛁🛂🛃🛄🛅",
    ";ςερτυθιοπασδφγηξκλζχψωβνμ1234567890-=!@#$%^&*()_+[]',./<>?¨"
  ];
  const charset = charsetArr[charsetIndex];
  const choose = Math.random();
  if (charsetIndex==1){
    let usernameLength = -1;
    if (choose <=0.5){
      usernameLength = 7;
    }
    else {
      usernameLength = 25;
    }
    let length = 0;
    if (usernameLength > 7){
      length = Math.ceil(Math.random()*usernameLength)+25;
    }
    else {
      length = Math.floor(Math.random()*usernameLength);
    }
    for (let i=0;i<length;i++){
      let charIndex = Math.floor(Math.random()*charset.length);
      string += charset.substring(charIndex,charIndex+1);
    }
  }
  else {
    let length  = Math.floor(Math.random()*(25-8))+8
    for (let i=0;i<length;i++){
      let charIndex = Math.floor(Math.random()*charset.length);
      string += charset.substring(charIndex,charIndex+1);
    }
  }  
  return string
}
function illegalPasswords(){
  
}


  let count = 0;
  let counting = 0;
  while(count<100){
    count++;
    let string = illegalUserName(2)
    if (string.length <= 25 && string.length >= 8){
      console.log(string)
      console.log(string.length)
      counting++;
    }
  }
  console.log(counting);