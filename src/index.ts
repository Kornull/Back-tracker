import mongoose from 'mongoose';
import { CLUSTER, DB_NAME, DB_PARAMS, PASSWORD, PORT, USERNAME } from './constants';

import * as serverService from './services/server.service';


(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DB_PARAMS}`);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    })
  } catch (error) {
    console.log(error);
  }
})();



process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
