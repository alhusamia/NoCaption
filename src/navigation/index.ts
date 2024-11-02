import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export type BaseStackParamList = {
  [key: string]: undefined | Record<string, any>;
};

export function navigate(
  name: keyof BaseStackParamList,
  params?: BaseStackParamList[keyof BaseStackParamList],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function push(...args: Parameters<typeof StackActions.push>) {
  if (navigationRef && navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}
