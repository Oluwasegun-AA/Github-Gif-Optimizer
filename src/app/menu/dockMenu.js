// setup dock template
const dockTemplate = [
  {
    label: 'New Window',
    click() {
    },
  },
  {
    label: 'New Window with Settings',
    submenu: [{ label: 'Basic' }, { label: 'Pro' }],
  },
  { label: 'New Command...' },
];

export default dockTemplate;
