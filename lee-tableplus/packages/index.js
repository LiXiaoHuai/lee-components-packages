import ElementUI from "element-ui";
import tableplus from './components/index.vue'
import 'element-ui/lib/theme-chalk/index.css';

const install = (Vue) => {
    Vue.use(ElementUI);
    Vue.component(tableplus.name, tableplus);
}

export default install;