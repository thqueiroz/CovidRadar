import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import HealthProfile from './pages/HealthProfile';
import Maps from './pages/Maps';

const LoginStack = createStackNavigator();
const TabDashboard = createBottomTabNavigator();

export default function Routes({ signedIn }) {
    return (
        <NavigationContainer>
            {!signedIn ? (
                <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                    <LoginStack.Screen name="SignIn" component={SignIn} />
                </LoginStack.Navigator>
            ) : (
                <TabDashboard.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: () => {
                            let iconName;

                            if (route.name === 'Saude') {
                                iconName = 'healing';
                            }

                            if (route.name === 'Mapa') {
                                iconName = 'place';
                            }

                            return (
                                <Icon name={iconName} size={20} color="#000" />
                            );
                        }
                    })}
                    tabBarOptions={{
                        keyboardHidesTabBar: true,
                        activeTintColor: '#000',
                        inactiveTintColor: 'rgba(255,255,255, 0)',
                        style: {
                            backgroundColor: '#0000'
                        }
                    }}
                >
                    <TabDashboard.Screen
                        name="Saude"
                        component={HealthProfile}
                    />

                    <TabDashboard.Screen name="Mapa" component={Maps} />
                </TabDashboard.Navigator>
            )}
        </NavigationContainer>
    );
}
