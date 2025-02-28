import * as React from 'react';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  Themed,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Button } from './commonComponents/ButtonWithMargin';

interface NavScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class HomeScreen extends React.Component<NavScreenProps> {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigation } = this.props;
    const { push } = navigation;

    return (
      <SafeAreaView style={{ paddingTop: 30 }}>
        <Button onPress={() => push('Other')} title="Push another screen" />
        <Button
          onPress={() => push('ScreenWithNoHeader')}
          title="Push screen with no header"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go Home" />
        <Themed.StatusBar />
      </SafeAreaView>
    );
  }
}

class OtherScreen extends React.Component<NavScreenProps> {
  static navigationOptions = {
    title: 'Your title here',
  };

  render() {
    const { navigation } = this.props;
    const { push, pop } = navigation;

    return (
      <SafeAreaView style={{ paddingTop: 30 }}>
        <Button
          onPress={() => push('ScreenWithLongTitle')}
          title="Push another screen"
        />
        <Button
          onPress={() => push('ScreenWithNoHeader')}
          title="Push screen with no header"
        />
        <Button onPress={() => pop()} title="Pop" />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
        <Themed.StatusBar />
      </SafeAreaView>
    );
  }
}

class ScreenWithLongTitle extends React.Component<NavScreenProps> {
  static navigationOptions = {
    title: "Another title that's kind of long",
  };

  render() {
    const { navigation } = this.props;
    const { pop } = navigation;

    return (
      <SafeAreaView style={{ paddingTop: 30 }}>
        <Button onPress={() => pop()} title="Pop" />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
        <Themed.StatusBar />
      </SafeAreaView>
    );
  }
}

class ScreenWithNoHeader extends React.Component<NavScreenProps> {
  static navigationOptions = {
    header: null,
    title: 'No Header',
  };

  render() {
    const { navigation } = this.props;
    const { push, pop } = navigation;

    return (
      <SafeAreaView style={{ paddingTop: 30 }}>
        <Button onPress={() => push('Other')} title="Push another screen" />
        <Button onPress={() => pop()} title="Pop" />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
        <Themed.StatusBar />
      </SafeAreaView>
    );
  }
}

const StackWithHeaderPreset = createStackNavigator(
  {
    Home: HomeScreen,
    Other: OtherScreen,
    ScreenWithLongTitle,
    ScreenWithNoHeader,
  },
  {
    headerTransitionPreset: 'uikit',
  }
);

export default StackWithHeaderPreset;
