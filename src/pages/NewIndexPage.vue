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
          <div class="tw-flex-1 tw-min-w-0 tw-flex tw-items-center tw-cursor-pointer" @click="selectTable(table.name)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="tw-w-5 tw-h-5 tw-mr-3 tw-shrink-0"
                 :class="selection===table.name ? 'tw-text-hara' : 'tw-text-white'">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"/>
            </svg>
            <span class="tw-text-white tw-text-base tw-truncate">{{ table.name }}</span>
          </div>
          <div class="tw-flex tw-items-center tw-gap-2 tw-shrink-0 tw-ml-2">
            <div @click="summarizeTable(table.name)" title="Show column stats" class="tw-cursor-pointer">
              <q-icon name="insights" size="xs" class="tw-text-hara hover:tw-text-morehara" />
            </div>
            <div @click="deleteTable(table.name, index)" title="Drop table" class="tw-cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="tw-w-5 tw-h-5 tw-text-red-500 hover:tw-text-red-400">
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
        <div class="tw-flex tw-items-center tw-ml-3 tw-gap-2">
          <span class="tw-text-base tw-text-white tw-font-normal">SQL Editor</span>
          <q-icon name="help_outline" size="18px" class="tw-text-secondarytext hover:tw-text-primarytext tw-cursor-pointer">
            <q-menu dark anchor="bottom left" self="top left">
              <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 320px;">
                <q-item-label header class="tw-text-xs tw-text-secondarytext">Keyboard shortcuts</q-item-label>
                <q-item v-for="s in shortcutList" :key="s.label">
                  <q-item-section class="tw-text-sm">{{ s.label }}</q-item-section>
                  <q-item-section side>
                    <span class="tw-text-xs tw-bg-editorborder tw-text-primarytext tw-px-2 tw-py-0.5 tw-rounded tw-border tw-border-tertiarybg" style="font-family: monospace;">{{ s.keys }}</span>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
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
        <div class="tw-h-10 tw-bg-twilightbg tw-rounded-bl-xl tw-flex tw-items-center tw-gap-3 tw-px-3"
             :class="$q.platform.is.desktop ? 'tw-w-8/12' : 'tw-w-6/12'">
          <button type="button" @click="formatCurrentSql"
                  class="tw-text-xs tw-text-secondarytext hover:tw-text-primarytext tw-underline">
            Format
          </button>
          <button type="button" @click="runExplain"
                  class="tw-text-xs tw-text-secondarytext hover:tw-text-primarytext tw-underline">
            EXPLAIN
          </button>
          <button type="button"
                  class="tw-text-xs tw-text-secondarytext hover:tw-text-primarytext tw-underline">
            Extensions
            <q-menu dark anchor="bottom left" self="top left">
              <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 200px;">
                <q-item v-for="ext in availableExtensions" :key="ext" clickable @click="toggleExtension(ext)">
                  <q-item-section>{{ ext }}</q-item-section>
                  <q-item-section side>
                    <q-icon :name="loadedExtensions.includes(ext) ? 'check' : ''" size="xs" class="tw-text-hara" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </button>
        </div>
        <div @click="search"
             class="tw-h-10 tw-bg-twilightbg hover:tw-bg-tertiarybg tw-rounded-br-xl tw-flex tw-items-center tw-justify-center tw-border-l tw-border-editorborder tw-cursor-pointer"
             :class="$q.platform.is.desktop ? 'tw-w-4/12' : 'tw-w-6/12'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="tw-w-6 tw-h-6 tw-text-hara">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
          </svg>
          <span class="tw-text-sm tw-text-white tw-font-normal" :class="$q.platform.is.desktop ? 'tw-ml-3' : 'tw-ml-2'">Run</span>
          <q-tooltip anchor="top middle" self="bottom middle" class="tw-bg-tertiarybg tw-text-primarytext">
            {{ shortcutList[0].keys }}
          </q-tooltip>
        </div>
      </div>
      <!-- <div><q-btn flat color="primary" label="Filter records" class="q-ml-lg q-mt-sm" @click="search" no-caps></q-btn></div> -->

    </q-card-section>
    <q-card-section class="tw-flex-1">
      <div class="tw-flex tw-justify-end tw-mb-3 tw-gap-3" v-if="view==='table'">
        <button type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Sample Data ▾
          <q-menu dark anchor="bottom left" self="top left">
            <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 160px;">
              <q-item clickable v-close-popup @click="loadSampleByKey('customers')">
                <q-item-section>Customers (100 rows)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="loadSampleByKey('iris')">
                <q-item-section>Iris (30 rows)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="loadSampleByKey('weather')">
                <q-item-section>Weather (48 rows)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="loadSampleByKey('orders')">
                <q-item-section>Orders (25 rows)</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </button>
        <button @click="openPasteDialog" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Paste Data
        </button>
        <button type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          History ▾
          <q-menu dark anchor="bottom left" self="top left">
            <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 360px; max-width: 540px;">
              <q-item v-if="queryHistory.length === 0">
                <q-item-section class="tw-text-secondarytext tw-text-sm">No history yet</q-item-section>
              </q-item>
              <q-item v-for="(h, i) in queryHistory" :key="i" clickable v-close-popup @click="loadFromHistory(h)">
                <q-item-section>
                  <div class="tw-text-xs tw-truncate" style="max-width: 460px;">{{ h.sql }}</div>
                  <div class="tw-text-xs tw-text-secondarytext">{{ formatHistoryTime(h.ts) }}</div>
                </q-item-section>
              </q-item>
              <q-item v-if="queryHistory.length > 0" clickable v-close-popup @click="clearHistory">
                <q-item-section class="tw-text-red-400 tw-text-xs">Clear history</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </button>
        <button @click="importParquetFromUrl" type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Import Parquet URL
        </button>
        <button type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Workbook ▾
          <q-menu dark anchor="bottom right" self="top right">
            <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 180px;">
              <q-item clickable v-close-popup @click="exportWorkbook">
                <q-item-section>Export workbook (.wtd)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="$refs.wbInput.click()">
                <q-item-section>Import workbook (.wtd)</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="shareQueryUrl">
                <q-item-section>Share query URL</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </button>
        <input ref="wbInput" type="file" accept=".wtd,.json" style="display:none" @change="onWorkbookFile" />
        <button type="button"
                class="tw-rounded-lg tw-bg-hara hover:tw-bg-morehara tw-px-3.5 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-black">
          Download Results ▾
          <q-menu dark anchor="bottom right" self="top right">
            <q-list class="tw-bg-tertiarybg tw-text-primarytext" style="min-width: 140px;">
              <q-item clickable v-close-popup @click="exportResults('csv')">
                <q-item-section>CSV</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="exportResults('parquet')">
                <q-item-section>Parquet</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="exportResults('json')">
                <q-item-section>JSON</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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

        <q-select v-model="selected_x_column" :options="getXAxisOptions"
                  :label="selected_chart_type === 'histogram' ? 'Column' : 'X Axis'"
                  outlined dense
                  class="tw-w-1/6"
                  @update:model-value="onChartAxisChange"
                  color="yellow" dark/>
        <q-select v-if="selected_chart_type !== 'histogram'"
                  v-model="selected_y_column" :options="getYAxisOptions" label="Y Axis" outlined dense
                  class="tw-w-1/6"
                  @update:model-value="onChartAxisChange"
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
               v-model:pagination="tablePagination"
               :rows-per-page-options="[10, 25, 50, 100, 0]"
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

      <VueEcharts v-if="view==='chart' && selected_chart_type==='line'" class="card_style22" ref="linechart"
                  :option="getLineOptions" :autoresize="true"
                  style="height: 400px"></VueEcharts>

      <VueEcharts v-if="view==='chart' && selected_chart_type==='scatter'" class="card_style2" ref="scatterchart"
                  :option="getScatterOptions" :autoresize="true"
                  style="height: 400px"></VueEcharts>

      <VueEcharts v-if="view==='chart' && selected_chart_type==='histogram'" class="card_style22" ref="histchart"
                  :option="getHistogramOptions" :autoresize="true"
                  style="height: 400px"></VueEcharts>

      <div v-if="lastRowCount !== null"
           class="tw-flex tw-justify-end tw-gap-4 tw-mt-2 tw-text-xs tw-text-secondarytext">
        <span>{{ lastRowCount }} rows</span>
        <span>{{ lastColCount }} cols</span>
        <span>{{ lastDurationMs }} ms</span>
      </div>
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

    <!-- Import Remote File URL Dialog -->
    <q-dialog v-model="importParquetUrlDialog">
      <q-card class="tw-bg-editorborder q-px-md" style="min-width: 400px;border-radius: 12px;">
        <q-card-section>
          <div class="text-h6 tw-text-primarytext">Import File from URL</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="parquetUrl"
            outlined
            label="Enter URL of Parquet or JSON file"
            class="tw-bg-[#141414]"
            dense
            dark
            color="hara"
          />
        </q-card-section>

        <q-card-actions align="right" class="tw-mb-4">
          <q-btn flat label="Cancel" no-caps class="q-mr-sm"  color="white" v-close-popup />
          <q-btn
            label="Import"
            class="tw-bg-hara tw-px-20 tw-py-3 tw-font-semibold tw-rounded-lg"
            @click="processRemoteFileUrl"
            no-caps
            :disable="!parquetUrl"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Paste data dialog -->
    <q-dialog v-model="pasteDialog">
      <q-card class="tw-bg-editorborder q-px-md" style="min-width: 480px;border-radius: 12px;">
        <q-card-section>
          <div class="text-h6 tw-text-primarytext">Paste CSV data</div>
          <div class="tw-text-secondarytext tw-text-xs tw-mt-1">Paste comma-separated values below. First row is treated as the header.</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="pasteTableName" dense dark outlined label="Table name" color="hara" class="tw-mb-3" />
          <q-input v-model="pasteText" type="textarea" dense dark outlined autogrow color="hara"
                   input-style="min-height: 200px;" placeholder="a,b,c
1,2,3
4,5,6" />
        </q-card-section>
        <q-card-actions align="right" class="tw-mb-4">
          <q-btn flat label="Cancel" no-caps class="q-mr-sm" color="white" v-close-popup />
          <q-btn label="Import" no-caps :disable="!pasteText || !pasteTableName"
                 class="tw-bg-hara tw-px-20 tw-py-3 tw-font-semibold tw-rounded-lg"
                 @click="confirmPaste" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- CSV header dialog -->
    <q-dialog v-model="csvHeaderDialog" persistent>
      <q-card class="tw-bg-editorborder q-px-md" style="min-width: 400px;border-radius: 12px;">
        <q-card-section>
          <div class="text-h6 tw-text-primarytext">Import CSV</div>
          <div v-if="pendingCsvImport" class="tw-text-secondarytext tw-text-sm tw-mt-1">
            {{ pendingCsvImport.type === 'url' ? pendingCsvImport.url : pendingCsvImport.file.name }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="tw-text-primarytext tw-mb-3">
            Does the first row contain column headers?
          </div>
          <div class="tw-text-primarytext csv-header-options">
            <q-option-group
              v-model="csvHasHeaders"
              :options="[
                { label: 'Yes — first row is column names', value: true },
                { label: 'No — generate column names (column0, column1, ...)', value: false }
              ]"
              color="hara"
              dark
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="tw-mb-4">
          <q-btn flat label="Cancel" no-caps class="q-mr-sm" color="white" @click="cancelCsvImport" />
          <q-btn
            label="Import"
            class="tw-bg-hara tw-px-20 tw-py-3 tw-font-semibold tw-rounded-lg"
            @click="confirmCsvImport"
            no-caps
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="getStartedDialog">
      <q-card class="get-started-card tw-bg-editorborder tw-px-10">
        <img src="/welcome-duck.png" alt="duck">
        <div class="row full-width text-center tw-text-primarytext tw-text-2xl tw-font-bold">
          Run SQL queries on your CSV|Parquet files in browser
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
              height="160px"
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
          <div class="tw-flex tw-items-center tw-justify-between tw-mt-2 tw-px-2">
            <div class="tw-pr-4">
              <div class="tw-text-sm tw-text-primarytext">Keep my data between sessions</div>
              <div class="tw-text-xs tw-text-secondarytext">Persists tables to your browser's OPFS storage</div>
            </div>
            <q-toggle v-model="persistEnabled" color="hara" @update:model-value="togglePersist" dark />
          </div>
          <div v-if="persistEnabled && tables.length > 0" class="tw-text-right tw-mt-1 tw-px-2">
            <button type="button" @click="clearAllData"
                    class="tw-text-xs tw-text-red-400 hover:tw-text-red-300 tw-underline">
              Clear my stored data
            </button>
          </div>
        </q-card-section>
        <q-card-actions class="justify-center tw-pb-xl q-mb-sm tw-pt-sm">
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
import {saveAs} from 'file-saver';
import {VAceEditor} from 'vue3-ace-editor';
import './ace-config';
import sample_csv from '../assets/customers-100.csv?raw';
import iris_csv from '../assets/iris.csv?raw';
import weather_csv from '../assets/weather.csv?raw';
import orders_csv from '../assets/orders.csv?raw';
import * as echarts from 'echarts';
import VueEcharts from 'vue-echarts'
import numeral from "numeral";
import { DuckDBDataProtocol } from '@duckdb/duckdb-wasm';

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
      importParquetUrlDialog: false,
      parquetUrl: '',
      slide: 'step_1',
      step_1: 'Upload multiple csv or parquet files to run sql queries',
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
        {label: 'Line', value: 'line'},
        {label: 'Scatter', value: 'scatter'},
        {label: 'Histogram', value: 'histogram'}
      ],
      selected_chart_type: 'bar',
      csvHeaderDialog: false,
      csvHasHeaders: true,
      pendingCsvImport: null,
      persistEnabled: false,
      queryHistory: [],
      openHistoryMenu: false,
      lastRowCount: null,
      lastColCount: null,
      lastDurationMs: null,
      pasteDialog: false,
      pasteText: '',
      pasteTableName: '',
      tablePagination: {rowsPerPage: 10},
      availableExtensions: ['spatial', 'inet', 'icu', 'fts'],
      loadedExtensions: [],
      shortcutList: (() => {
        const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');
        const mod = mac ? '⌘' : 'Ctrl';
        return [
          {label: 'Run current query', keys: `${mod} + Enter`},
          {label: 'Run only selected SQL', keys: `select then ${mod} + Enter`},
          {label: 'Format SQL', keys: `${mod} + Shift + F`},
          {label: 'Toggle line comment', keys: `${mod} + /`}
        ];
      })()
    }
  },
  components: {
    VAceEditor,
    VueEcharts
  },
  async created() {
    let seenWelcome = false;
    try { seenWelcome = window.localStorage.getItem('wtd_seen_welcome') === 'true'; } catch (e) {}
    if (!seenWelcome) this.openPopUp();
    this.$bus.on('openPopUp', this.openPopUp)
    this.openDrawer = this.$q.platform.is.desktop ? true : false;
    this.persistEnabled = !!this.$persistEnabled;
    if (this.persistEnabled) {
      await this.restoreTables();
    }
    try {
      const raw = window.localStorage.getItem('wtd_history');
      this.queryHistory = raw ? JSON.parse(raw) : [];
    } catch (e) { this.queryHistory = []; }
    this.loadFromHash();
  },
  methods: {
    quoteIdent(name) {
      return `"${String(name).replace(/"/g, '""')}"`;
    },
    quoteRef(ref) {
      return String(ref).split('.').map(p => this.quoteIdent(p)).join('.');
    },
    chartChange() {
      this.selected_x_column = this.getXAxisOptions[0];
      if (this.selected_chart_type !== 'histogram' && this.num_columns.length > 0) {
        this.selected_y_column = this.num_columns[0].name;
      }
      this.saveChartConfig();
    },
    onChartAxisChange() {
      this.saveChartConfig();
    },
    loadChartConfig(name) {
      try {
        const raw = window.localStorage.getItem('wtd_chart_config');
        const all = raw ? JSON.parse(raw) : {};
        return all[name] || null;
      } catch (e) { return null; }
    },
    saveChartConfig() {
      if (!this.selection) return;
      try {
        const raw = window.localStorage.getItem('wtd_chart_config');
        const all = raw ? JSON.parse(raw) : {};
        all[this.selection] = {
          chart_type: this.selected_chart_type,
          x: this.selected_x_column,
          y: this.selected_y_column
        };
        window.localStorage.setItem('wtd_chart_config', JSON.stringify(all));
      } catch (e) {}
    },
    removeChartConfig(name) {
      try {
        const raw = window.localStorage.getItem('wtd_chart_config');
        if (!raw) return;
        const all = JSON.parse(raw);
        delete all[name];
        window.localStorage.setItem('wtd_chart_config', JSON.stringify(all));
      } catch (e) {}
    },
    shareOnTwitter() {
      try {
        const refMap = {
          bar: 'barchart',
          line: 'linechart',
          scatter: 'scatterchart',
          histogram: 'histchart'
        };
        const chartRef = this.$refs[refMap[this.selected_chart_type]];
        if (!chartRef) return;
        const imageDataUrl = chartRef.getDataURL({type: 'png', backgroundColor: '#fff', pixelRatio: 2});
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = 'result.png';
        link.click();
      } catch (error) {
        console.error('Error capturing chart image: ', error);
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
      editor.commands.addCommand({
        name: 'runQuery',
        bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
        exec: () => self.search()
      });
      editor.commands.addCommand({
        name: 'formatSql',
        bindKey: {win: 'Ctrl-Shift-F', mac: 'Command-Shift-F'},
        exec: () => self.formatCurrentSql()
      });
    },
    async selectTable(name) {
      this.selection = name;
      const tbl = this.tables.find(t => t.name === name);
      const ref = this.quoteRef((tbl && tbl.sqlRef) ? tbl.sqlRef : name);
      this.query = `SELECT *
                    FROM ${ref} LIMIT 10;`
      await this.search();
      const cfg = this.loadChartConfig(name);
      if (cfg) {
        if (cfg.chart_type) this.selected_chart_type = cfg.chart_type;
        if (cfg.x) this.selected_x_column = cfg.x;
        if (cfg.y) this.selected_y_column = cfg.y;
      }
    },
    async files(files) {
      if (!files || files.length === 0) return;
      const batch = files.length > 1;
      for (const f of files) {
        this.file = f;
        await this.upload(batch);
      }
    },
    parseFileMeta(filename) {
      const parts = filename.split('.');
      let last = (parts[parts.length - 1] || '').toLowerCase();
      let fileType = last;
      let isGzipped = false;
      let extSegments = parts.length > 1 ? 1 : 0;
      if ((last === 'gz' || last === 'gzip') && parts.length >= 3) {
        isGzipped = true;
        fileType = (parts[parts.length - 2] || '').toLowerCase();
        extSegments = 2;
      }
      const baseName = parts.slice(0, parts.length - extSegments).join('.') || 'data';
      const name = baseName.replace(/[^a-zA-Z0-9]/g, '_');
      return {name, fileType, isGzipped};
    },
    async upload(batchMode = false) {
      this.columns = []
      const {name, fileType, isGzipped} = this.parseFileMeta(this.file.name);

      const allowed = ['csv', 'parquet', 'json', 'xlsx', 'xls', 'duckdb', 'db', 'sqlite'];
      if (!allowed.includes(fileType)) {
        this.$refs.uploaderref.reset();
        this.$q.notify({
          type: 'negative',
          message: `Unsupported file type ".${fileType}". Supported: CSV, Parquet, JSON, Excel, DuckDB, SQLite (with optional .gz for CSV/JSON).`,
          position: 'top'
        });
        return
      }

      let self = this;

      for (const table of this.tables) {
        if (table.name === name) {
          this.$refs.uploaderref.reset();
          this.$q.notify({type: 'negative', message: `Table with name "${name}" Already Exists`, position: 'top'});
          return;
        }
      }

      if (fileType === 'csv') {
        if (batchMode) {
          await this.ingestCsvFromFile(this.file, name, true, isGzipped);
        } else {
          this.pendingCsvImport = { type: 'file', file: this.file, name, gzipped: isGzipped };
          this.csvHasHeaders = true;
          this.csvHeaderDialog = true;
        }
        this.$refs.uploaderref.reset();
        return;
      }

      if (fileType === 'xlsx' || fileType === 'xls') {
        await this.ingestExcelFile(this.file, name);
        this.$refs.uploaderref.reset();
        return;
      }

      self.$q.loading.show();

      try {
        if (fileType === 'parquet') {
          try {
            await this.$db.registerFileHandle(`${name}.parquet`, this.file, DuckDBDataProtocol.BROWSER_FILEREADER, true);
            await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS SELECT * FROM '${name}.parquet';`);
            await this.processNewTable(name);
          } catch (error) {
            console.error('Error processing Parquet:', error);
            this.$q.notify({type: 'negative', message: `Error processing Parquet file: ${error.message}`, position: 'top'});
            this.$q.loading.hide();
          }
        } else if (fileType === 'json') {
          try {
            const ext = isGzipped ? 'json.gz' : 'json';
            await this.$db.registerFileHandle(`${name}.${ext}`, this.file, DuckDBDataProtocol.BROWSER_FILEREADER, true);
            await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS SELECT * FROM read_json_auto('${name}.${ext}');`);
            await this.processNewTable(name);
          } catch (error) {
            console.error('Error processing JSON:', error);
            this.$q.notify({type: 'negative', message: `Error processing JSON file: ${error.message}`, position: 'top'});
            this.$q.loading.hide();
          }
        } else if (fileType === 'duckdb') {
          await this.ingestDuckdbFile(this.file, name);
        } else if (fileType === 'db' || fileType === 'sqlite') {
          await this.ingestSqliteFile(this.file, name);
        }
      } catch (error) {
        console.error('Error in upload:', error);
        this.$q.notify({type: 'negative', message: `Error uploading file: ${error.message}`, position: 'top'});
        this.$q.loading.hide();
      }

      this.$refs.uploaderref.reset();
    },
    async ingestExcelFile(file, name) {
      this.$q.loading.show({message: 'Reading Excel file...'});
      try {
        const XLSX = await import('xlsx');
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, {type: 'array'});
        const sheetName = wb.SheetNames[0];
        if (!sheetName) throw new Error('Workbook contains no sheets');
        const csvText = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
        const csvBlob = new Blob([csvText], {type: 'text/csv'});
        const csvFile = new File([csvBlob], `${name}.csv`, {type: 'text/csv'});
        this.$q.loading.hide();
        this.pendingCsvImport = {type: 'file', file: csvFile, name, gzipped: false};
        this.csvHasHeaders = true;
        this.csvHeaderDialog = true;
      } catch (err) {
        this.$q.loading.hide();
        this.$q.notify({type: 'negative', message: `Excel import failed: ${err.message}`, position: 'top'});
      }
    },
    async ingestDuckdbFile(file, name) {
      try {
        const dbFile = `${name}.duckdb`;
        await this.$db.registerFileHandle(dbFile, file, DuckDBDataProtocol.BROWSER_FILEREADER, true);
        await this.$conn.query(`ATTACH '${dbFile}' AS ${this.quoteIdent(name)} (READ_ONLY);`);
        await this.listAttachedDatabaseTables(name);
        this.$q.notify({type: 'positive', message: `Attached DuckDB database "${name}"`, position: 'top'});
        this.$q.loading.hide();
        this.counter++;
      } catch (error) {
        console.error('Error attaching DuckDB:', error);
        this.$q.notify({type: 'negative', message: `DuckDB attach failed: ${error.message}`, position: 'top'});
        this.$q.loading.hide();
      }
    },
    async ingestSqliteFile(file, name) {
      try {
        this.$q.loading.show({message: 'Loading SQLite extension...'});
        await this.$conn.query('INSTALL sqlite_scanner;');
        await this.$conn.query('LOAD sqlite_scanner;');
        const dbFile = `${name}.sqlite`;
        await this.$db.registerFileHandle(dbFile, file, DuckDBDataProtocol.BROWSER_FILEREADER, true);
        await this.$conn.query(`ATTACH '${dbFile}' AS ${this.quoteIdent(name)} (TYPE SQLITE, READ_ONLY);`);
        await this.listAttachedDatabaseTables(name);
        this.$q.notify({type: 'positive', message: `Attached SQLite database "${name}"`, position: 'top'});
        this.$q.loading.hide();
        this.counter++;
      } catch (error) {
        console.error('Error attaching SQLite:', error);
        this.$q.notify({type: 'negative', message: `SQLite attach failed: ${error.message}`, position: 'top'});
        this.$q.loading.hide();
      }
    },
    async listAttachedDatabaseTables(catalog) {
      const r = await this.$conn.query(
        `SELECT table_schema, table_name FROM information_schema.tables WHERE table_catalog = '${catalog}';`
      );
      const rows = JSON.parse(JSON.stringify(r.toArray()));
      for (const row of rows) {
        const schema = row.table_schema || 'main';
        const tname = row.table_name;
        const displayName = `${catalog}.${tname}`;
        const sqlRef = `${catalog}.${schema}.${tname}`;
        await this.addAttachedTableToList(displayName, sqlRef, catalog, schema, tname);
      }
    },
    async addAttachedTableToList(displayName, sqlRef, catalog, schema, tname) {
      const replacer = (k, v) => typeof v === 'bigint' ? v.toString() : v;
      try {
        const r1 = await this.$conn.query(`SELECT CAST(COUNT(*) AS INT) AS c FROM ${this.quoteRef(sqlRef)};`);
        const r2 = await this.$conn.query(
          `SELECT column_name, data_type FROM information_schema.columns WHERE table_catalog='${catalog}' AND table_schema='${schema}' AND table_name='${tname}';`
        );
        const len = JSON.parse(JSON.stringify(r1.toArray(), replacer))[0].c;
        const columns = JSON.parse(JSON.stringify(r2.toArray(), replacer));
        this.tables.push({
          name: displayName,
          sqlRef: sqlRef,
          header: 'root',
          toggle: false,
          length: len,
          attached: true,
          children: columns.map((obj) => ({
            label: obj.column_name,
            icon: ['BIGINT','INTEGER'].includes(obj.data_type) ? 'tag'
                : obj.data_type === 'VARCHAR' ? 'abc'
                : ['DATE','TIMESTAMP'].includes(obj.data_type) ? 'calendar_month' : 'tag',
            header: 'generic'
          }))
        });
      } catch (e) {
        console.warn('Failed to add attached table:', displayName, e);
      }
    },

    // Helper method to process a newly created table
    // Open the custom dialog for importing Parquet from URL
    importParquetFromUrl() {
      this.parquetUrl = '';
      this.importParquetUrlDialog = true;
    },

    // Process the remote file URL (Parquet or JSON) entered by the user
    async processRemoteFileUrl() {
      try {
        if (!this.parquetUrl) return;

        // Close the dialog
        this.importParquetUrlDialog = false;

        // Generate a table name from the URL
        const urlParts = this.parquetUrl.split('/');
        const filename = urlParts.pop();
        const filenameParts = filename.split('.');
        let name = filenameParts[0];
        const fileExtension = filenameParts.length > 1 ? filenameParts.pop().toLowerCase() : '';
        name = name.replace(/[^a-zA-Z0-9]/g, '_');

        // Check if the file type is supported
        if (!['parquet', 'csv', 'json'].includes(fileExtension)) {
          this.$q.notify({
            type: 'negative',
            message: `Unsupported file type. Only Parquet, CSV and JSON files are supported for URL imports.`,
            position: 'top'
          });
          return;
        }

        // Check if table with this name already exists
        for (const table of this.tables) {
          if (table.name === name) {
            this.$q.notify({type: 'negative', message: `Table with name "${name}" already exists`, position: 'top'});
            return;
          }
        }

        if (fileExtension === 'csv') {
          this.pendingCsvImport = { type: 'url', url: this.parquetUrl, name };
          this.csvHasHeaders = true;
          this.csvHeaderDialog = true;
          return;
        }

        this.$q.loading.show({
          message: `Fetching ${fileExtension.toUpperCase()} file...`
        });

        try {
          if (fileExtension === 'parquet') {
            try {
              // First attempt: Use direct URL registration method for Parquet files
              await this.$db.registerFileURL(
                `${name}.parquet`,
                this.parquetUrl,
                DuckDBDataProtocol.HTTP,
                false // allowFullHttpReads
              );

              // Create a table from the registered URL Parquet file
              await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS
              SELECT *
              FROM '${name}.parquet';`);

              // Process the newly created table
              await this.processNewTable(name);

              this.$q.notify({
                type: 'positive',
                message: `Successfully imported Parquet file from URL`,
                position: 'top'
              });

              this.$q.loading.hide();
              return;
            } catch (directUrlError) {
              console.log('Direct URL registration failed, falling back to fetch method:', directUrlError);
              // If direct URL registration fails, fall back to fetch method
            }
          }

          // Fallback: Try to fetch the file with the browser's fetch API
          const response = await fetch(this.parquetUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Get array buffer from the response
          const arrayBuffer = await response.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          if (fileExtension === 'parquet') {
            await this.$db.registerFileBuffer(`${name}.parquet`, uint8Array);
            await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS
            SELECT *
            FROM '${name}.parquet';`);
          } else if (fileExtension === 'json') {
            await this.$db.registerFileBuffer(`${name}.json`, uint8Array);
            await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS
            SELECT *
            FROM read_json_auto('${name}.json');`);
          }

          // Process the newly created table
          await this.processNewTable(name);

          this.$q.notify({
            type: 'positive',
            message: `Successfully imported ${fileExtension.toUpperCase()} file from URL`,
            position: 'top'
          });
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);

          // Show a more user-friendly error message about CORS issues
          if (fetchError.message.includes('NetworkError') ||
              fetchError.message.includes('CORS') ||
              fetchError.message.includes('Failed to fetch')) {
            this.$q.notify({
              type: 'negative',
              message: 'The server does not allow direct access to this file due to browser security restrictions (CORS). ' +
                   'Try downloading the file locally first and then uploading it.',
              position: 'top',
              timeout: 7000
            });
          } else {
            this.$q.notify({
              type: 'negative',
              message: `Error fetching ${fileExtension.toUpperCase()} file: ${fetchError.message}`,
              position: 'top'
            });
          }
          this.$q.loading.hide();
        }
      } catch (error) {
        console.error(`Error importing file from URL:`, error);
        this.$q.notify({
          type: 'negative',
          message: `Error importing file: ${error.message}`,
          position: 'top'
        });
        this.$q.loading.hide();
      }
    },
    cancelCsvImport() {
      this.csvHeaderDialog = false;
      this.pendingCsvImport = null;
    },
    async confirmCsvImport() {
      if (!this.pendingCsvImport) {
        this.csvHeaderDialog = false;
        return;
      }
      const pending = this.pendingCsvImport;
      const hasHeaders = this.csvHasHeaders;
      this.csvHeaderDialog = false;
      this.pendingCsvImport = null;

      if (pending.type === 'file') {
        await this.ingestCsvFromFile(pending.file, pending.name, hasHeaders, !!pending.gzipped);
      } else {
        await this.ingestCsvFromUrl(pending.url, pending.name, hasHeaders);
      }
    },
    async ingestCsvFromFile(file, name, hasHeaders, gzipped) {
      const self = this;
      self.$q.loading.show();
      if (gzipped) {
        try {
          const ext = 'csv.gz';
          const regName = `${name}.${ext}`;
          await self.$db.registerFileHandle(regName, file, DuckDBDataProtocol.BROWSER_FILEREADER, true);
          await self.$conn.query(`CREATE TABLE ${self.quoteIdent(name)} AS SELECT * FROM read_csv_auto('${regName}', header=${hasHeaders});`);
          await self.processNewTable(name);
        } catch (error) {
          console.error('Error processing gzipped CSV:', error);
          self.$q.notify({type: 'negative', message: `Error processing CSV.gz: ${error.message}`, position: 'top'});
          self.$q.loading.hide();
        }
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        try {
          await self.$db.registerFileText(`${name}.csv`, fileReader.result);
          await self.$conn.query(`CREATE TABLE ${self.quoteIdent(name)} AS
          SELECT *
          FROM read_csv_auto('${name}.csv', header=${hasHeaders});`);
          await self.processNewTable(name);
        } catch (error) {
          console.error('Error processing CSV:', error);
          self.$q.notify({type: 'negative', message: `Error processing CSV file: ${error.message}`, position: 'top'});
          self.$q.loading.hide();
        }
      };
      fileReader.onerror = function () {
        self.$q.notify({type: 'negative', message: 'Error reading the file', position: 'top'});
        self.$q.loading.hide();
      };
      fileReader.readAsText(file);
    },
    async ingestCsvFromUrl(url, name, hasHeaders) {
      this.$q.loading.show({message: 'Fetching CSV file...'});
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const csvText = new TextDecoder('utf-8').decode(new Uint8Array(arrayBuffer));
        await this.$db.registerFileText(`${name}.csv`, csvText);
        await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS
        SELECT *
        FROM read_csv_auto('${name}.csv', header=${hasHeaders});`);
        await this.processNewTable(name);
        this.$q.notify({type: 'positive', message: 'Successfully imported CSV file from URL', position: 'top'});
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        if (fetchError.message.includes('NetworkError') ||
            fetchError.message.includes('CORS') ||
            fetchError.message.includes('Failed to fetch')) {
          this.$q.notify({
            type: 'negative',
            message: 'The server does not allow direct access to this file due to browser security restrictions (CORS). ' +
              'Try downloading the file locally first and then uploading it.',
            position: 'top',
            timeout: 7000
          });
        } else {
          this.$q.notify({type: 'negative', message: `Error fetching CSV file: ${fetchError.message}`, position: 'top'});
        }
        this.$q.loading.hide();
      }
    },
    async addTableToList(name) {
      const stmt1 = await this.$conn.prepare(`SELECT CAST(COUNT(*) AS INT) FROM ${this.quoteIdent(name)}`);
      const res1 = await stmt1.query();
      const stmt2 = await this.$conn.prepare(`SELECT COLUMN_NAME, DATA_TYPE
                                              FROM INFORMATION_SCHEMA.COLUMNS
                                              WHERE TABLE_NAME = '${name}'`);
      const res2 = await stmt2.query();
      const len = Object.values(JSON.parse(JSON.stringify(res1.toArray()))[0])[0];
      const columns = JSON.parse(JSON.stringify(res2.toArray()));
      this.tables.push({
        name: name,
        header: 'root',
        toggle: false,
        length: len,
        children: columns.map((obj) => {
          let icon = 'tag';
          if (["BIGINT", "INTEGER"].includes(obj['data_type'])) {
            icon = 'tag';
          } else if (obj['data_type'] === "VARCHAR") {
            icon = 'abc';
          } else if (['DATE', "TIMESTAMP"].includes(obj['data_type'])) {
            icon = 'calendar_month';
          }
          return {label: obj['column_name'], icon: icon, header: 'generic'};
        })
      });
    },
    async processNewTable(name) {
      try {
        this.selectTable(name);
        await this.addTableToList(name);
        this.$q.loading.hide();
        this.counter++;
      } catch (error) {
        console.error('Error processing table:', error);
        this.$q.notify({type: 'negative', message: `Error processing table: ${error.message}`, position: 'top'});
        this.$q.loading.hide();
      }
    },
    async restoreTables() {
      try {
        const r = await this.$conn.query('SHOW TABLES;');
        const names = JSON.parse(JSON.stringify(r.toArray())).map(row => row.name);
        for (const name of names) {
          await this.addTableToList(name);
        }
        this.counter++;
      } catch (err) {
        console.error('Failed to restore tables:', err);
      }
    },
    togglePersist(value) {
      try {
        if (value) {
          window.localStorage.setItem('wtd_persist', 'true');
        } else {
          window.localStorage.removeItem('wtd_persist');
        }
      } catch (e) {
        this.$q.notify({type: 'negative', message: 'Could not save preference (storage blocked)', position: 'top'});
        return;
      }
      this.$q.notify({
        type: 'info',
        color: 'primary',
        message: value
          ? 'Persistence will activate after you reload the page.'
          : 'Persistence will be off after you reload the page.',
        position: 'top',
        timeout: 5000,
        actions: [{label: 'Reload', color: 'white', handler: () => window.location.reload()}]
      });
    },
    async clearAllData() {
      if (!window.confirm('Drop all stored tables? This cannot be undone.')) return;
      try {
        const r = await this.$conn.query('SHOW TABLES;');
        const names = JSON.parse(JSON.stringify(r.toArray())).map(row => row.name);
        for (const name of names) {
          await this.$conn.query(`DROP TABLE IF EXISTS ${this.quoteIdent(name)};`);
        }
        this.tables = [];
        this.selection = '';
        this.query = '';
        this.rows = [];
        this.counter++;
        this.$q.notify({type: 'positive', message: 'All tables dropped', position: 'top'});
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Clear failed: ${err.message}`, position: 'top'});
      }
    },
    splitSql(sql) {
      const stmts = [];
      let cur = '';
      let inSingle = false, inDouble = false;
      for (let i = 0; i < sql.length; i++) {
        const c = sql[i];
        if (c === "'" && !inDouble) inSingle = !inSingle;
        else if (c === '"' && !inSingle) inDouble = !inDouble;
        if (c === ';' && !inSingle && !inDouble) {
          const t = cur.trim();
          if (t) stmts.push(t);
          cur = '';
          continue;
        }
        cur += c;
      }
      const t = cur.trim();
      if (t) stmts.push(t);
      return stmts;
    },
    async search() {
      let selected = '';
      try {
        const inst = this.$refs.editor && this.$refs.editor.getAceInstance && this.$refs.editor.getAceInstance();
        if (inst) {
          selected = inst.getSelectedText() || '';
        } else {
          const aceEl = document.querySelector('.ace_editor');
          if (aceEl && window.ace && window.ace.edit) {
            selected = window.ace.edit(aceEl).getSelectedText() || '';
          }
        }
      } catch (e) { /* ignore */ }
      const sql = (selected && selected.trim()) ? selected : this.query;
      if (!sql || !sql.trim()) return;
      const statements = this.splitSql(sql);
      if (statements.length === 0) return;
      this.$q.loading.show();
      const start = performance.now();
      try {
        let lastResult = null;
        for (const stmt of statements) {
          const q = await this.$conn.prepare(stmt);
          lastResult = await q.query();
        }
        const replacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
        this.rows = lastResult ? JSON.parse(JSON.stringify(lastResult.toArray(), replacer)) : [];
        this.formatTemporalColumns(lastResult, this.rows);
        this.lastRowCount = this.rows.length;
        this.lastColCount = this.rows.length > 0 ? Object.keys(this.rows[0]).length : 0;
        this.lastDurationMs = Math.round(performance.now() - start);
        this.pushHistory(sql);

        this.deriveChartColumns(lastResult);
      } catch (err) {
        this.$q.notify({
          message: err.message,
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
          position: 'top',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    // Chart axes come from the columns of the result actually on screen, not from
    // the selected table — otherwise charting an aggregate or joined query offers
    // columns that its rows don't have.
    deriveChartColumns(result) {
      if (!result || !result.schema) {
        this.num_columns = [];
        this.string_columns = [];
        return;
      }
      const num = [], str = [];
      for (const f of result.schema.fields) {
        const t = String(f.type);
        if (/^(Int|Uint|Float|Decimal)/.test(t)) num.push({name: f.name, type: t});
        else str.push({name: f.name, type: t});
      }
      this.num_columns = num;
      this.string_columns = str;
      // Keep the user's axis picks when the new result still has them.
      const xPool = (this.selected_chart_type === 'scatter' || this.selected_chart_type === 'histogram') ? num : str;
      if (!xPool.some(c => c.name === this.selected_x_column)) {
        this.selected_x_column = xPool.length ? xPool[0].name : '';
      }
      if (!num.some(c => c.name === this.selected_y_column)) {
        this.selected_y_column = num.length ? num[0].name : '';
      }
    },
    // Arrow returns DATE/TIMESTAMP values as epoch-ms numbers; render them as readable strings
    formatTemporalColumns(result, rows) {
      if (!result || !rows.length) return;
      const dateFields = [], tsFields = [];
      try {
        for (const f of result.schema.fields) {
          const t = String(f.type);
          if (t.startsWith('Date')) dateFields.push(f.name);
          else if (t.startsWith('Timestamp')) tsFields.push(f.name);
        }
      } catch (e) { return; }
      if (!dateFields.length && !tsFields.length) return;
      for (const row of rows) {
        for (const c of dateFields) {
          const d = new Date(Number(row[c]));
          if (row[c] != null && !isNaN(d)) row[c] = d.toISOString().slice(0, 10);
        }
        for (const c of tsFields) {
          const d = new Date(Number(row[c]));
          if (row[c] != null && !isNaN(d)) {
            row[c] = d.toISOString().replace('T', ' ').replace('Z', '').replace(/\.000$/, '');
          }
        }
      }
    },
    pushHistory(sql) {
      const trimmed = sql.trim();
      if (!trimmed) return;
      this.queryHistory.unshift({sql: trimmed, ts: Date.now()});
      if (this.queryHistory.length > 50) this.queryHistory.length = 50;
      try { window.localStorage.setItem('wtd_history', JSON.stringify(this.queryHistory)); } catch (e) {}
    },
    loadFromHistory(h) {
      this.query = h.sql;
      this.counter++;
    },
    clearHistory() {
      this.queryHistory = [];
      try { window.localStorage.removeItem('wtd_history'); } catch (e) {}
    },
    formatHistoryTime(ts) {
      const diff = Date.now() - ts;
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      return new Date(ts).toLocaleDateString();
    },
    async summarizeTable(name) {
      this.selection = name;
      const tbl = this.tables.find(t => t.name === name);
      this.query = `SUMMARIZE ${this.quoteRef((tbl && tbl.sqlRef) ? tbl.sqlRef : name)};`;
      this.counter++;
      await this.search();
    },
    async deleteTable(name, index) {
      const tbl = this.tables[index];
      if (tbl && tbl.attached) {
        const catalog = tbl.sqlRef.split('.')[0];
        if (!window.confirm(`Detach database "${catalog}"? This removes all its tables from this session.`)) return;
        try {
          await this.$conn.query(`DETACH ${this.quoteIdent(catalog)};`);
        } catch (e) { /* may already be detached */ }
        this.tables = this.tables.filter(t => !(t.attached && t.sqlRef.split('.')[0] === catalog));
      } else {
        if (!window.confirm(`Drop table "${name}"?`)) return;
        const q = await this.$conn.prepare(`DROP TABLE ${this.quoteIdent(name)};`);
        await q.query();
        this.tables.splice(index, 1);
        this.removeChartConfig(name);
      }
      if (this.tables.length === 0) {
        this.selection = '';
        this.query = '';
        this.rows = [];
      } else {
        this.selectTable(this.tables[0].name);
      }
      this.$q.notify({type: 'positive', message: `Removed "${name}"`, position: 'top'});
    },
    async handleDrop(e) {
      e.preventDefault();
      const items = e.dataTransfer.items;
      const collected = [];
      if (items && items.length > 0 && items[0].webkitGetAsEntry) {
        for (const item of items) {
          const entry = item.webkitGetAsEntry();
          if (entry) await this.collectFromEntry(entry, collected);
        }
      } else {
        for (const f of e.dataTransfer.files) collected.push(f);
      }
      if (collected.length > 0) this.$refs.uploaderref.addFiles(collected);
    },
    async collectFromEntry(entry, collected) {
      if (entry.isFile) {
        const f = await new Promise((resolve, reject) => entry.file(resolve, reject));
        collected.push(f);
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        // readEntries returns batches; loop until empty
        while (true) {
          const batch = await new Promise((resolve) => reader.readEntries(resolve));
          if (!batch.length) break;
          for (const e of batch) await this.collectFromEntry(e, collected);
        }
      }
    },
    _b64encode(u8) {
      let s = '';
      for (let i = 0; i < u8.length; i += 0x8000) {
        s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      }
      return btoa(s);
    },
    _b64decode(b64) {
      const s = atob(b64);
      const u8 = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
      return u8;
    },
    formatSql(sql) {
      if (!sql) return sql;
      const KW = ['SELECT','FROM','WHERE','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET',
                  'LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','FULL JOIN','CROSS JOIN','JOIN',
                  'ON','AND','OR','UNION ALL','UNION','INSERT INTO','VALUES','UPDATE','SET',
                  'DELETE FROM','CREATE TABLE','CREATE VIEW','DROP TABLE','WITH','AS'];
      let out = sql.replace(/\s+/g, ' ').trim();
      for (const k of KW) {
        const pat = new RegExp(`\\b${k.replace(/ /g, '\\s+')}\\b`, 'gi');
        const replacement = ['AS','ON','AND','OR'].includes(k) ? ` ${k} ` : `\n${k} `;
        out = out.replace(pat, replacement);
      }
      return out.replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').replace(/^\n/, '').trim();
    },
    formatCurrentSql() {
      this.query = this.formatSql(this.query);
      this.counter++;
    },
    async runExplain() {
      if (!this.query || !this.query.trim()) return;
      const stripped = this.query.trim().replace(/;\s*$/, '');
      const saved = this.query;
      this.query = `EXPLAIN ${stripped};`;
      try {
        await this.search();
      } finally {
        this.query = saved;
      }
    },
    async toggleExtension(ext) {
      if (this.loadedExtensions.includes(ext)) {
        this.$q.notify({type: 'info', message: `${ext} already loaded (cannot unload in DuckDB-WASM)`, position: 'top'});
        return;
      }
      this.$q.loading.show({message: `Loading ${ext}...`});
      try {
        await this.$conn.query(`INSTALL ${ext};`);
        await this.$conn.query(`LOAD ${ext};`);
        this.loadedExtensions.push(ext);
        this.$q.notify({type: 'positive', message: `Loaded ${ext}`, position: 'top'});
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Failed to load ${ext}: ${err.message}`, position: 'top'});
      } finally {
        this.$q.loading.hide();
      }
    },
    async exportWorkbook() {
      const localTables = this.tables.filter(t => !t.attached);
      if (localTables.length === 0) {
        this.$q.notify({type: 'negative', message: 'No local tables to export', position: 'top'});
        return;
      }
      this.$q.loading.show({message: 'Building workbook...'});
      try {
        const wb = {
          version: 1,
          created: new Date().toISOString(),
          tables: [],
          query: this.query,
          chart_config: {
            type: this.selected_chart_type,
            x: this.selected_x_column,
            y: this.selected_y_column
          }
        };
        for (const t of localTables) {
          const outName = `__wb_${t.name}_${Date.now()}.parquet`;
          await this.$conn.query(`COPY (SELECT * FROM ${this.quoteIdent(t.name)}) TO '${outName}' (FORMAT 'parquet');`);
          const buf = await this.$db.copyFileToBuffer(outName);
          try { await this.$db.dropFile(outName); } catch (e) {}
          wb.tables.push({name: t.name, parquet_b64: this._b64encode(buf)});
        }
        const blob = new Blob([JSON.stringify(wb)], {type: 'application/json'});
        saveAs(blob, `workbook_${Date.now()}.wtd`);
        this.$q.notify({type: 'positive', message: `Exported ${wb.tables.length} table(s)`, position: 'top'});
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Workbook export failed: ${err.message}`, position: 'top'});
      } finally {
        this.$q.loading.hide();
      }
    },
    async onWorkbookFile(e) {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      this.$q.loading.show({message: 'Importing workbook...'});
      try {
        const text = await file.text();
        const wb = JSON.parse(text);
        if (!wb.tables || !Array.isArray(wb.tables)) throw new Error('Invalid workbook file');
        let added = 0;
        for (const t of wb.tables) {
          if (this.tables.some(x => x.name === t.name)) continue;
          const buf = this._b64decode(t.parquet_b64);
          const fname = `__import_${t.name}_${Date.now()}.parquet`;
          await this.$db.registerFileBuffer(fname, buf);
          await this.$conn.query(`CREATE TABLE ${this.quoteIdent(t.name)} AS SELECT * FROM '${fname}';`);
          await this.addTableToList(t.name);
          try { await this.$db.dropFile(fname); } catch (e) {}
          added++;
        }
        if (wb.query) this.query = wb.query;
        if (wb.chart_config) {
          if (wb.chart_config.type) this.selected_chart_type = wb.chart_config.type;
          if (wb.chart_config.x) this.selected_x_column = wb.chart_config.x;
          if (wb.chart_config.y) this.selected_y_column = wb.chart_config.y;
        }
        this.counter++;
        this.$q.notify({type: 'positive', message: `Imported ${added} table(s)`, position: 'top'});
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Workbook import failed: ${err.message}`, position: 'top'});
      } finally {
        this.$q.loading.hide();
      }
    },
    shareQueryUrl() {
      const payload = {
        q: this.query,
        c: this.selected_chart_type,
        x: this.selected_x_column,
        y: this.selected_y_column
      };
      try {
        const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
        const url = `${window.location.origin}${window.location.pathname}#wtd=${encoded}`;
        window.history.replaceState(null, '', `#wtd=${encoded}`);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(
            () => this.$q.notify({type: 'positive', message: 'Share URL copied to clipboard', position: 'top'}),
            () => this.$q.notify({type: 'info', message: url, position: 'top', timeout: 8000})
          );
        } else {
          this.$q.notify({type: 'info', message: url, position: 'top', timeout: 8000});
        }
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Share failed: ${err.message}`, position: 'top'});
      }
    },
    loadFromHash() {
      const hash = window.location.hash;
      if (!hash || !hash.includes('wtd=')) return false;
      try {
        const encoded = hash.replace(/^#wtd=/, '');
        const json = decodeURIComponent(escape(atob(encoded)));
        const payload = JSON.parse(json);
        if (payload.q) this.query = payload.q;
        if (payload.c) this.selected_chart_type = payload.c;
        if (payload.x) this.selected_x_column = payload.x;
        if (payload.y) this.selected_y_column = payload.y;
        this.counter++;
        this.$q.notify({type: 'info', message: 'Loaded query from URL — bring your own data', position: 'top', timeout: 5000});
        return true;
      } catch (e) {
        return false;
      }
    },
    async exportResults(format) {
      if (!this.query || !this.query.trim()) {
        this.$q.notify({type: 'negative', message: 'Run a query first', position: 'top'});
        return;
      }
      const formats = {
        csv:     { ext: 'csv',     opts: "(FORMAT 'csv', HEADER)" },
        parquet: { ext: 'parquet', opts: "(FORMAT 'parquet')" },
        json:    { ext: 'json',    opts: "(FORMAT 'json')" }
      };
      const f = formats[format];
      if (!f) return;
      const statements = this.splitSql(this.query);
      if (statements.length === 0) return;
      const stripped = statements[statements.length - 1];
      const outName = `__export_${Date.now()}.${f.ext}`;
      this.$q.loading.show({message: `Exporting ${f.ext.toUpperCase()}...`});
      try {
        await this.$conn.query(`COPY (${stripped}) TO '${outName}' ${f.opts};`);
        const buffer = await this.$db.copyFileToBuffer(outName);
        saveAs(new Blob([buffer]), `${this.selection || 'results'}.${f.ext}`);
        try { await this.$db.dropFile(outName); } catch (e) { /* ignore */ }
      } catch (err) {
        this.$q.notify({type: 'negative', message: `Export failed: ${err.message}`, position: 'top'});
      } finally {
        this.$q.loading.hide();
      }
    },
    openPopUp() {
      this.getStartedDialog = true;
    },
    getStarted() {
      this.getStartedDialog = false;
      this.slide = 'step_1';
      try { window.localStorage.setItem('wtd_seen_welcome', 'true'); } catch (e) {}
    },
    openPasteDialog() {
      this.pasteText = '';
      this.pasteTableName = `paste_${Date.now().toString().slice(-5)}`;
      this.pasteDialog = true;
    },
    async confirmPaste() {
      const name = this.pasteTableName.replace(/[^a-zA-Z0-9]/g, '_');
      if (!name) { this.$q.notify({type:'negative', message:'Invalid table name', position:'top'}); return; }
      if (this.tables.some(t => t.name === name)) {
        this.$q.notify({type:'negative', message:`Table "${name}" already exists`, position:'top'});
        return;
      }
      this.pasteDialog = false;
      this.$q.loading.show();
      try {
        await this.$db.registerFileText(`${name}.csv`, this.pasteText);
        await this.$conn.query(`CREATE TABLE ${this.quoteIdent(name)} AS SELECT * FROM read_csv_auto('${name}.csv', header=true);`);
        await this.processNewTable(name);
      } catch (err) {
        this.$q.loading.hide();
        this.$q.notify({type:'negative', message:`Paste import failed: ${err.message}`, position:'top'});
      }
    },
    loadSampleByKey(key) {
      const samples = {
        customers: {text: sample_csv,  name: 'customers'},
        iris:      {text: iris_csv,    name: 'iris'},
        weather:   {text: weather_csv, name: 'weather'},
        orders:    {text: orders_csv,  name: 'orders'}
      };
      const s = samples[key];
      if (!s) return;
      const blob = new Blob([s.text], {type: 'text/csv'});
      const file = new File([blob], `${s.name}.csv`, {type: 'text/csv'});
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
      if (this.selected_chart_type === 'scatter' || this.selected_chart_type === 'histogram') {
        return this.num_columns.map((col) => col['name']);
      }
      return this.string_columns.map((col) => col['name']);
    },
    getLineOptions() {
      const base = this.getBarOptions;
      return {
        ...base,
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {color: 'rgba(196, 249, 99)', width: 2},
          itemStyle: {color: 'rgba(196, 249, 99)'},
          data: this.rows.map(row => row[this.selected_y_column])
        }]
      };
    },
    getHistogramOptions() {
      const col = this.selected_x_column;
      const values = this.rows.map(r => Number(r[col])).filter(v => Number.isFinite(v));
      if (values.length === 0) {
        return {backgroundColor: '#0b0b0b', xAxis: {data: []}, yAxis: {}, series: [{type: 'bar', data: []}]};
      }
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      const bucketCount = Math.min(20, Math.max(5, Math.floor(Math.sqrt(values.length))));
      const width = range === 0 ? 1 : range / bucketCount;
      const buckets = new Array(bucketCount).fill(0);
      for (const v of values) {
        let idx = Math.floor((v - min) / width);
        if (idx >= bucketCount) idx = bucketCount - 1;
        buckets[idx]++;
      }
      const labels = buckets.map((_, i) => {
        const lo = min + i * width;
        const hi = lo + width;
        return `${numeral(lo).format('0.[00]a')}–${numeral(hi).format('0.[00]a')}`;
      });
      return {
        backgroundColor: '#0b0b0b',
        grid: {left: '5%', right: '5%', bottom: '20%'},
        tooltip: {},
        xAxis: {
          data: labels,
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {color: '#DFDEDF', rotate: 30, fontSize: 10}
        },
        yAxis: {
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},
          axisLabel: {color: '#DFDEDF', fontWeight: 700, fontSize: '11px'}
        },
        series: [{
          type: 'bar',
          itemStyle: {borderRadius: [4, 4], color: 'rgba(196, 249, 99)'},
          data: buckets
        }]
      };
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
  width: 34rem;
  max-height: 90vh;
  border-radius: 50px;
}

.csv-header-options .q-radio__label,
.csv-header-options .q-radio {
  color: #DFDEDF !important;
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
