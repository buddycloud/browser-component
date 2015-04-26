Browser component
-------------------

Run an XMPP component in a browser via a websocket, just because.

Server and browser instances use the same business logic (thanks to `browserify`). Once a successful websocket connection is made to this server it will divert stanzas from its own internal logic to the logic bundled in the browser.

To build the browser bundle run: ```npm run-script build```

To start the server: ```npm start``` (this also builds the client bundle)

The following environment variables are required to connect the component:

* JID - jid of the component
* PASSWORD - component password
* HOST - the host of the XMPP server (* optional)
* PORT - componenet port number (* optional)

# Experiment

* Send a message to your component, it will reply with 'I got your message'.
* Pop open a browser @ http://localhost:3000. Send a chat message to your component, it will reply (via the browser) with 'I got your message'
* Attempt to send a stanza from the text box 
