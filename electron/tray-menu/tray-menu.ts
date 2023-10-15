import {
  BrowserWindow,
  Tray,
  nativeImage,
} from "electron";
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
      height: 220,
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

  updateTitle(title: string) {
    this.trayInstance?.setTitle(title);
  },

  // items(trayInstance: Tray) {
  //   return [
  //     {
  //       label: "🎨 Color picker",
  //       click: () => PickColorAction(trayInstance),
  //     },
  //     { type: "separator" },
  //     { label: "🔑 Password generator" },
  //     { label: "🧮 Hash calculator" },
  //     { label: "⛄ JWT Parser" },
  //     { label: "🔏 Base64 encoder/decoder" },
  //     { type: "separator" },
  //     {
  //       label: "JSON",
  //       submenu: [
  //         { label: "💅 Beautify" },
  //         { label: "📦 Minify" },
  //         { label: "🔀 Convert to YAML" },
  //       ],
  //     },
  //     {
  //       label: "YAML",
  //       submenu: [
  //         { label: "💅 Beautify" },
  //         { label: "📦 Minify" },
  //         { label: "🔀 Convert to JSON" },
  //       ],
  //     },
  //     { type: "separator" },
  //     { label: "Version 1.0.0", enabled: false },
  //     { label: "❗ Report an issue" },
  //     { type: "separator" },
  //     { label: "Quit", click: QuitApplicationAction },
  //   ] as MenuItemConstructorOptions[];
  // },
};
