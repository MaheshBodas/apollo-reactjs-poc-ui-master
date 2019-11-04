import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { viewsinglerisk} from './viewsinglerisk.reducer';
import { createsinglerisk} from './createsinglerisk.reducer';
import { risktypefield, risktypefields, createsinglerisktype} from './createsinglerisktype.reducer';
import { viewallrisks} from './viewallrisks.reducer';
import { viewrisks } from './viewrisks.reducer';
import { riskpicklist } from './riskpicklist.reducer'
// import { spliceriskfields} from './spliceriskfields.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  viewsinglerisk,
  createsinglerisk,
  risktypefield,
  risktypefields,
  createsinglerisktype,
  viewallrisks,
  viewrisks,
  riskpicklist
  // spliceriskfields
});

export default rootReducer;