import { client, evt } from '../../common/index';

/**
 * @description setup client side preregistered events
 */
class ClientEvents {
  registerEvents() {
    client.on(evt.INFO, (event, data) => {
    });

    client.on(evt.QUIT, () => {
      client.send(
        evt.QUIT,
        this.confirmAction(
          'Are you sure?\n Fidio will stop all running processes'
        )
      );
    });
  }

  confirmAction = (msg) => window.confirm(msg);
}

export default ClientEvents;
