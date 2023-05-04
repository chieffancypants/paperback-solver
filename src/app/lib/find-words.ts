
export default function findWords(characters: string[], wordlist: string[], minLen=4): string[] {
  const matches: string[] = [];

  const totalChars = characters.reduce((acc, char) => acc + char.length, 0);
  characters = characters.map(char => char.toUpperCase())

  for (const word of wordlist) {
    if (word.length < 4) continue;
    if (matchCharacters(word, characters)) {
        matches.push(word);
    }
  }

  return matches.sort((a, b) => {
    return b.length - a.length || a.localeCompare(b)
  })
}

function matchCharacters (word: string, tiles: string[]) {
    const singleCharTiles: Record<string, number> = {};
    let wildcardTiles = 0;
    let doubleCharTiles: Record<string, number> = {};

    // Create an object that tracks how many of each chars there are so we can later decrement each time the word contains them
    for (const char of tiles) {
      if (char === '?') {
        wildcardTiles++;
      } else if (char.length === 2) {
        // const doubleChar = char.toLowerCase();
        doubleCharTiles[char] = doubleCharTiles[char] || 0;
        doubleCharTiles[char]++;
      } else {
        // const lowerChar = char.toLowerCase();
        singleCharTiles[char] = singleCharTiles[char] || 0;
        singleCharTiles[char]++;
      }
    }

    let doesWordMatch = true;
    let wildcardMatches = 0;

    // Use the count of chars to decrement the count each time the char is found
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const letterWithNextChar = doubleCharTiles[word.substring(i, i + 2)]

      if (i < word.length - 1 && doubleCharTiles[word.substring(i, i + 2)]) {
        doubleCharTiles[word.substring(i, i + 2)]--;
        i++;
      } else if (singleCharTiles[word[i]]) {
          singleCharTiles[word[i]]--;
      } else if (wildcardTiles > wildcardMatches) {
        wildcardMatches++;
      } else {
        doesWordMatch = false;
        break;
      }
    }

    return doesWordMatch
}
