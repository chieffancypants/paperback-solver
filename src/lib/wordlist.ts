'use client'

let wordlistCache:string[]

export interface Wordlist {
    loadWordlist: () => Promise<string[]>
    isLoaded: () => boolean
    findMatches: (characters: string[], minLen?:number) => Promise<string[]>
}


const findMatches = async (chars: string[], minLen=3): Promise<string[]> => {
    const matches: string[] = []
    const wordlist = await loadWordlist()
    const characters = chars.map(char => char.toUpperCase())

    for (const word of wordlist) {
        if (word.length < minLen) continue
        if (matchCharacters(word, characters)) {
            matches.push(word)
        }
    }

    // sort and limit response to 100 matches
    return matches.sort((a, b) => {
        return b.length - a.length || a.localeCompare(b)
    }).slice(0, 50)
}

const matchCharacters = (word: string, tiles: string[]) => {
    const singleCharTiles: Record<string, number> = {}
    let wildcardTiles = 0
    let doubleCharTiles: Record<string, number> = {}

    // Create an object that tracks how many of each chars there are so we can later
    // decrement each time the word contains them
    for (const char of tiles) {
        if (char === '?') {
            wildcardTiles++
        } else if (char.length === 2) {
            doubleCharTiles[char] = doubleCharTiles[char] || 0
            doubleCharTiles[char]++
        } else {
            singleCharTiles[char] = singleCharTiles[char] || 0
            singleCharTiles[char]++
        }
    }

    let doesWordMatch = true
    let wildcardMatches = 0

    // Use the count of chars to decrement the count each time the char is found
    for (let i = 0; i < word.length; i++) {
        if (i < word.length - 1 && doubleCharTiles[word.substring(i, i + 2)]) {
            doubleCharTiles[word.substring(i, i + 2)]--
            i++
        } else if (singleCharTiles[word[i]]) {
            singleCharTiles[word[i]]--
        } else if (wildcardTiles > wildcardMatches) {
            wildcardMatches++
        } else {
            doesWordMatch = false
            break
        }
    }

    return doesWordMatch
}

const loadWordlist = async () => {
    if (isLoaded()) return wordlistCache

    wordlistCache = (await fetch('wordlist.txt')
        .then(r => r.text()))
        .trim().split('\n')
    return wordlistCache
}

const isLoaded = () => wordlistCache !== undefined


export const Wordlist:Wordlist = {
    findMatches,
    loadWordlist,
    isLoaded
}
