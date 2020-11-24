import Vue from "vue"
import {
  Aside,
  Main,
  Container,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Input,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Switch,
  Tag,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Progress,
  Badge,
  Drawer,
  Tooltip,
  Select,
  Option,
  RadioGroup,
  RadioButton,
  MessageBox,
  Popover,
  Notification,
  Col, Row,
  Steps,
  Step,
  Message
} from "element-ui"


// import ElementUI from 'element-ui';
Vue.component(Aside.name, Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Col)
Vue.use(Row)
Vue.use(Steps)
Vue.use(Step)
// Vue.prototype.
Vue.prototype.$confirm = Dialog.confirm;
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
export default Vue