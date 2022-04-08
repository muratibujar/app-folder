import moment from 'moment'
import Vue from 'vue'
// import numeral from 'numeral';
// import CurrencyData from '@/assets/currencies/currencies';
Vue.filter('capitalize', (value) => {
    if (value === undefined) return '';
    value = value.toString().toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('toFixed', function (value, decimalPlaces) {
    return `${parseFloat(value).toFixed(decimalPlaces)}`
});
Vue.filter('formatDate', function (value) {
    if (!value) {
        return null
    }
    return moment(value).format('MMM DD, YYYY')
});
Vue.filter('shortFormatDate', function (value) {
    return moment(value).format('MMM, YYYY')
});
Vue.filter('timestamp', function (timestamp) {
    return moment(moment(timestamp).toDate()).format("YYYY-MM-DD HH:mm:ss:SSS");
});
Vue.filter('json', value => {
    return JSON.stringify( JSON.parse(atob(value)), null, 2);
})

