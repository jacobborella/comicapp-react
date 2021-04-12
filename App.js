import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./providers/AuthProvider";
import { ComicListProvider } from "./providers/ComicListProvider";
import { TasksProvider } from "./providers/TasksProvider";

import { WelcomeView } from "./views/WelcomeView";
import { ComicListView } from "./views/ComicListView";
import { ComicView } from "./views/ComicView";

import { Logout } from "./components/Logout";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{ title: "Comic App" }}
          />
          <Stack.Screen name="Comic List">
            {(props) => {
            const { navigation, route } = props;
              return (
                <ComicListProvider>
                  <ComicListView navigation={navigation}/>
                </ComicListProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen name="Comic View">
            {(props) => {
              const { navigation } = props;
              const { route } = props;
              return (
                <TasksProvider navigation={navigation} route={route}>
                  <ComicView navigation={navigation} route={route}/>
                </TasksProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
