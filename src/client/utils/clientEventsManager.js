import { client, evt } from '../../common/index';

/**
 * @description setup client side preregistered events
 */
class ClientEvents {
  registerEvents() {
    client.on(evt.QUIT, () => {
      client.send(
        evt.QUIT,
        this.confirmAction(
          'Are you sure?\n Github-gif-optimizer will stop all running processes'
        )
      );
    });
  }

  // eslint-disable-next-line no-alert
  confirmAction = (msg) => window.confirm(msg);
}

export default ClientEvents;
