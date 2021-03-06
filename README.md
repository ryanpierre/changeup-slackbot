# changeup-slackbot

## Installation

To run the examples in this project and build your own slack bot, you're going to need a few tools.

### Mac

1. Install `iTerm2`. You can use `Terminal` but I would recommend you install iTerm instead.
2. Open iTerm or Terminal and enter the command `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` to install `HomeBrew`
3. In iTerm or Terminal, type `brew install node`
4. Then type `npm i -g wt-cli`

### Windows

1. Install `Powershell`.
2. Choose your OS and install `Node` and `npm` from `https://nodejs.org/en/download/`
3. Then type `npm i -g wt-cli`

## Getting our bot on slack

1. Go to `https://api.slack.com/apps` and log in. Our space is `changeuparttech`.
2. Click `Create New App`. Give your app a name and choose the `ChangeUp` workspace.
3. If it doesn't automatically open, click your newly created app on the app list to edit it
4. Change the colour and display photo on the first page
5. When you're done, click `OAuth and Permissions` on the left sidebar. Under `Tokens for Your Workspace`, click install app to generate two tokens. Copy `Bot User OAuth Access Token` and save it somewhere!
6. Next, scroll down to `Scopes`. Where it says `Select Permission Scope` choose or type in `Send messages as <YOUR BOT NAME>`. Add the permission by clicking on it, then hit `Save Changes` at the bottom of the page.
7. Finally, go to `Bot Users` on the sidebar and turn the toggle to on. Name your bot user, flip the toggle so that they're always online, and hit `Save Changes`

## Setting up our code

To make a new bot, copy the template folder to a new folder and name the folder and the `.js` file inside the folder whatever you want to call your bot. For example, if my bot was called `love-detection-bot`, I would copy the `template/` folder to a folder called `love-detection-bot` and rename `template.js` inside the folder to `love-detection-bot.js`

## Writing Code

Open up your favourite text editor and edit the part of the code that says `YOUR CODE HERE`. Don't change any code other than what's inside there unless you know what you're doing ;). See the **Language Reference** section of this README for more information on how to write bot code!

## Bringing our bot to life!

To put our bot live, we need to do a few things. 

1. Open up `Terminal` or `Powershell`. Depending on where you saved this repository, run a command along the lines of
```
cd ~/Documents/MyOtherFolder/changeup-slack
```
if for example you saved this in a directory called MyOtherFolder in your Documents. For Windows users, I'm really not sure how this works but I assume / hope its the same.

2. From there, type in this command

```
wt create --secret BOT_TOKEN=<YOUR_BOT_TOKEN_YOU_COPIED_EARLIER> your-bot-name/your-bot-name.js

so that it looks something like

wt create --secret BOT_TOKEN=xoxb-hfhoihooih4545-gj439503 my-cool-bot/my-cool-bot.js

```
3. If all goes well, you'll be returned a URL, something like
```
You can access your webtask at the following url:

https://wt-1aba3e39daa55a2771548f7e7acc7534-0.sandbox.auth0-extend.com/my-cool-bot

```
Copy that URL and save it in a safe place!

4. Return to `https://api.slack.com/apps` and open your app from the list again.

5. Click `Event Subscriptions` on the left sidebar.

6. Copy the URL from step 3 and paste it where it says `Request URL`. If all goes well, it should say `Verified` in green

7. Scroll down to `Subscribe to Bot Events` and add any of these events that you want your bot to be able to respond to
`app_mention` - When someone @Mentions your bot
`message.channels` - Listens to chat in a channel the bot is invited to
`message.im` - Listens to direct message to the bot

## Language Reference

You can use any Javascript you want if you know it, but if you want to work within the framework here are some commands to play with!

----> `createBotResponse`

**Usage:** `createBotResponse({option: optionValue, option2: optionValue2...})`
**Information:** Starts a bot response with the configuration you specify (or none at all!). This should be the first line of code you call. Some options you could pass, say if you wanted to be able to log what your bot hears and what it says back:

```
createBotResponse({
    logMessage: true,
    logResponse: true
});
```

----> `sendMessageToUser`

**Usage:** `sendMessageToUser()`
**Information:** Sends a message to the user. This should be the last thing you call. IT will calculate, based on conditions you've provided with `addSwitch` and messages you've built with `buildBasicMessage` and `buildAdvancedMessage` which message to send to the user.

----> `buildBasicMessage`

**Usage:** `buildBasicMessage("A Message!")`
**Information:** Will return a basic message with whatever you specify in the parentheses back to the user when you call `sendMessageToUser()`

----> `buildAdvancedMessage`

**Usage:** `buildAdvancedMessage(codeFromMessageBuilder)`
**Information:** Utilizes code generated by `https://api.slack.com/docs/messages/builder` to create messages and dialogues to send the user. For more advanced usage, get in touch with me ! We can do cool stuff like polls and buttons here.

----> `addSwitch`

**Usage:** `addSwitch({condition, parameter, operator, value, yesResponse, noResponse})`
**Information:** Adds a condition for the bot to respond differently to different input. Build a statement with the keywords: condition, parameter, operator, value, yesResponse, noResponse

Here's an example that reads as: if the user's message contains the word 'hello', tell them what a courteous user they are. If not, scold them!

```
addSwitch({
    condition: "if",
    parameter: "message",
    operator: "contains",
    value: "hello",
    yesResponse: buildBasicMessage.bind(this, "What a courteous user you are!"),
    noResponse: buildBasicMessage.bind(this, "You didn't say hello!")
});
```





