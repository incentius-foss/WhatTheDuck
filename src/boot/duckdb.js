import {boot} from 'quasar/wrappers'
import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

const MANUAL_BUNDLES = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker,
  },
  eh: {
    mainModule: duckdb_wasm_next,
    mainWorker: eh_worker
  },
};

const OPFS_DB_PATH = 'opfs://wtd.db';

export default boot(async ({app}) => {


// Select a bundle based on browser checks
  const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);

  const worker = new Worker(bundle.mainWorker);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

  let persistEnabled = false;
  try {
    persistEnabled = window.localStorage.getItem('wtd_persist') === 'true';
  } catch (e) { /* localStorage may be blocked */ }

  if (persistEnabled) {
    try {
      await db.open({
        path: OPFS_DB_PATH,
        accessMode: duckdb.DuckDBAccessMode.READ_WRITE
      });
    } catch (err) {
      console.error('Failed to open OPFS-backed database, falling back to in-memory:', err);
      persistEnabled = false;
    }
  }

  const conn = await db.connect(); // Connect to db
  app.config.globalProperties.$conn = conn
  app.config.globalProperties.$worker = worker
  app.config.globalProperties.$db = db
  app.config.globalProperties.$persistEnabled = persistEnabled
})

// export {conn, db, worker}
