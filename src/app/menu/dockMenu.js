const dockTemplate = [
  {
    label: 'New Window',
    click() {
      console.log('New Window');
    },
  },
  {
    label: 'New Window with Settings',
    submenu: [{ label: 'Basic' }, { label: 'Pro' }],
  },
  { label: 'New Command...' },
];

export default dockTemplate;
