import { IpcRendererEvent } from "electron";

const useElectronBridge = () => ({
  sendMessage: (channelName: string, payload?: any) => {
    window.ipcRenderer.send(channelName, payload);
    postMessage({ event: channelName, payload }, "*");
  },

  addEventListener: (
    eventName: string,
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ) => {
    window.ipcRenderer.on(eventName, callback);
  },

  removeEventListener: (
    eventName: string,
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ) => {
    window.ipcRenderer.off(eventName, callback);
  },
});

export default useElectronBridge;
export { useElectronBridge };
