import React from 'react';
import { getColor, handleEditTask, handleAddTask, handleViewTask } from './public/data'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "200px",
    height: "180px",
  },
  cardActionArea: {
    '&:hover': {
      opacity: "0.5",
    },
    height: "76%",
    overflow: "hidden",
  },
  tagContainer: {
    textAlign: "left",
  },
  doneTask: {
    height: "76%",
    overflow: "hidden",
    opacity: "0.5",
  },
  descriptionContainer: {
    wordBreak: "break-all",
    whiteSpace: "normal"
  },
  addIconContainer: {
    height: "100%",
  },
  cardActions: {
    backgroundColor: "#f2f5f8",
  }
}));

// props:
// compulsory: tag
// optional: handleDoneTask, handleDeleteTask, task

const TaskCard = (props) => {
  const classes = useStyles();

  const tag = props.tag

  const handleDeleteTask = props.handleDeleteTask
  const handleDoneTask = props.handleDoneTask

  if (!props.task) {
    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.addIconContainer} onClick={handleAddTask}>
          <AddIcon fontSize="large" />
        </CardActionArea>
      </Card>
    )
  } else {
    const task = props.task
    const id = task.attributes.id
    const status = task.attributes.status
    const color = getColor(id)
    const className = status == "completed" ? classes.doneTask : classes.cardActionArea

    return (
      <Card className={classes.card}>
        <CardActionArea style={{ backgroundColor: color }} className={className} onClick={handleDoneTask(id)} disabled={status == "completed"}>
          <div className={classes.tagContainer}>
            <Chip label={tag.attributes.title} style={{ marginLeft: "5px", height: "20px" }}></Chip>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {task.attributes.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionContainer}>
              {task.attributes.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>

          <Tooltip title="view">
            <IconButton size="small" color="primary" onClick={handleViewTask(id)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="delete">
            <IconButton size="small" color="secondary" onClick={handleDeleteTask(id)}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="edit">
            <span>
              <IconButton size="small" color="primary" onClick={handleEditTask(id)} disabled={status == "completed"}>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>

        </CardActions>
      </Card>
    )
  }
}

export default TaskCard
