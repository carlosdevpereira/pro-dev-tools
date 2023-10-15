import { BrowserWindow, Tray, nativeImage, shell, app } from "electron";
import AppIcon from "../../public/icons/app-icon.png";
import path from "node:path";

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

export default {
  trayInstance: null as Tray | null,
  trayWindow: null as BrowserWindow | null,

  setup() {
    if (!this.trayInstance) {
      const trayIcon = nativeImage.createFromDataURL(AppIcon);
      this.trayInstance = new Tray(trayIcon);
      this.trayInstance.addListener("click", () => {
        if (!this.trayInstance) return;

        if (!this.trayWindow) {
          this.setupTrayWindow();
        } else {
          this.killTrayWindow();
        }
      });
    }

    return this.trayInstance;
  },

  setupTrayWindow() {
    if (!this.trayInstance) return;

    this.trayWindow = new BrowserWindow({
      alwaysOnTop: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: 250,
      height: 228,
      resizable: false,
      modal: true,
      hiddenInMissionControl: true,
      skipTaskbar: true,
      center: false,
      frame: false,
      backgroundColor: "#242424",
      x: this.trayInstance.getBounds().x - 10,
      y: this.trayInstance.getBounds().y,
    });

    this.trayWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);

      return { action: "deny" };
    });

    this.trayWindow.webContents.ipc.on("trigger-action", (_, action) => {
      action === "quit-app" && app.quit();
    });

    this.trayWindow.webContents.ipc.on("set-tray-title", (_, title) => {
      this.trayInstance?.setTitle(title);
    });

    this.trayWindow.addListener("blur", () => {
      this.killTrayWindow();
    });

    if (VITE_DEV_SERVER_URL) {
      this.trayWindow.loadURL(VITE_DEV_SERVER_URL);
    } else {
      this.trayWindow.loadFile(path.join(process.env.DIST, "index.html"));
    }
  },

  killTrayWindow() {
    if (!this.trayWindow) return;

    this.trayWindow.close();
    this.trayWindow = null;
  },
};
