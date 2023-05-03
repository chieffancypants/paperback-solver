import findWords from './lib/find-words';
import wordlist from './wordlist';

let charString = ''
for (let i = 2; i < process.argv.length; i++) {
  charString += process.argv[i]
}
const characters = charString.split(',').map(char => char.trim().toUpperCase())

const matchingWords = findWords(characters, wordlist)
if (matchingWords.length > 0) {
  console.log(`Found words: ${matchingWords.join(', ')}`);
} else {
  console.log('No matching words found');
}
