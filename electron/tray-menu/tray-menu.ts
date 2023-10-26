import { BrowserWindow, Tray, nativeImage, shell, app } from "electron";
import AppIcon from "../../public/icons/app-icon.png";
import path from "node:path";
import windowConfig from "../config/window";

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const buildIndexFile = path.join(__dirname, "../dist/index.html");

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

  // @TODO: Move window creation to its own file
  setupTrayWindow() {
    if (!this.trayInstance) return;

    this.trayWindow = new BrowserWindow({
      alwaysOnTop: windowConfig.alwaysOnTop,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: windowConfig.size.width,
      height: windowConfig.size.height,
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

    if (VITE_DEV_SERVER_URL) {
      this.trayWindow.loadURL(VITE_DEV_SERVER_URL);
    } else {
      this.trayWindow.loadFile(buildIndexFile);
    }

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

    this.trayWindow.webContents.ipc.on("set-window-config", (_, { size }) => {
      if (size) this.trayWindow?.setSize(size.width, size.height);
    });

    if (windowConfig.closeOnBlur) {
      this.trayWindow.addListener("blur", () => {
        this.killTrayWindow();
      });
    }
  },

  killTrayWindow() {
    if (!this.trayWindow) return;

    this.trayWindow.close();
    this.trayWindow = null;
  },
};
