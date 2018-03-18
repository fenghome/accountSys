import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/systemUser'));
app.model(require('./models/orders'));
app.model(require('./models/storage'));
app.model(require('./models/resource'));
app.model(require('./models/products'));
app.model(require('./models/customers'));
app.model(require('./models/suppliers'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
