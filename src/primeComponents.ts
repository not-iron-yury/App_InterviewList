import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import RadioButton from 'primevue/radiobutton';
import Badge from 'primevue/badge';

const components = [
  { name: 'app-button', component: Button },
  { name: 'app-input-text', component: InputText },
  { name: 'app-menu-bar', component: Menubar },
  { name: 'app-toast', component: Toast },
  { name: 'app-spiner', component: ProgressSpinner },
  { name: 'app-card', component: Card },
  { name: 'app-data-table', component: DataTable },
  { name: 'app-column', component: Column },
  { name: 'app-dialog', component: ConfirmDialog },
  { name: 'app-message', component: Message },
  { name: 'app-input-number', component: InputNumber },
  { name: 'app-textarea', component: Textarea },
  { name: 'app-datepicker', component: DatePicker },
  { name: 'app-radio', component: RadioButton },
  { name: 'app-badge', component: Badge },
];

export default components;
