import { Notification } from 'electron';

const notify = {
  show: (obj = { title: 'Fidio', body: 'default notification' }) => Notification(obj).show()
};

export default notify;
