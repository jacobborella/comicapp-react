import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { ActionSheet } from "./ActionSheet";

export function ComicItem({ comic }) {
  return (
    <>
      <ListItem
        key={comic._id}
        title={comic.title + (comic.subtitle? ' ' + comic.subtitle: '')}
        bottomDivider
      />
    </>
  );
}
