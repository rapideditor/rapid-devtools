Rapid DevTools
===
Rapid DevTools is a Chrome DevTools extension designed to enhance the development and debugging experience for [Meta's Rapid](https://github.com/facebook/Rapid), an AI-enhanced editor for OpenStreetMap.

It currently features the following:
* A sidebar showing the list of objects in Rapid's editor history. This would otherwise need to be logged in the console using `rapidContext.systems.editor.history`\
  ![Rapid Properties](sidebar.png)
* A panel showing real-time updates to the Rapid history context and difference between each update.\
  ![DevTools Panel](panel.png)

Extension Installation
===
 * Open [chrome://extensions](chrome://extensions)
 * Enable 'Developer Mode' checkbox
 * Click 'Load unpacked extensions...'
 * Select the `dist` folder

Usage
===
While in a local deployment of Rapid, launch the devtools, you should see a new tab called 'Rapid'. It currently displays the current version of Rapid running.

Development
===
See the [Development Guide](https://github.com/rapideditor/rapid-devtools/wiki/Development-Guide) in the Wiki for details.

Issues
===
If you encounter any issues, please report them on our [issue tracker](https://github.com/rapideditor/rapid-devtools/issues).
