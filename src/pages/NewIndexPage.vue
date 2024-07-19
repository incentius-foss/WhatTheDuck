<template>
  <q-drawer v-model="openDrawer" class="q-pt-sm tw-bg-secondarybg dd-scroll" show-if-above>
    <div class="tw-m-5">
      <div @dragover.prevent @drop="handleDrop"
           class="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-p-5 tw-bg-tertiarybg tw-rounded-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="tw-w-9 tw-h-9 tw-text-primarytext">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
        </svg>
        <span class="tw-text-primarytext tw-font-medium tw-text-lg">Drag & Drop Files Here</span>
        <span class="tw-text-primarytext">or</span>
        <button @click="$refs.uploaderref.pickFiles();" type="button"
                class="tw-rounded-lg tw-border-2 tw-border-hara tw-bg-transparent tw-px-9 tw-py-2 tw-text-sm tw-font-semibold tw-text-hara hover:tw-bg-secondarybg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Browse
        </button>
      </div>
      <q-item-label class="tw-text-white tw-mt-9 tw-mb-7 tw-text-base tw-font-normal">My Files</q-item-label>
      <template v-for="(table, index) in tables" :key="index">
        <div class="tw-mb-0.5 tw-w-full tw-flex tw-items-center hover:tw-bg-tertiarybg tw-rounded-xl tw-py-1 tw-px-3"
             :class="selection===table.name ? 'tw-bg-tertiarybg' : 'tw-bg-transparent'">
          <div @click="table['toggle'] = !table['toggle']" class="tw-mr-3 tw-h-full"
               :class="table['toggle'] ? 'rotate' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="tw-w-5 tw-h-5"
                 :class="selection===table.name ? 'tw-text-hara' : 'tw-text-white'">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
          <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
            <div class="tw-w-10/12 tw-flex tw-items-center tw-cursor-pointer" @click="selectTable(table.name)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="tw-w-5 tw-h-5 tw-mr-3"
                   :class="selection===table.name ? 'tw-text-hara' : 'tw-text-white'">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"/>
              </svg>
              <span style="width:138px;" class="tw-flex-1 tw-text-white tw-text-base tw-overflow-hidden tw-text-ellipsis">{{ table.name }}</span>
            </div>
            <div class="tw-w-2/12" @click="deleteTable(table.name, index)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="tw-w-5 tw-h-5 tw-ml-3 tw-text-red-500 hover:tw-text-red-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
              </svg>
            </div>
          </div>
        </div>
        <q-slide-transition>
          <div v-show="table['toggle']" class="tw-w-full tw-py-1">
            <div v-for="(col, col_index) in table['children']" :key="col_index">
              <div class="tw-flex tw-items-center tw-pl-12 tw-my-2">
                <q-icon :name="col.icon" size="xs" color="white"/>
                <span class="tw-ml-2 tw-text-white tw-text-sm">
                  {{ col.label }}
                </span>
              </div>
            </div>
          </div>
        </q-slide-transition>
      </template>
      <div v-if="tables.length===0" class="tw-flex tw-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="tw-w-6 tw-h-6 tw-text-primarytext tw-mr-2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
        </svg>
        <span class="tw-text-primarytext">No files available</span>
      </div>
    </div>
  </q-drawer>
  <q-uploader
    label="Individual upload"
    style="max-width: 300px"
    @added="files"
    class="float-right tw-hidden"
    ref="uploaderref"
  >
    <template v-slot:header="scope">
      <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
        <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat>
          <q-tooltip>Clear All</q-tooltip>
        </q-btn>
        <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense
               flat>
          <q-tooltip>Remove Uploaded Files</q-tooltip>
        </q-btn>
        <q-spinner v-if="scope.isUploading" class="q-uploader__spinner"/>
        <div class="col">
          <div class="q-uploader__title">Upload your files</div>
          <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
        </div>
        <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
          <q-uploader-add-trigger/>
          <q-tooltip>Pick Files</q-tooltip>
        </q-btn>
        <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="upload" round dense flat>
          <q-tooltip>Upload File</q-tooltip>
        </q-btn>

        <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
          <q-tooltip>Abort Upload</q-tooltip>
        </q-btn>
      </div>
    </template>
  </q-uploader>
  <q-page class="q-pa-sm tw-bg-dark tw-flex tw-flex-col">
    <q-card-section class="tw-flex-1 tw-flex tw-flex-col">
      <div v-if="$q.platform.is.mobile">
        <button type="button" class="tw-py-2 tw-px-6 tw-border-hara tw-bg-transparent q-mb-md tw-text-hara tw-rounded-lg tw-border-2" @click="openDrawer=true" no-caps>Upload</button>
      </div>
      <div class="tw-h-10 tw-bg-editorborder tw-rounded-t-xl tw-flex tw-items-center tw-justify-between">
        <span class="tw-text-base tw-text-white tw-ml-3 tw-font-normal">SQL Editor</span>
        <span v-if="selection!==''" class="tw-text-base tw-text-hara tw-mr-3 tw-font-normal tw-overflow-hidden">{{
            selection
          }}</span>
      </div>
      <VAceEditor
        class="dd-scroll"
        v-model:value="query"
        ref="editor"
        lang="sql"
        :options="{
        useWorker: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        customScrollbar: true,
        fontSize:'1rem'
      }"
        :key="counter"
        @init="initializeEditor"
        theme="twilight"
        style="flex: 1 1 0%; min-height:9rem;"
      />
      <div class="tw-flex tw-border-t tw-border-editorborder">
        <div class="tw-h-10 tw-bg-twilightbg tw-rounded-bl-xl tw-flex tw-items-center" :class="$q.platform.is.desktop ? 'tw-w-10/12' : 'tw-w-9/12'">
        </div>
        <div @click="search"
             class="tw-h-10 tw-bg-twilightbg hover:tw-bg-tertiarybg tw-rounded-br-xl tw-flex tw-items-center tw-justify-center tw-border-l tw-border-editorborder" :class="$q.platform.is.desktop ? 'tw-w-2/12': 'tw-w-3/12'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="tw-w-6 tw-h-6 tw-text-hara">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
          </svg>
          <span class="tw-text-sm tw-text-white tw-font-normal" :class="$q.platform.is.desktop ? 'tw-ml-3' : 'tw-ml-2'">Run</span>

        </div>
      </div>
      <!-- <div><q-btn flat color="primary" label="Filter records" class="q-ml-lg q-mt-sm" @click="search" no-caps></q-btn></div> -->

    </q-card-section>
    <q-card-section class="tw-flex-1">
      <div class="tw-flex tw-justify-end tw-mb-3 tw-gap-3">
        <button @click="uploadSampleFile" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Upload Sample File
        </button>
        <button @click="download_csv" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Download Results
        </button>
      </div>
      <q-table
        dark
        flat
        color="#101010"
        :rows="rows"
        row-key="name"
        style=""
        class="dd-scroll tw-rounded-xl tw-border tw-border-editorborder"
      >
        <template v-slot:header="props">
          <q-tr :props="props" class="tw-bg-primarybg tw-border-b">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="tw-text-sm tw-font-normal tw-text-primarytext"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :class="props.pageIndex % 2===0 ? 'tw-bg-tablebg' : 'tw-bg-primarybg'">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="tw-text-sm tw-font-normal tw-text-primarytext"
            >
              {{ props.row[col.name] }}

            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    <div class="tw-flex">
      <div class="tw-flex-grow text-white">
        Made with <q-icon name="favorite" size="xs" color="red"/> in India
      </div>
      <div class="tw-flex text-white">
        <span>Powered by DuckDB </span>
        <div class="bg-white q-pa-sm tw-flex-auto q-ml-sm">
          <img style="width:50px" class="tw-rounded-lg" src="DuckDB_Logo.png"/>
        </div>
      </div>
    </div>

    <q-dialog v-model="getStartedDialog">
      <q-card class="get-started-card tw-bg-editorborder tw-px-10">
        <img src="/welcome-duck.png" alt="duck">
        <div class="row full-width text-center tw-text-primarytext tw-text-3xl tw-font-bold">
            Run SQL queries on your CSV files in browser
                      </div>
        <q-card-section class="tw-text-primarytext" style="padding:0 20px 0 20px">
          <div>
            <q-carousel
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              prev-icon="arrow_left"
              next-icon="arrow_right"
              navigation-icon="radio_button_unchecked"
              navigation
              padding
              arrows
              height="200px"
              class="tw-bg-editorborder text-white rounded-borders"
            >
              <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                <q-btn v-if="active" size="sm" icon="radio_button_checked" class="tw-text-hara" flat round dense @click="onClick" />
                <q-btn v-else size="xs" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
              </template>
              <q-carousel-slide name="step_1" class="column no-wrap flex-center">
                <!-- <q-icon name="style" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_1 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="step_2" class="column no-wrap flex-center">
                <!-- <q-icon name="live_tv" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_2 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="step_3" class="column no-wrap flex-center">
                <!-- <q-icon name="layers" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_3 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="step_4" class="column no-wrap flex-center">
                <!-- <q-icon name="terrain" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_4 }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
          <!-- <div class="row full-width justify-center tw-text-3xl tw-font-bold">
            Welcome!  🎉
          </div> -->
          <!-- <div class="row full-width justify-center tw-text-lg tw-mt-6">
            Unlock the power of lightning-fast analytics and data
          </div>
          <div class="row full-width justify-center tw-text-lg">
            processing with QuackDB, your ultimate data tool.
          </div> -->
        </q-card-section>
        <q-card-actions class="justify-center tw-pb-lg">
          <button
            @click="getStarted()"
            class="tw-bg-hara  tw-px-20 tw-py-3 tw-font-semibold tw-rounded-lg">
            Get Started
          </button>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import * as XLSX from 'xlsx/xlsx.mjs';
import {saveAs} from 'file-saver';
import {VAceEditor} from 'vue3-ace-editor';
import './ace-config';
import sample_csv from '../assets/customers-100.csv?raw';

export default defineComponent({
  name: 'NewIndexPage',
  data() {
    return {
      file: ref([]),
      columns: [],
      rows: [],
      query: ref(''),
      tables: ref([]), /*contains objects with keys {name, length, columns} */
      selection: ref(''),
      getStartedDialog: ref(false),
      slide: ref('step_1'),
      step_1: ref('Upload multiple csv files to run sql queries'),
      step_2: ref("Smart editor to write SQL queries"),
      step_3: ref("Run SQL queries to analyze data"),
      step_4: ref("Download the query result in csv format"),
      openDrawer: ref(false),
      tableNameSuggestions: ["table1", "table2", "table3"],
      counter:0,
      sample_csv: ref(sample_csv)
    }
  },
  components: {
    VAceEditor,
  },
  async created() {
    this.openPopUp();
    this.$bus.on('openPopUp', this.openPopUp)
    this.openDrawer = this.$q.platform.is.desktop ? true : false;
  },
  methods: {
    initializeEditor(editor) {
      let self = this;
      // Define a custom autocomplete function
      editor.completers.push({
        getCompletions: function (editor, session, pos, prefix, callback) {
          callback(null, self.tables.map(function (table) {
            return {
              caption: table.name,
              value: table.name,
              meta: "table"
            };
          }));
        }
      });
      self.tables.filter(function (item) {
        editor.completers.push({
          getCompletions: function (editor, session, pos, prefix, callback) {
            callback(null, item.children.map(function (col) {
              return {
                caption: col.label,
                value: col.label,
                meta: "column"
              };
            }));
          }
        });
        return item
      })
    },
    selectTable(name) {
      this.selection = name
      this.query = `SELECT * FROM ${name} LIMIT 10;`
      this.search();
    },
    files(files) {
      this.file = files[0];
      this.upload();
    },
    async upload() {
      this.columns = []
      let fileReader = new FileReader();
      let text = "";
      let name = this.file.name.split(".")[0];
      let fileType = this.file.name.split(".")[1];
      if (fileType !== 'csv') {
        this.$refs.uploaderref.reset();
        this.$q.notify({type: 'negative', message: `Apologies! At this moment we only support CSV file.`, position: 'top'});
        return
      }
      name = name.replace(/[^a-zA-Z0-9]/g, "_");
      fileReader.readAsText(this.file)
      let self = this;
      let cont = true;
      fileReader.onload = async function () {
        text = fileReader.result
        await self.$db.registerFileText("sample_table.csv", text);
        self.tables.filter((table) => {
          if (table.name == name) {
            cont = false;
            self.$refs.uploaderref.reset();
            self.$q.notify({type: 'negative', message: `Table with name "${name}" Already Exists`, position: 'top'});
          }
        });
        if (cont) {
          self.$q.loading.show();
          await self.$conn.query(`CREATE TABLE ${name} AS
          SELECT *
          FROM read_csv_auto('sample_table.csv');`);
          self.$refs.uploaderref.reset();
          self.selectTable(name);
          const stmt1 = await self.$conn.prepare(`SELECT CAST(COUNT(*) AS INT)
                                                  FROM ${name}`)
          const res1 = await stmt1.query()
          const stmt2 = await self.$conn.prepare(`SELECT COLUMN_NAME, DATA_TYPE
                                                  FROM INFORMATION_SCHEMA.COLUMNS
                                                  WHERE TABLE_NAME = '${name}'`)
          const res2 = await stmt2.query()
          let len = Object.values(JSON.parse(JSON.stringify(res1.toArray()))[0])[0]
          let columns = JSON.parse(JSON.stringify(res2.toArray()))
          console.log(columns)
          self.tables.push({
            name: name, header: 'root', toggle: false, length: len, children: columns.map((obj) => {
              let icon = 'tag'
              if (["BIGINT","INTEGER"].includes(obj['data_type'])) {
                icon = 'tag'
              }
              else if (obj['data_type'] === "VARCHAR") {
                icon = 'abc'
              } else if (['DATE',"TIMESTAMP"].includes(obj['data_type'])) {
                icon = 'calendar_month'
              }
              return {label: obj['column_name'], icon: icon, header: 'generic'}
            })
          })
          self.$q.loading.hide();
          self.counter++;
        }
      }
    },
    async search() {
      this.$q.loading.show();
      try {
        const q = await this.$conn.prepare(this.query);
        const r = await q.query();
        const replacer = (key, value) => {
          if (typeof value === 'bigint') {
            return value.toString(); // Convert BigInt to string representation
          }
          return value;
        };
        this.rows = JSON.parse(JSON.stringify(r.toArray(), replacer))
        this.$q.loading.hide();
      } catch (err) {
        this.$q.loading.hide();
        this.$q.notify({
          message: err.message,
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
          position: 'top',
        });

      }
    },
    async deleteTable(name, index) {
      const q = await this.$conn.prepare(`DROP TABLE ${name};`);
      const r = await q.query();
      this.tables.splice(index, 1);
      if (this.tables.length === 0) {
        this.selection = '';
        this.query = '';
        this.rows = [];
      } else {
        this.selectTable(this.tables[0].name);
      }
      this.$q.notify({type: 'positive', message: `Table with name "${name}" Deleted!!`, position: 'top'})
    },
    handleDrop(e) {
      e.preventDefault();
      this.$refs.uploaderref.addFiles(e.dataTransfer.files);
    },
    download_csv() {
      let self = this;

      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }

      let data = self.rows
      const sheet = XLSX.utils.json_to_sheet(data);
      let wbout = XLSX.write({
        SheetNames: ["Sheet1"],
        Sheets: {"Sheet1": sheet}
      }, {
        bookType: 'csv',
        bookSST: true,
        type: 'binary'
      });
      saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }), `${self.selection}.csv`);
    },
    openPopUp() {
      this.getStartedDialog = true;
    },
    getStarted(){
      this.getStartedDialog = false,
      this.slide='step_1';
    },
    uploadSampleFile(){
      const blob = new Blob([this.sample_csv], { type: 'text/csv' });
      const file = new File([blob], 'sample.csv', { type: 'text/csv' });
      this.$refs.uploaderref.addFiles([file]);
    }
  },
  // async beforeUnmount() {
  //   await this.$conn.close();
  //   await this.$db.terminate();
  //   await this.$worker.terminate();
  // }
})
</script>
<style scoped>
.rotate{
  transform: rotate(90deg);
  transition-duration: 0.1s;
}

.get-started-card {
  width: 29rem;
  height: 39rem;
  border-radius: 50px;
}
</style>
