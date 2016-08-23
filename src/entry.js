import 'bootstrap/css/bootstrap.min.css'
import 'jquery-ui-css/core.css'
import 'jquery-ui-css/menu.css'
import 'jquery-ui-css/datepicker.css'
import 'jquery-ui-css/theme.css'
import './entry.less'

import 'jquery'
import 'bootstrap/js/bootstrap.min.js'
import datepicker from 'jquery-ui/datepicker'

$('#root').text('Hello world!');
$('#datepicker').datepicker();

if (module.hot) {
  module.hot.accept();
}