import React, { useState, useEffect } from "react";

import { View, Button, Text, TextInput } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useComic } from "../providers/ComicProvider";
import { AddTask } from "../components/AddTask";

export function ComicView({ route, navigation }) {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const { comicId } = route.params;
  const { comic, saveComic } = useComic();
  const [ title, setTitle] = useState('');
  const [ subtitle, setSubtitle] = useState('');

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
          onChangeText={setTitle}
          defaultValue={comic.title}
          placeholder="title"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <Text>Subtitle:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setSubtitle}
          defaultValue={comic.subtitle}
          placeholder="subtitle"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <Button title="Save" onPress={()=>saveComic(title, subtitle)}/>
    </View>
  );
}
