import { configureStore } from '@reduxjs/toolkit';

import financesStore from './finance-service/reducer'

const store = configureStore({
  reducer: {
	financesStore
  },
});

export default store;
