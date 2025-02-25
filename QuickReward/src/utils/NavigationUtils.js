import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export function replace(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
}

export function resetAndNavigate(routeName) {
  console.log('Attempting to navigate to:', routeName);
  console.log('Navigation ready:', navigationRef.isReady());
  
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  } else {
    console.log('Navigation not ready');
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export function push(routeName, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export function prepareNavigation() {
  navigationRef.isReady();
}
