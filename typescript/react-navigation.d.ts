// Type definitions for react-navigation 3.0.0
// Project: https://github.com/react-navigation/react-navigation
// Definitions by: Huhuanming <https://github.com/huhuanming>
//                 mhcgrq <https://github.com/mhcgrq>
//                 fangpenlin <https://github.com/fangpenlin>
//                 petejkim <https://github.com/petejkim>
//                 Kyle Roach <https://github.com/iRoachie>
//                 phanalpha <https://github.com/phanalpha>
//                 charlesfamu <https://github.com/charlesfamu>
//                 Tim Wang <https://github.com/timwangdev>
//                 Qibang Sun <https://github.com/bang88>
//                 Sergei Butko: <https://github.com/svbutko>
//                 Veit Lehmann: <https://github.com/levito>
//                 Steven Miller <https://github.com/YourGamesBeOver>
//                 Armando Assuncao <https://github.com/ArmandoAssuncao>
//                 Ciaran Liedeman <https://github.com/cliedeman>
//                 Edward Sammut Alessi <https://github.com/Slessi>
//                 Jérémy Magrin <https://github.com/magrinj>
//                 Luca Campana <https://github.com/TizioFittizio>
//                 Ullrich Schaefer <https://github.com/stigi>
//                 Linus Unnebäck <https://github.com/LinusU>
//                 Yosuke Seki <https://github.com/jshosomichi>
//                 Jake <https://github.com/jakebooyah>
//                 Gustavo Brunoro <https://github.com/brunoro>
//                 Denis Frezzato <https://github.com/DenisFrezzato>
//                 Mickael Wegerich <https://github.com/mickaelw>
//                 Max Davidson <https://github.com/maxdavidson>
//                 Lachlan Young <https://github.com/builtbyproxy>
//                 Jason Killian <https://github.com/jkillian>
//                 Jan Hesters <https://github.com/janhesters>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-navigation' {
  import * as React from 'react';

  import {
    Animated,
    Text,
    TextInput,
    StatusBar,
    TextStyle,
    ViewProps,
    ViewStyle,
    StyleProp,
  } from 'react-native';

  // re-export Scrollables
  // @todo: should we re-export from RNGH? not currently exposed through it
  export { FlatList, SectionList, ScrollView } from 'react-native';

  // @todo - any..
  export function getActiveChildNavigationOptions<S>(
    navigation: NavigationProp<S>,
    screenProps?: unknown,
    theme?: SupportedThemes
  ): NavigationParams;

  // @todo when we split types into common, native and web,
  // we can properly change Animated.Value to its real value
  export type AnimatedValue = any;

  /**
   * NavigationState is a tree of routes for a single navigator, where each child
   * route may either be a NavigationScreenRoute or a NavigationRouterRoute.
   * NavigationScreenRoute represents a leaf screen, while the
   * NavigationRouterRoute represents the state of a child navigator.
   *
   * NOTE: NavigationState is a state tree local to a single navigator and
   * its child navigators (via the routes field).
   * If we're in navigator nested deep inside the app, the state will only be the
   * state for that navigator.
   * The state for the root navigator of our app represents the whole navigation
   * state for the whole app.
   */
  export interface NavigationState {
    /**
     * Index refers to the active child route in the routes array.
     */
    index: number;
    routes: NavigationRoute[];
    isTransitioning: boolean;
    key: string;
    params: NavigationParams | undefined;
  }

  export interface DrawerNavigationState extends NavigationState {
    isDrawerOpen: boolean;
    isTransitioning: boolean;
  }

  export type NavigationRoute<Params = NavigationParams> =
    | NavigationLeafRoute<Params>
    | NavigationStateRoute<Params>;

  export interface NavigationLeafRoute<Params = NavigationParams> {
    /**
     * React's key used by some navigators. No need to specify these manually,
     * they will be defined by the router.
     */
    key: string;
    /**
     * Index that represents the depth of the stack
     */
    index: number;
    /**
     * For example 'Home'.
     * This is used as a key in a route config when creating a navigator.
     */
    routeName: string;
    /**
     * Path is an advanced feature used for deep linking and on the web.
     */
    path?: string;
    /**
     * Params passed to this route when navigating to it,
     * e.g. `{ car_id: 123 }` in a route that displays a car.
     */
    params?: Params;
    /**
     * Array containing the navigator's routes
     */
    routes: NavigationRoute[];
    /**
     * Flag that indicates the transition state of the route
     */
    isTransitioning: boolean;
  }

  export type NavigationStateRoute<
    NavigationLeafRouteParams
  > = NavigationLeafRoute<NavigationLeafRouteParams> & NavigationState;

  export type NavigationScreenOptionsGetter<Options> = (
    navigation: NavigationScreenProp<NavigationRoute<any>>,
    screenProps: unknown | null,
    theme: SupportedThemes
  ) => Options;

  export interface NavigationRouter<State = NavigationState, Options = {}> {
    /**
     * The reducer that outputs the new navigation state for a given action, with
     * an optional previous state. When the action is considered handled but the
     * state is unchanged, the output state is null.
     */
    getStateForAction: (
      action: NavigationAction,
      lastState?: State
    ) => State | null;

    /**
     * Maps a URI-like string to an action. This can be mapped to a state
     * using `getStateForAction`.
     */
    getActionForPathAndParams: (
      path: string,
      params?: NavigationParams
    ) => NavigationAction | null;

    getPathAndParamsForState: (
      state: State
    ) => {
      path: string;
      params?: NavigationParams;
    };

    getComponentForRouteName: (routeName: string) => NavigationComponent;

    getComponentForState: (state: State) => NavigationComponent;

    getActionCreators: (
      route: NavigationRoute,
      key: string
    ) => {
      [key: string]: () => NavigationAction;
    };

    /**
     * Gets the screen navigation options for a given screen.
     *
     * For example, we could get the config for the 'Foo' screen when the
     * `navigation.state` is:
     *
     *  {routeName: 'Foo', key: '123'}
     */
    getScreenOptions: NavigationScreenOptionsGetter<Options>;
  }

  export type NavigationScreenOption<T> =
    | T
    | ((navigation: NavigationScreenProp<NavigationRoute>, config: T) => T);

  export interface NavigationScreenDetails<T> {
    options: T;
    state: NavigationRoute;
    navigation: NavigationScreenProp<NavigationRoute>;
  }

  export interface NavigationScreenConfigProps {
    navigation: NavigationScreenProp<NavigationRoute>;
    screenProps: unknown;
    theme: SupportedThemes;
  }

  export type NavigationScreenConfig<Options> =
    | Options
    | ((
        navigationOptionsContainer: NavigationScreenConfigProps & {
          navigationOptions: NavigationScreenConfig<Options>;
        }
      ) => Options);

  export type NavigationComponent =
    | NavigationScreenComponent<NavigationParams, any, any>
    | NavigationNavigator<any, any, any>
    | any;

  export type NavigationScreenComponent<
    Params = NavigationParams,
    Options = {},
    Props = {}
  > = React.ComponentType<NavigationScreenProps<Params, Options> & Props> & {
    navigationOptions?: NavigationScreenConfig<Options>;
  };

  export type NavigationNavigator<
    State = NavigationState,
    Options = {},
    Props = {}
  > = React.ComponentType<NavigationNavigatorProps<Options, State> & Props> & {
    router: NavigationRouter<State, Options>;
    navigationOptions?: NavigationScreenConfig<Options>;
  };

  export interface NavigationParams {
    [key: string]: any;
  }

  export interface NavigationNavigateActionPayload {
    routeName: string;
    params?: NavigationParams;

    // The action to run inside the sub-router
    action?: NavigationNavigateAction;

    key?: string;
  }

  export interface NavigationNavigateAction
    extends NavigationNavigateActionPayload {
    type: 'Navigation/NAVIGATE';
  }

  export interface NavigationBackActionPayload {
    key?: string | null;
    immediate?: boolean;
  }

  export interface NavigationBackAction extends NavigationBackActionPayload {
    type: 'Navigation/BACK';
  }

  export interface NavigationSetParamsActionPayload {
    // The key of the route where the params should be set
    key: string;

    // The new params to merge into the existing route params
    params?: NavigationParams;
  }

  export interface NavigationSetParamsAction
    extends NavigationSetParamsActionPayload {
    type: 'Navigation/SET_PARAMS';
  }

  export interface NavigationInitActionPayload {
    params?: NavigationParams;
  }

  export interface NavigationInitAction extends NavigationInitActionPayload {
    type: 'Navigation/INIT';
    key?: string;
  }

  export interface NavigationReplaceActionPayload {
    key?: string;
    newKey?: string;
    routeName: string;
    params?: NavigationParams;
    action?: NavigationNavigateAction;
  }

  export interface NavigationReplaceAction {
    type: 'Navigation/REPLACE';
    key: string;
    routeName: string;
    params?: NavigationParams;
    action?: NavigationNavigateAction;
  }

  export interface NavigationCompleteTransitionActionPayload {
    key?: string;
    toChildKey?: string;
  }

  export interface NavigationCompleteTransitionAction {
    type: 'Navigation/COMPLETE_TRANSITION';
    key: string;
  }

  export interface NavigationResetActionPayload {
    index: number;
    key?: string | null;
    actions: NavigationNavigateAction[];
  }

  export interface NavigationResetAction extends NavigationResetActionPayload {
    type: 'Navigation/RESET';
  }

  export interface NavigationUriActionPayload {
    uri: string;
  }

  export interface NavigationUriAction extends NavigationUriActionPayload {
    type: 'Navigation/URI';
  }

  export interface NavigationPopActionPayload {
    // n: the number of routes to pop of the stack
    n?: number;
    immediate?: boolean;
  }

  export interface NavigationPopAction extends NavigationPopActionPayload {
    type: 'Navigation/POP';
    key?: string;
  }

  export interface NavigationPopToTopActionPayload {
    key?: string;
    immediate?: boolean;
  }

  export interface NavigationPopToTopAction
    extends NavigationPopToTopActionPayload {
    type: 'Navigation/POP_TO_TOP';
  }

  export interface NavigationPushActionPayload {
    routeName: string;
    params?: NavigationParams;
    action?: NavigationNavigateAction;
    key?: string;
  }

  export interface NavigationPushAction {
    type: 'Navigation/PUSH';
    routeName: string;
    params?: NavigationParams;
    action?: NavigationNavigateAction;
    key?: string;
  }

  export interface NavigationJumpToActionPayload {
    routeName: string;
    key: string;
    params?: NavigationParams;
  }

  export interface NavigationJumpToAction {
    type: 'Navigation/JUMP_TO';
    preserveFocus: boolean;
    routeName: string;
    key: string;
    params?: NavigationParams;
  }

  export interface NavigationDrawerOpenedAction {
    key?: string;
    type: 'Navigation/DRAWER_OPENED';
  }

  export interface NavigationDrawerClosedAction {
    key?: string;
    type: 'Navigation/DRAWER_CLOSED';
  }

  export interface NavigationOpenDrawerAction {
    key?: string;
    type: 'Navigation/OPEN_DRAWER';
  }

  export interface NavigationCloseDrawerAction {
    key?: string;
    type: 'Navigation/CLOSE_DRAWER';
  }

  export interface NavigationToggleDrawerAction {
    key?: string;
    type: 'Navigation/TOGGLE_DRAWER';
  }

  /**
   * Switch Navigator
   */
  export interface NavigationSwitchRouterConfig {
    initialRouteName?: string;
    initialRouteParams?: NavigationParams;
    paths?: NavigationPathsConfig;
    order?: string[];
    backBehavior?: 'none' | 'initialRoute' | 'history' | 'order'; // defaults to 'none'
    resetOnBlur?: boolean; // defaults to `true`
  }

  export function SwitchRouter(
    routeConfigs: NavigationRouteConfigMap,
    config?: NavigationSwitchRouterConfig
  ): NavigationRouter<any, any>;

  export type NavigationStackAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction
    | NavigationSetParamsAction
    | NavigationResetAction
    | NavigationReplaceAction
    | NavigationPopAction
    | NavigationPushAction
    | NavigationPopToTopAction
    | NavigationCompleteTransitionAction;

  export type NavigationTabAction =
    | NavigationInitAction
    | NavigationNavigateAction
    | NavigationBackAction;

  export type NavigationDrawerAction =
    | NavigationDrawerOpenedAction
    | NavigationDrawerClosedAction
    | NavigationOpenDrawerAction
    | NavigationCloseDrawerAction
    | NavigationToggleDrawerAction;

  export type NavigationSwitchAction = NavigationJumpToAction;

  export type NavigationAction =
    | NavigationInitAction
    | NavigationStackAction
    | NavigationTabAction
    | NavigationDrawerAction
    | NavigationSwitchAction
    | { type: 'CHILD_ACTION'; key?: string };

  export type NavigationRouteConfig =
    | NavigationComponent
    | ({
        navigationOptions?: NavigationScreenConfig<any>;
        path?: string;
      } & NavigationScreenRouteConfig);

  export type NavigationScreenRouteConfig =
    | NavigationComponent
    | {
        screen: NavigationComponent;
      }
    | {
        getScreen: () => NavigationComponent;
      };

  export interface NavigationPathsConfig {
    [routeName: string]: string;
  }

  // tslint:disable-next-line:strict-export-declare-modifiers
  interface NavigationTabRouterConfig {
    initialRouteName?: string;
    initialRouteParams?: NavigationParams;
    paths?: NavigationPathsConfig;
    order?: string[]; // todo: type these as the real route names rather than 'string'
    backBehavior?: 'none' | 'initialRoute' | 'history' | 'order'; // defaults to 'initialRoute'
    resetOnBlur?: boolean;
  }

  export interface NavigationRouteConfigMap {
    [routeName: string]: NavigationRouteConfig;
  }

  export type NavigationDispatch = (action: NavigationAction) => boolean;

  export interface NavigationProp<S> {
    state: S;
    dispatch: NavigationDispatch;
  }

  export type EventType =
    | 'willFocus'
    | 'didFocus'
    | 'willBlur'
    | 'didBlur'
    | 'action';

  export interface NavigationEventPayload {
    type: EventType;
    action: NavigationAction;
    state: NavigationState;
    lastState: NavigationState | null | undefined;
  }

  export type NavigationEventCallback = (
    payload: NavigationEventPayload
  ) => void;

  export interface NavigationEventSubscription {
    remove: () => void;
  }

  export interface NavigationEventsProps extends ViewProps {
    navigation?: NavigationNavigator;
    onWillFocus?: NavigationEventCallback;
    onDidFocus?: NavigationEventCallback;
    onWillBlur?: NavigationEventCallback;
    onDidBlur?: NavigationEventCallback;
  }

  export const NavigationEvents: React.ComponentType<NavigationEventsProps>;

  export interface NavigationScreenProp<S, P = NavigationParams> {
    state: S & { params?: P };
    dispatch: NavigationDispatch;
    goBack: (routeKey?: string | null) => boolean;
    dismiss: () => boolean;
    navigate(options: {
      routeName:
        | string
        | {
            routeName: string;
            params?: NavigationParams;
            action?: NavigationNavigateAction;
            key?: string;
          };
      params?: NavigationParams;
      action?: NavigationAction;
      key?: string;
    }): boolean;
    navigate(
      routeNameOrOptions: string,
      params?: NavigationParams,
      action?: NavigationAction
    ): boolean;
    openDrawer: () => any;
    closeDrawer: () => any;
    toggleDrawer: () => any;
    getParam<T extends keyof P>(
      param: T,
      fallback: NonNullable<P[T]>
    ): NonNullable<P[T]>;
    getParam<T extends keyof P>(param: T): P[T];
    setParams: (newParams: Partial<P>) => boolean;
    addListener: (
      eventName: 'willBlur' | 'willFocus' | 'didFocus' | 'didBlur',
      callback: NavigationEventCallback
    ) => NavigationEventSubscription;
    push: (
      routeName: string,
      params?: NavigationParams,
      action?: NavigationNavigateAction
    ) => boolean;
    replace: (
      routeName: string,
      params?: NavigationParams,
      action?: NavigationNavigateAction
    ) => boolean;
    reset: (actions: NavigationAction[], index: number) => boolean;
    pop: (n?: number, params?: { immediate?: boolean }) => boolean;
    popToTop: (params?: { immediate?: boolean }) => boolean;
    isFocused: () => boolean;
    isFirstRouteInParent: () => boolean;
    router?: NavigationRouter;
    dangerouslyGetParent: () => NavigationScreenProp<S> | undefined;
  }

  export interface NavigationNavigatorProps<O = {}, S = {}> {
    theme?: SupportedThemes | 'no-preference';
    detached?: boolean;
    navigation?: NavigationProp<S>;
    screenProps?: unknown;
    navigationOptions?: O;
  }

  export type NavigatorType =
    | 'react-navigation/STACK'
    | 'react-navigation/TABS'
    | 'react-navigation/DRAWER';

  export interface NavigationContainerProps<S = {}, O = {}> {
    uriPrefix?: string | RegExp;
    /**
     * Controls whether the navigation container handles URLs opened via 'Linking'
     * @see https://facebook.github.io/react-native/docs/linking
     * @see https://reactnavigation.org/docs/en/deep-linking.html
     */
    enableURLHandling?: boolean; // defaults to true
    onNavigationStateChange?: (
      prevNavigationState: NavigationState,
      nextNavigationState: NavigationState,
      action: NavigationAction
    ) => void | null | undefined;
    navigation?: NavigationScreenProp<S>;
    /*
     * This prop is no longer supported. Use `loadNavigationState` and
     * `persistNavigationState` instead.
     */
    persistenceKey?: string | null;

    loadNavigationState?: () => Promise<any>;
    persistNavigationState?: (state: NavigationState) => Promise<any>;

    renderLoadingExperimental?: React.ComponentType;
    screenProps?: unknown;
    navigationOptions?: O;
    style?: StyleProp<ViewStyle>;
  }

  export interface NavigationContainerComponent
    extends React.Component<
      NavigationContainerProps & NavigationNavigatorProps<any>
    > {
    dispatch: NavigationDispatch;
  }

  export interface NavigationContainer
    extends React.ComponentClass<
      NavigationContainerProps & NavigationNavigatorProps<any>
    > {
    new (
      props: NavigationContainerProps & NavigationNavigatorProps<any>,
      context?: any
    ): NavigationContainerComponent;

    router: NavigationRouter<any, any>;
    screenProps: unknown;
    navigationOptions: any;
    state: { nav: NavigationState | null };
  }

  export interface SwitchNavigatorConfig {
    initialRouteName: string;
    resetOnBlur?: boolean;
    paths?: NavigationPathsConfig;
    backBehavior?: 'none' | 'initialRoute';
  }

  // Return createNavigationContainer
  export type _SwitchNavigatorConfig = NavigationSwitchRouterConfig;

  export function createSwitchNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    switchConfig?: SwitchNavigatorConfig
  ): NavigationContainer;

  /**
   * NavigationActions
   */
  export namespace NavigationActions {
    const BACK: 'Navigation/BACK';
    const INIT: 'Navigation/INIT';
    const NAVIGATE: 'Navigation/NAVIGATE';
    const SET_PARAMS: 'Navigation/SET_PARAMS';

    function init(options?: NavigationInitActionPayload): NavigationInitAction;
    function navigate(
      options: NavigationNavigateActionPayload
    ): NavigationNavigateAction;
    function back(options?: NavigationBackActionPayload): NavigationBackAction;
    function setParams(
      options: NavigationSetParamsActionPayload
    ): NavigationSetParamsAction;
  }

  /**
   * DrawerActions
   */
  export namespace DrawerActions {
    const OPEN_DRAWER: 'Navigation/OPEN_DRAWER';
    const CLOSE_DRAWER: 'Navigation/CLOSE_DRAWER';
    const TOGGLE_DRAWER: 'Navigation/TOGGLE_DRAWER';

    function openDrawer(): NavigationOpenDrawerAction;
    function closeDrawer(): NavigationCloseDrawerAction;
    function toggleDrawer(): NavigationToggleDrawerAction;
  }

  /**
   * StackActions
   */
  export namespace StackActions {
    const POP: 'Navigation/POP';
    const POP_TO_TOP: 'Navigation/POP_TO_TOP';
    const PUSH: 'Navigation/PUSH';
    const RESET: 'Navigation/RESET';
    const REPLACE: 'Navigation/REPLACE';
    const COMPLETE_TRANSITION: 'Navigation/COMPLETE_TRANSITION';

    function pop(options: NavigationPopActionPayload): NavigationPopAction;
    function popToTop(
      options?: NavigationPopToTopActionPayload
    ): NavigationPopToTopAction;

    function push(options: NavigationPushActionPayload): NavigationPushAction;
    function reset(
      options: NavigationResetActionPayload
    ): NavigationResetAction;

    function replace(
      options: NavigationReplaceActionPayload
    ): NavigationReplaceAction;

    function completeTransition(
      payload?: NavigationCompleteTransitionActionPayload
    ): NavigationCompleteTransitionAction;
  }

  /**
   * SwitchActions
   */
  export namespace SwitchActions {
    const JUMP_TO: 'Navigation/JUMP_TO';

    function jumpTo(
      options: NavigationJumpToActionPayload
    ): NavigationJumpToAction;
  }

  /**
   * Tab Router
   *
   * @desc from react-navigation/src/routers/TabRouter.js
   */
  export function TabRouter(
    routeConfigs: NavigationRouteConfigMap,
    config: NavigationTabRouterConfig
  ): NavigationRouter<any, any>;

  /**
   * Stack Router
   *
   * @desc from react-navigation/src/routers/StackRouter.js
   */
  export function StackRouter(
    routeConfigs: NavigationRouteConfigMap,
    config?: NavigationTabRouterConfig
  ): NavigationRouter<any, any>;

  export interface NavigationStackRouterConfig {
    initialRouteName?: string;
    initialRouteParams?: NavigationParams;
    paths?: NavigationPathsConfig;
    initialRouteKey?: string;
  }

  /**
   * Create Navigator
   *
   * @see https://github.com/react-navigation/react-navigation/blob/master/src/navigators/createNavigator.js
   */
  export interface NavigationDescriptor<
    Params = NavigationParams,
    Options = {}
  > {
    key: string;
    state: NavigationLeafRoute<Params> | NavigationStateRoute<Params>;
    navigation: NavigationScreenProp<any>;
    options: Options;
    getComponent: () => React.ComponentType;
  }

  export type NavigationView<O, S> = React.ComponentType<
    {
      descriptors: { [key: string]: NavigationDescriptor };
      navigationConfig: O;
      screenProps?: unknown;
    } & NavigationInjectedProps
  >;

  export function createNavigator<S, Options>(
    view: NavigationView<Options, S>,
    router: NavigationRouter<S, Options>,
    navigatorConfig?: {} | null,
    navigatorType?: NavigatorType
  ): any;

  /**
   * Create an HOC that injects the navigation and manages the navigation state
   * in case it's not passed from above.
   * This allows to use e.g. the StackNavigator and TabNavigator as root-level
   * components.
   *
   * @see https://github.com/react-navigation/react-navigation/blob/master/src/createNavigationContainer.js
   */
  export function createNavigationContainer(
    Component: NavigationNavigator<any, any, any>
  ): NavigationContainer;

  /**
   * Create an app container to wrap the root navigator
   *
   * @see https://github.com/react-navigation/react-navigation-native/blob/098e2e52b349d37357109d5aee545fa74699d3d4/src/createAppContainer.js#L64
   */
  export function createAppContainer(
    Component: NavigationNavigator<any, any, any>
  ): NavigationContainer;

  /**
   * END MANUAL DEFINITIONS OUTSIDE OF TYPEDEFINITION.JS
   */

  /**
   * BEGIN CUSTOM CONVENIENCE INTERFACES
   */

  export interface NavigationScreenProps<
    Params = NavigationParams,
    Options = any
  > {
    navigation: NavigationScreenProp<NavigationRoute<Params>, Params>;
    screenProps?: unknown;
    navigationOptions?: NavigationScreenConfig<Options>;
  }

  /**
   * END CUSTOM CONVENIENCE INTERFACES
   */

  export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  export type InferProps<
    T extends React.ComponentType<any>
  > = T extends React.ComponentType<infer P> ? P : never;

  export interface NavigationOrientationInjectedProps {
    isLandscape: boolean;
  }

  export function createKeyboardAwareNavigator<Props>(
    Comp: React.ComponentType<Props>,
    stackConfig: object
  ): React.ComponentType<Props>;

  export function withOrientation<P extends NavigationOrientationInjectedProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof NavigationOrientationInjectedProps>>;

  export interface NavigationInjectedProps<P = NavigationParams> {
    navigation: NavigationScreenProp<NavigationRoute<P>, P>;
  }

  // If the wrapped component is a class, we can get a ref to it
  export function withNavigation<
    P extends NavigationInjectedProps,
    T extends React.ComponentClass<P>
  >(
    Component: T & React.ComponentClass<P>
  ): React.ComponentType<
    Omit<P, keyof NavigationInjectedProps> & {
      onRef?: React.Ref<InstanceType<T>>;
    }
  >;

  export function withNavigation<P extends NavigationInjectedProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof NavigationInjectedProps>>;

  // For backwards compatibility
  export function withNavigation<T = {}, P = NavigationParams>(
    Component: React.ComponentType<T & NavigationInjectedProps<P>>
  ): React.ComponentType<
    T & { onRef?: React.Ref<React.Component<T & NavigationInjectedProps<P>>> }
  >;

  export const NavigationProvider: React.ComponentType<{
    value: NavigationProp<any>;
  }>;

  export interface NavigationFocusInjectedProps<P = NavigationParams>
    extends NavigationInjectedProps<P> {
    isFocused: boolean;
  }

  // If the wrapped component is a class, we can get a ref to it
  export function withNavigationFocus<
    P extends NavigationFocusInjectedProps,
    T extends React.ComponentClass<P>
  >(
    Component: T & React.ComponentClass<P>
  ): React.ComponentType<
    Omit<P, keyof NavigationFocusInjectedProps> & {
      onRef?: React.Ref<InstanceType<T>>;
    }
  >;

  export function withNavigationFocus<P extends NavigationFocusInjectedProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<Omit<P, keyof NavigationFocusInjectedProps>>;

  // For backwards compatibility
  export function withNavigationFocus<T = {}, P = NavigationParams>(
    Component: React.ComponentType<T & NavigationFocusInjectedProps<P>>
  ): React.ComponentType<
    T & {
      onRef?: React.Ref<React.Component<T & NavigationFocusInjectedProps<P>>>;
    }
  >;

  /**
   * SafeAreaView Component
   */
  export type SafeAreaViewForceInsetValue = 'always' | 'never';
  export interface SafeAreaViewProps extends ViewProps {
    forceInset?: {
      top?: SafeAreaViewForceInsetValue;
      bottom?: SafeAreaViewForceInsetValue;
      left?: SafeAreaViewForceInsetValue;
      right?: SafeAreaViewForceInsetValue;
      horizontal?: SafeAreaViewForceInsetValue;
      vertical?: SafeAreaViewForceInsetValue;
    };
    children?: React.ReactNode;
  }

  export const SafeAreaView: React.ComponentClass<SafeAreaViewProps>;

  export const NavigationContext: React.Context<
    NavigationScreenProp<NavigationRoute>
  >;

  export function createKeyboardAwareNavigator<Props>(
    Comp: React.ComponentType<Props>,
    stackConfig: object
  ): React.ComponentType<Props>;

  /**
   * SceneView
   */

  export interface SceneViewProps {
    component: React.ComponentType;
    screenProps: unknown;
    navigation: NavigationProp<any>;
  }

  export const SceneView: React.ComponentType<SceneViewProps>;

  /**
   * Themes
   */

  // Context
  export type SupportedThemes = 'light' | 'dark';
  export const ThemeContext: React.Context<SupportedThemes>;

  // Hooks
  export function useTheme(): SupportedThemes;

  // Colors
  export interface Theme {
    header: string;
    headerBorder: string;
    body: string;
    bodyBorder: string;
    bodyContent: string;
    bodyContentBorder: string;
    label: string;
  }
  export const ThemeColors: { [k in SupportedThemes]: Theme };

  // Themed components
  interface ThemedStatusBarProps
    extends React.ComponentProps<typeof StatusBar> {}
  interface ThemedTextProps extends React.ComponentProps<typeof Text> {}
  interface ThemedTextInputProps
    extends React.ComponentProps<typeof TextInput> {}

  export namespace Themed {
    export const StatusBar: React.ComponentType<ThemedStatusBarProps>;
    export const Text: React.ComponentType<ThemedTextProps>;
    export const TextInput: React.ComponentType<ThemedTextInputProps>;
  }
}
