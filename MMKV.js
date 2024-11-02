import {MMKV, Mode} from 'react-native-mmkv';

const storage = new MMKV({
  id: `user-${userId}-storage`,
  path: `${USER_DIRECTORY}/storage`,
  encryptionKey: 'hunter2',
  mode: Mode.MULTI_PROCESS,
  readOnly: false,
});

export const storeData = async (key, value) => {
  storage.set(key, value);
};

export const retrieveData = async key => {
  return await storage.get(key);
};

export const removeData = async key => {
  storage.delete(key);
};
