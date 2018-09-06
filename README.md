# messenger-scrapper

This is a simple application to fetch all messages from any chat from Facebook Messenger, giving only it's userId and your cookie

![Demo Screenshot](https://i.imgur.com/I4WG8Uc.png)

## Why?

Sometimes you'd like to read a really old chat that you had with some friend or your girlfriend. But it's really annoying to keep scrolling up forever.

This scrapper fetches everything at once, and then display at your screen

## How To Use

1. go to https://messenger.com
2. open a chat you want to scrap
3. open chrome dev tools
4. scroll the chat up to fetch new messages
5. search for a request call to https://www.messenger.com/api/graphqlbatch/
6. copy the `cookie` information and paste into the field `cookies`
7. search for the `queries` parameter in Form Data and then find the `id` property, this is the `userId`
8. Click in `Submit` and then in `show messages`

![Tutorial 1](https://i.imgur.com/RxPbrAZ.png)

_If you don't trust me to give me your cookies, you can run it locally. But I assure that I don't store, I only forward to the facebook API _

## Running Locally

```
git clone git@github.com:Daymannovaes/messenger-scrapper.git
npm install
npm start
```

- It will start a react server in `localhost:3000`
- and will start a offline server in `localhost:4000` to fetch data from facebook
