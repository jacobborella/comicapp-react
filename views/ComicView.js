import React, { useState, useEffect } from "react";

import { View, Button, Text, TextInput } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useTasks } from "../providers/TasksProvider";
import { TaskItem } from "../components/TaskItem";
import { AddTask } from "../components/AddTask";

export function ComicView({ route, navigation }) {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const { comicId } = route.params;
  const { tasks } = useTasks();

  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddTask createTask={() => alert('Create Comic')} />;
      },
      title: 'Edit Comic'
    });
  }, []);

  return (
    <View>
      <Text>Title:</Text>
      <View style={styles.inputContainer}>
        <TextInput
//          onChangeText={setEmail}
          value={tasks.title}
          placeholder="title"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <Text>Subtitle:</Text>
      <View style={styles.inputContainer}>
        <TextInput
//          onChangeText={setEmail}
          value={tasks.subtitle}
          placeholder="subtitle"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
