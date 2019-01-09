import { Notification } from 'electron';

export default class Notify {
  static show = (obj = { title: 'fidio', body: 'default notification' }) => {
    new Notification(obj).show();
  };
}
