import * as fs from 'fs';

const contents = fs.readFileSync('TWL06.txt', 'utf-8').trim().split('\n')

export default contents