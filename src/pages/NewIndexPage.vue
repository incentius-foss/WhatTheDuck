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
        <span class="tw-text-primarytext tw-text-xs text-center tw-text-[8px]">Your data will be processed locally in your browser and won't be sent anywhere.</span>
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
              <span style="width:138px;"
                    class="tw-flex-1 tw-text-white tw-text-base tw-overflow-hidden tw-text-ellipsis">{{
                  table.name
                }}</span>
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
        <button type="button"
                class="tw-py-2 tw-px-6 tw-border-hara tw-bg-transparent q-mb-md tw-text-hara tw-rounded-lg tw-border-2"
                @click="openDrawer=true" no-caps>Upload
        </button>
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
        <div class="tw-h-10 tw-bg-twilightbg tw-rounded-bl-xl tw-flex tw-items-center"
             :class="$q.platform.is.desktop ? 'tw-w-10/12' : 'tw-w-9/12'">
        </div>
        <div @click="search"
             class="tw-h-10 tw-bg-twilightbg hover:tw-bg-tertiarybg tw-rounded-br-xl tw-flex tw-items-center tw-justify-center tw-border-l tw-border-editorborder"
             :class="$q.platform.is.desktop ? 'tw-w-2/12': 'tw-w-3/12'">
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
      <div class="tw-flex tw-justify-end tw-mb-3 tw-gap-3" v-if="view==='table'">
        <button @click="uploadSampleFile" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Upload Sample File
        </button>
        <button @click="download_csv" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Download Results
        </button>
        <button @click="view='chart'" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black" fill-rule="evenodd"
                  d="M2.879 3.879C2 4.757 2 6.172 2 9v6c0 2.828 0 4.243.879 5.121C3.757 21 5.172 21 8 21h8c2.828 0 4.243 0 5.121-.879C22 19.243 22 17.828 22 15V9c0-2.828 0-4.243-.879-5.121C20.243 3 18.828 3 16 3H8c-2.828 0-4.243 0-5.121.879M16 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1m-7 3a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0zm4 2a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <div class="tw-flex tw-justify-end tw-mb-3 tw-gap-3" v-if="view==='chart'">
        <!--         Chart Type Bar, Scatter -->
        <q-select v-model="selected_chart_type" :options="chartTypes" label="Chart Type" outlined dense map-options
                  @update:model-value="chartChange"
                  emit-value
                  class="tw-w-1/6"
                  color="yellow" dark/>

        <q-select v-model="selected_x_column" :options="getXAxisOptions" label="X Axis" outlined dense
                  class="tw-w-1/6"
                  color="yellow" dark/>
        <q-select v-model="selected_y_column" :options="getYAxisOptions" label="Y Axis" outlined dense
                  class="tw-w-1/6"
                  color="yellow" dark/>

        <button @click="shareOnTwitter" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black"
                  d="M22.71 6.29a1 1 0 0 0-1.42 0L20 7.59V2a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l3-3a1 1 0 0 0 0-1.42M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7l-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17l4.3 4.3Zm13-1a.9.9 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21Z"/>
          </svg>
        </button>

        <button @click="view='table'" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 5h18M10 3v18"/>
          </svg>
        </button>
      </div>
      <q-table v-if="view==='table'"
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

      <VueEcharts v-if="view==='chart' && selected_chart_type==='bar'" class="card_style22" ref="barchart"
                  :option="getBarOptions" :autoresize="true"
                  style="height: 400px"></VueEcharts>

      <VueEcharts v-if="view==='chart' && selected_chart_type==='scatter'" class="card_style2" ref="scatterchart"
                  :option="getScatterOptions" :autoresize="true"
                  style="height: 400px"></VueEcharts>

    </q-card-section>
    <div class="tw-flex">
      <div class="tw-flex-grow text-white">
        Made with
        <q-icon name="favorite" size="xs" color="red"/>
        in India
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
                <q-btn v-if="active" size="sm" icon="radio_button_checked" class="tw-text-hara" flat round dense
                       @click="onClick"/>
                <q-btn v-else size="xs" :icon="btnProps.icon" color="white" flat round dense @click="onClick"/>
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
              <q-carousel-slide name="step_5" class="column no-wrap flex-center">
                <!-- <q-icon name="terrain" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_5 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="step_6" class="column no-wrap flex-center">
                <!-- <q-icon name="terrain" size="56px" /> -->
                <div class="q-mt-md text-center tw-text-hara tw-text-base">
                  {{ step_6 }}
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
import * as echarts from 'echarts';
import VueEcharts from 'vue-echarts'
import numeral from "numeral";

export default defineComponent({
  name: 'NewIndexPage',
  data() {
    return {
      file: [],
      columns: [],
      view: 'table',
      rows: [],
      query: '',
      tables: [], /*contains objects with keys {name, length, columns} */
      selection: '',
      getStartedDialog: false,
      slide: 'step_1',
      step_1: 'Upload multiple csv files to run sql queries',
      step_2: "Smart editor to write SQL queries",
      step_3: "Run SQL queries to analyze data",
      step_4: "Download the query result in csv format",
      step_5: "For Bar Chart on X axis select a column with string values and on Y axis select a column with numeric values",
      step_6: "For Scatter Chart on X axis select a column with numeric values and on Y axis select a column with numeric values",
      openDrawer: false,
      tableNameSuggestions: ["table1", "table2", "table3"],
      counter: 0,
      sample_csv: sample_csv,
      string_columns: [],
      num_columns: [],
      selected_x_column: '',
      selected_y_column: '',
      chartTypes: [
        {label: 'Bar', value: 'bar'},
        {label: 'Scatter', value: 'scatter'}
      ],
      selected_chart_type: 'bar',
      hasHeaders: true // Added checkbox state
    }
  },
  components: {
    VAceEditor,
    VueEcharts
  },
  async created() {
    this.openPopUp();
    this.$bus.on('openPopUp', this.openPopUp)
    this.openDrawer = this.$q.platform.is.desktop ? true : false;
  },
  methods: {
    chartChange() {
      this.selected_x_column = this.getXAxisOptions[0]
    },
    shareOnTwitter() {
      try {
        if (this.selected_chart_type === 'bar') {
          const imageDataUrl = this.$refs.barchart.getDataURL({
            type: 'png',
            backgroundColor: '#fff',
            pixelRatio: 2
          });

          // Download the image file for uploading on Twitter
          const link = document.createElement("a");
          link.href = imageDataUrl;
          link.download = "result.png";
          link.click();
        } else {
          const imageDataUrl = this.$refs.scatterchart.getDataURL({
            type: 'png',
            backgroundColor: '#fff',
            pixelRatio: 2
          });

          // Download the image file for uploading on Twitter
          const link = document.createElement("a");
          link.href = imageDataUrl;
          link.download = "result.png";
          link.click();
        }
        // const imageDataUrl = this.$refs.barchart.getDataURL({
        //   type: 'png',
        //   backgroundColor: '#fff',
        //   pixelRatio: 2
        // });
        //
        // // Download the image file for uploading on Twitter
        // const link = document.createElement("a");
        // link.href = imageDataUrl;
        // link.download = "result.png";
        // link.click();

        // Open Twitter share chart
      } catch (error) {
        console.error("Error capturing chart image: ", error);
      }
    },
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
      this.query = `SELECT *
                    FROM ${name} LIMIT 10;`
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
        this.$q.notify({
          type: 'negative',
          message: `Apologies! At this moment we only support CSV file.`,
          position: 'top'
        });
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
          FROM read_csv_auto('sample_table.csv', HEADER=${self.hasHeaders});`);
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
              if (["BIGINT", "INTEGER"].includes(obj['data_type'])) {
                icon = 'tag'
              } else if (obj['data_type'] === "VARCHAR") {
                icon = 'abc'
              } else if (['DATE', "TIMESTAMP"].includes(obj['data_type'])) {
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
        let columns = await this.$conn.query(`PRAGMA table_info(${this.selection});`);
        let col = JSON.parse(JSON.stringify(columns.toArray(), replacer))
        this.num_columns = col.filter((col) => {
          return col['type'] === 'INTEGER' || col['type'] === 'BIGINT' || col['type'] === 'FLOAT' || col['type'] === 'DOUBLE' || col['type'] === 'DECIMAL'
        })
        this.string_columns = col.filter((col) => {
          return col['type'] === 'VARCHAR' || col['type'] === 'TEXT' || col['type'] === 'DATE' || col['type'] === 'TIMESTAMP'
        })
        this.selected_x_column = this.string_columns[0]['name']
        this.selected_y_column = this.num_columns[0]['name']
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
    getStarted() {
      this.getStartedDialog = false,
        this.slide = 'step_1';
    },
    uploadSampleFile() {
      const blob = new Blob([this.sample_csv], {type: 'text/csv'});
      const file = new File([blob], 'sample.csv', {type: 'text/csv'});
      this.$refs.uploaderref.addFiles([file]);
    }
  },
  computed: {
    getBarOptions() {
      return {
        backgroundColor: '#0b0b0b',
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%'
        },
        tooltip: {},
        dataZoom: [{
          type: 'slider',
          showDataShadow: false,
          fillerColor: 'rgba(196, 249, 99)',
          showDetail: false,
          height: '8px',
          handleIcon: 'M20 11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z',
          handleSize: '200%',
          handleStyle: {
            borderColor: 'transparent',
            color: 'rgba(196, 249, 99)',
            backgroundColor: 'rgba(196, 249, 99)',
            borderWidth: 0,
          },
          moveHandleStyle: {
            opacity: 0,
            color: 'rgba(196, 249, 99)',
          },
          dataBackground: {
            lineStyle: {
              type: 'dashed',
              width: '0',
              opacity: 0
            },
            areaStyle: {
              color: 'rgba(196, 249, 99)'
            }
          },
          selectedDataBackground: {
            areaStyle: {
              color: 'rgba(196, 249, 99)'
            }
          },
          bottom: 50,
          textStyle: {
            fontSize: 0
          },
          show: this.rows.length > 10
        }],
        xAxis: {
          data: this.rows.map((row) => {
            return row[this.selected_x_column]
          }),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function (params) {
              return numeral(params).format('0,0 a').toUpperCase()
            },
            fontWeight: 700,
            fontSize: '11.22px'
          }
        },
        series: [{
          type: 'bar',
          itemStyle: {
            borderRadius: [8, 8],
            color: 'rgba(196, 249, 99)',
          },
          barGap: 0,
          data: this.rows.map((row) => {
            return row[this.selected_y_column]
          })
        }]
      }
    },
    getXAxisOptions() {
      if (this.selected_chart_type === 'scatter') {
        return this.num_columns.map((col) => {
          return col['name']
        })
      }
      return this.string_columns.map((col) => {
        return col['name']
      })
    },
    getYAxisOptions() {
      return this.num_columns.map((col) => {
        return col['name']
      })
    },
    getScatterOptions() {
      let self = this;
      let data = self.rows.map((row) => {
        return [row[self.selected_x_column], row[self.selected_y_column]]
      })
      console.log(data)
      return {
        backgroundColor: '#0b0b0b',
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%'
        },
        tooltip: {},
        dataZoom: [{
          type: 'slider',
          showDataShadow: false,
          fillerColor: 'rgba(196, 249, 99)',
          showDetail: false,
          height: '8px',
          handleIcon: 'M20 11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z',
          handleSize: '200%',
          handleStyle: {
            borderColor: 'transparent',
            color: 'rgba(196, 249, 99)',
            backgroundColor: 'rgba(196, 249, 99)',
            borderWidth: 0,
          },
          moveHandleStyle: {
            opacity: 0,
            color: 'rgba(196, 249, 99)',
          },
          dataBackground: {
            lineStyle: {
              type: 'dashed',
              width: '0',
              opacity: 0
            },
            areaStyle: {
              color: 'rgba(196, 249, 99)'
            }
          },
          selectedDataBackground: {
            areaStyle: {
              color: 'rgba(196, 249, 99)'
            }
          },
          bottom: 50,
          textStyle: {
            fontSize: 0
          },
          show: this.rows.length > 10
        }],
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function (params) {
              return numeral(params).format('0,0 a').toUpperCase()
            },
            fontWeight: 700,
            fontSize: '11.22',
          }
        },
        series: [{
          type: 'scatter',
          itemStyle: {
            color: 'rgba(196, 249, 99)',
          },
          symbolSize: 10,
          data: self.rows.map((row) => {
            return [row[self.selected_x_column], row[self.selected_y_column]]
          })
        }]
      }
    }
  }
  // async beforeUnmount() {
  //   await this.$conn.close();
  //   await this.$db.terminate();
  //   await this.$worker.terminate();
  // }
})
</script>
<style scoped>
.rotate {
  transform: rotate(90deg);
  transition-duration: 0.1s;
}

.get-started-card {
  width: 29rem;
  height: 39rem;
  border-radius: 50px;
}
</style>
<style>
.q-field__control {
  border-radius: 12px !important;
  background-color: rgba(30, 30, 30) !important;
}

/*.q-field--dark .q-field__control:before{*/
/*  border:  0.5px solid rgba(196, 249, 99) !important;*/
/*}*/
</style>
