import fs from 'fs/promises'

// readFile() - callback
// fs.readFile('./test.txt', 'utf8', (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

// readFile() - async/await callback
const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// writeFile()
const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', "This is what I'm writing in the file")
        console.log('File written to...')
    } catch (error) {
        console.log(error)
    }
}

// appendFile()

const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', "\nThis is what I'm appending in the file")
        console.log('File appended to...')
    } catch (error) {
        console.log(error)
    }
}

writeFile()
appendFile()
readFile()