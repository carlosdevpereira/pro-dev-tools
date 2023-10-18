/**
 * ProDevTools
 *
 * The "swiss-knife" of modern developers.
 * Creates a system tray menu with a set of useful tools for usual developer hassels.
 */

import path from "node:path";
import { app } from "electron";
import Tray from "./tray-menu";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

// Bootstrap app when ready
// (after electron is initialized)
app.whenReady().then(() => {
  app.dock.hide();

  Tray.setup();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
