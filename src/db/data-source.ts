import { InsertLimitesEMetricas1679766502904 } from 'src/db/migrations/1679766502904-InsertLimitesEMetricas';
import { DataSource } from 'typeorm';
const ormconfig = require('../../ormconfig.js');
ormconfig['migrations'] = [InsertLimitesEMetricas1679766502904];

const dataSource = new DataSource(ormconfig);
export default dataSource;
