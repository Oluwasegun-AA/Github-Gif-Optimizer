import { Notification } from 'electron';

const notify = {
  show: (obj = { title: 'Github-gif-optimizer', body: 'default notification' }) => Notification(obj).show()
};

export default notify;
