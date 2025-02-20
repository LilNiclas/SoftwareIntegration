console.log(new Date()); //ISO 8601. T er seperator. Z angiver det er unix eller posix. Nogle gange er der tal ved Z, som definerer tidszonen.

console.log(Date()); //Local Date. 

console.log(Date.now()); //Sekunder siden 1970. Unix Epoch


console.log(new Date().toLocaleDateString()); 

const date = new Date();
const danishDate = new Intl.DateTimeFormat("da-dk").format(date); //Engelsk "en-us"
console.log(danishDate);

//Eksamen spørgsmål: Tænkte til eksempel hvor virksomheder/systemer oplever problematikker med forskellige tidszoner.
//daily quest, bare skift til australien. 12 eller 24 timers ur.
//Etiopien har andet kalender system.
//2 virk der har servere i forskellige regioner.
//Y2k. flysystemer og meget mere
//y2038 - hvis en dato er gemt som signed 32-bit integer. Vi ville bruge alle sekunder op.