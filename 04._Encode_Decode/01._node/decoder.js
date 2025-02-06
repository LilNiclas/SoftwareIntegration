const message = "Yo";

const encoded = btoa(message);
const decoded = atob(encoded);

console.log(encoded);
console.log(decoded);