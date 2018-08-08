
Utilities usable in any Discord Bot

Docs:
Full docs [here](https://axelgreavette.github.io/BotUtils/)

.shuffle() : Shuffles the attached array

.snowflake(snowflake) : Date of given snowflake

.randColor() : Gives you a random color code

.randInt(min, max) : Gives you a random number between `min` and `max`

.uptime() : Returns uptime

.osUptime() : OS Uptime

.capital(string) : Capitalizes the first letter of the string

.randAlphaNum(len) : Random Alpha numeric

.round(number, decimal place) : Rounds the inputted number to the given decimal place

.isNumber(input) : Checks if the input is a number

.removeHtml(string) : Removes the html from the string

.randItemFromArray(array) : Random item from inputted array

.arrayTo(number) : Array of numbers from 0 to inputed one

.isArray(array) : Checks if the input is an array

.start() : Start CPU Monitor

.usage() : CPU Usage after starting monitor

How to use:

```
var util = require('bot-utils')

console.log(util.snowflake(453763441732354058))
//Wed, 06 Jun 2018 03:33:55 GMT
console.log([1,2,3,4,5].shuffle())
//[4,5,1,2,3]
console.log(util.randColor())
//14013163
console.log(util.randInt(1,5))
//4
console.log(util.uptime())
//1 day, 12 minutes and 10 seconds
console.log(util.osUptime())
//12 days 14 minutes 1 second
console.log(util.capital('hello world'))
//Hello world
console.log(util.randAlphaNum(1))
//5
console.log(util.round(2.482482, 4))
//2.4824
console.log(util.isNumber(3))
//true
console.log(util.removeHtml('<h1>hello world<h1>'))
//hello world
console.log(util.randItemFromArray(['2', 12, 'four']))
//12
console.log(util.arrayTo(5))
//[1,2,3,4,5]
console.log(util.isArray(['1','2','3','4'])
//true
utils.start()
console.log(utils.usage())
4.249294924924
```

More coming in future
