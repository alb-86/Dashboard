import React, { useState, useEffect } from 'react';
import {Box,IconButton,List,ListItem,ListItemText,Stack,TextField,Typography,Alert,Divider,Fade, Tooltip,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        description: newTask.trim(),
        isCompleted: false,
      }]);
      setNewTask('');
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const editTask = (id: number, description: string) => {
    setEditTaskId(id);
    setEditDescription(description);
  };

  const saveEditedTask = () => {
    if (editTaskId !== null && editDescription.trim()) {
      setTasks(tasks.map(task =>
        task.id === editTaskId ? { ...task, description: editDescription.trim() } : task
      ));
      setEditTaskId(null);
      setEditDescription('');
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };
  

  return (
     <Box
        component="main"
        sx={{
          width: '100%',
      }}
    >
      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                          textAlign: 'left',
                          width: '100%',
                          background: 'rgb(13, 66, 144)',
                          padding: 3,
                          marginBottom: 5,
                          fontSize: 28,
                          color: 'white',
                        }}
                      >
                       To-Do List
                </Typography>

      <Fade in={showMessage} timeout = {{enter:  500, exit: 1000}}>
        <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
          Task added to list
        </Alert>
      </Fade>
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={addTask}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: '50%',
            width: 50,
            height: 50,
            '&:hover': {
              backgroundColor: '#115293',
              },
            }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
      <List>
        {tasks.map((task) => (
          <Box key={task.id} mb={2}>
            <ListItem
                sx={{
                  backgroundColor: task.isCompleted ? '#e0f7e9' : '#f5f5f5',
                  borderRadius: 2,
                  py: 2,
                  px: 3,
                  boxShadow: task.isCompleted ? '0 0 6px #81c784' : undefined,
                  transition: 'all 0.3s ease',
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1} sx={{
                    marginLeft: '-8px',
                }}>
                  {editTaskId === task.id ? (
                    <>
                      <IconButton onClick={saveEditedTask} color="success">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditTaskId(null)} color="warning">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                        <>
                      <Tooltip title="Mark as Done / Undo">
                        <IconButton onClick={() => toggleComplete(task.id)} color="success">
                          {task.isCompleted ? <UndoIcon /> : <DoneIcon />}
                        </IconButton>
                          </Tooltip>
                      <Tooltip title="Edit Task">
                        <IconButton onClick={() => editTask(task.id, task.description)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                          
                      <Tooltip title="Delete Task">
                        <IconButton onClick={() => deleteTask(task.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              }
              >
              {editTaskId === task.id ? (
                <TextField
                  fullWidth
                  variant="standard"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
                <ListItemText
                  primary={task.description}
                  primaryTypographyProps={{
                    style: {
                      textDecoration: task.isCompleted
                        ? 'line-through'
                        : 'none',
                      fontSize: '1.1rem',
                    },
                  }}
                />
              )}
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      <Box textAlign="center" mt={3}>
  <IconButton
    onClick={clearAllTasks}
    color="error"
    sx={{
      backgroundColor: '#f44336',
      color: '#fff',
      borderRadius: '20px',
      px: 3,
      py: 1,
      '&:hover': {
        backgroundColor: '#c62828',
      }
    }}
  >
    Clear All
  </IconButton>
</Box>
    </Box>
  );
};

export default TodoList;
