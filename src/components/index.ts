import { App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import Chart from './chart/index.vue';
import Breadcrumb from './breadcrumb/index.vue';
import Container from './container/index.vue';
import SearchForm from './search-form/index.vue';
import TableForm from './table-form/index.vue';
import SvgIcon from './svg-icon/index.vue';
import GridTable from './grid-table/index.vue';
import GridDrawer from './grid-drawer/index.vue';
import GlobalModal from './global-modal/index.vue';
import UploadFile from './uploadFile/index.vue';
import Wrapper from './wrapper/index.vue';
import Watermark from './watermark/index.vue';
import TableOmitCell from './table-omit-cell/index.vue';

// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
]);

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('Container', Container);
    Vue.component('SearchForm', SearchForm);
    Vue.component('TableForm', TableForm);
    Vue.component('GridDrawer', GridDrawer);
    Vue.component('SvgIcon', SvgIcon);
    Vue.component('GridTable', GridTable);
    Vue.component('GlobalModal', GlobalModal);
    Vue.component('UploadFile', UploadFile);
    Vue.component('Wrapper', Wrapper);
    Vue.component('Watermark', Watermark);
    Vue.component('TableOmitCell', TableOmitCell);
  },
};
