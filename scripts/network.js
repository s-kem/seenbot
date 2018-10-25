const responses = robot => {
  robot.respond('/hello/i', res => res.reply('Hello from ES6'))
  robot.respond('/goodbye/i', res => res.reply('Goodbye from ES6'))
}

module.exports = responses

