// const {generateRandomNumber, celciusToFahrenheit} = require('./utils')

// console.log(`The random number is: ${generateRandomNumber()}`)

// console.log(`Celcius to Fahrenheit: ${celciusToFahrenheit(0)}`)

// ////////////////////////es modules formats //////////////////////
import getPosts , { postLength } from './postController.js'

console.log(getPosts())

console.log(`The number of posts are: ${postLength()}`)
