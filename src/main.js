import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import jsPDF from 'jspdf';
window.jsPDF = jsPDF;

createApp(App).mount('#app')