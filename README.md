Browser component
-------------------

Run an XMPP component in a browser via a websocket, just because.

Server and browser instances use the same business logic (thanks to `browserify`). Once a successful websocket connection is made to this server it will divert stanzas from its own internal logic to the logic bundled in the browser.

To build the browser bundle run: ```npm run-script build```

To start the server: ```npm start```

The following environment variables are required to connect the component:

* JID - jid of the component
* PASSWORD - component password
* HOST - the host of the XMPP server
* PORT - componenet port number

