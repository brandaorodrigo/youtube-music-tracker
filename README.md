# youtube music tracker

a browser extension and server application that tracks and displays the currently playing music from youtube music.

## overview

youtube music tracker consists of:

1. a chrome extension that monitors playing music on youtube music
2. a local web server that stores and serves the current track information
3. a web interface that displays the current track with a zooming album art visualization

## installation

### prerequisites
- node.js (latest lts version recommended)
- chrome/chromium-based browser

### setup

1. clone this repository
2. install dependencies:
```
npm install
```

### server setup

1. navigate to the server directory
2. run the server:
   - windows: double-click `server.bat`
   - command line: `node server/server.js`
3. the server runs on http://localhost:4444

### extension setup

1. open chrome and navigate to `chrome://extensions/`
2. enable "developer mode" (toggle in top right)
3. click "load unpacked" and select the `extension` directory from this project
4. the extension should now appear in your browser toolbar

## how it works

1. the extension monitors youtube music and extracts:
   - song title
   - artist name
   - album name
   - album artwork
   
2. the extension sends this data to the local server every 3 seconds

3. the web interface periodically fetches the current track information from the server and displays it with an animated zoom effect on the album artwork

## features

- real-time tracking of youtube music playback
- visual display of current track with album artwork background
- animated album art zoom effect

## project structure

```
youtube-music-tracker/
├── extension/            # chrome extension files
│   ├── content.js        # content script for extracting music data
│   ├── icon.png          # extension icon
│   └── manifest.json     # extension manifest
├── server/               # server files
│   ├── public/           # web interface files
│   │   ├── index.html    # display page
│   │   └── index.js      # client-side javascript
│   ├── server.bat        # windows batch file to run server
│   ├── server.js         # server implementation
│   └── server.json       # data storage file
└── package.json          # node.js package configuration
```