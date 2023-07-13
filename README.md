# Paperback Solver
Cheating is no fun, but every once in a while I can't help but wonder if there was a better solution for the hand I played. This is a simple app to help answer that question.

This app takes a set of cards and provides all possible word options for the card game [Paperback](https://boardgamegeek.com/boardgame/141572/paperback). A simple scrabble solver won't do, as Paperback has a couple unique rules where some cards (or tiles in scrabble vernacular) have 2 letters on them, and they must be used in that order. Additionally, the liberal use of wild cards required a slightly different type of solver.

The [word list](https://github.com/chieffancypants/paperback-solver/blob/main/public/wordlist.txt) uses the NASPA Word List, the official word authority for  scrabble in the USA and Canada, and therefore doesn't include any proper nouns or abbreviations, etc. that would otherwise be against the Paperback rules.

**View the solver app here:** [https://chieffancypants.github.io/paperback-solver/](https://chieffancypants.github.io/paperback-solver/)