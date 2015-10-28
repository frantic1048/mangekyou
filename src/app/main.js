import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  const mangekyouWindow = {
    width: 800,
    height: 600,
    'min-width': 800,
    'min-height': 600,
    frame: false,
    show: false,
  };

  mainWindow = new BrowserWindow(mangekyouWindow);

  // for product
  // disable default electron menu
  // mainWindow.setMenu(null);

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  mainWindow.show();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipc.on('Wminimize', () => {
    mainWindow.minimize();
  });
  ipc.on('Wmaximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipc.on('Wclose', () => {
    mainWindow.close();
  });
  ipc.on('Wreload', () => {
    mainWindow.reload();
  });
});
