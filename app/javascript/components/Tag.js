import React from 'react';
import { defaultTagName } from './public/data'

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: "8px",
        minWidth: "60px"
    },
}));

// props:
// compulsory: tag
// optional: ifEdit, ifSelected, handleSelect, handleDelete

const Tag = (props) => {
    const classes = useStyles();
    const tag = props.tag
    const ifEdit = props.ifEdit
    const avatar = tag.attributes.title.charAt(0).toUpperCase()
    const ifSelected = props.ifSelected

    const handleSelect = ifEdit || !props.handleSelect ? undefined
        : () => props.handleSelect(tag)

    const handleDelete = !ifEdit || tag.attributes.title == "others" ? undefined
        : props.handleDelete(tag.attributes.id)

    return (
        <Chip
            label={tag.attributes.title}
            avatar={<Avatar>{avatar}</Avatar>}
            variant="outlined"
            className={classes.chip}
            onDelete={handleDelete}
            onClick={handleSelect}
            color={ifSelected ? "primary" : "default"}
            disabled={ifEdit && tag.attributes.title == defaultTagName}
        />
    )

}

export default Tag