export default window.require = jest.fn().mockImplementation(() => ({
  ipcRenderer: jest.fn(),
  ipcMain: jest.fn(),
}));
