import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { comicSchema } from "../schemas";
import { useAuth } from "./AuthProvider";

const TasksContext = React.createContext(null);

const TasksProvider = ({ children, route }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const { comicId } = route.params;

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: user.id,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const comicFound = projectRealm.objectForPrimaryKey("comic", comicId);
      setTasks(comicFound);
      /*
      comicFound.addListener(() => {
        //TODO: hvorfor virker det ikke? setTasks({ ...comicFound })
        console.log('something changed');
      });
      */
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
      }
    };
  }, [user]);

  const saveComic = (comicId, title) => {
    console.log(title);
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
        const comicFound = projectRealm.objectForPrimaryKey("comic", comicId);
        comicFound.title = "aaa";
        //comicFound.subtitle = subtitle;
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        saveComic,
        tasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { TasksProvider, useTasks };
