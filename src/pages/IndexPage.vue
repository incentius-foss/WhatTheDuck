<template>
  <q-page class="q-pa-sm">
    <q-card class="no-border no-shadow">
      <q-card-section class="q-pa-sm row">
        <div class="text-h6 col-12">
          CSV File
          <q-uploader
            label="Individual upload"
            style="max-width: 300px"
            @added="files"
            class="float-right"
          />
        </div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-12">
          <q-btn label="Filter records" class="float-right q-mt-sm q-ml-sm" @click="search" no-caps></q-btn>
          <q-input v-model="filter" outlined label="Search Duration" class="float-right"></q-input>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
        ></q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'


export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      file: ref([]),
      columns: [],
      rows: [],
      filter: ''
    }
  },
  async created() {
    let self = this;
    const stmt3 = await self.$conn.prepare(`SELECT *
                                            FROM new_tbl;`);
    const res3 = await stmt3.query();
    self.rows = JSON.parse(JSON.stringify(res3.toArray()))

    if (self.rows.length > 0) {
      Object.keys(self.rows[0]).filter(function (item) {
        self.columns.push({name: item, align: 'left', label: item, field: item, sortable: true})
        return item
      })
    }
  },
  methods: {
    async files(files) {
      // console.log(files[0])
      this.file = files[0]
      this.columns = []
      let fileReader = new FileReader();
      let text = "";
      fileReader.readAsText(this.file)
      let self = this;
      fileReader.onload = async function () {
        text = fileReader.result
        // console.log(text)
        await self.$db.registerFileText("sample_table.csv", text);
        await self.$conn.query(`CREATE TABLE new_tbl AS
        SELECT *
        FROM read_csv_auto('sample_table.csv');`);
        const stmt3 = await self.$conn.prepare(`SELECT *
                                                FROM new_tbl;`);
        const res3 = await stmt3.query();
        self.rows = JSON.parse(JSON.stringify(res3.toArray()))

        if (self.rows.length > 0) {
          Object.keys(self.rows[0]).filter(function (item) {
            self.columns.push({name: item, align: 'left', label: item, field: item, sortable: true})
            return item
          })
        }
        // console.log("Statement result (Table):", JSON.parse(JSON.stringify(res3.toArray())));
      }
    },
    async search() {
      const q = await this.$conn.prepare("SELECT * FROM new_tbl where duration=" + this.filter);
      const r = await q.query();
      this.rows = JSON.parse(JSON.stringify(r.toArray()))
    }
  },
  // async beforeUnmount() {
  //   await this.$conn.close();
  //   await this.$db.terminate();
  //   await this.$worker.terminate();
  // }
})
</script>
