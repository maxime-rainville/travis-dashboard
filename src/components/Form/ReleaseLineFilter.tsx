import { makeStyles, FormControl, InputLabel, Select, Input, MenuItem, ListSubheader} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../actions";
import * as ReduxActions from "../../actions/filter";
import { RootState } from "../../reducers";
import classnames from "classnames";
import {releases}  from 'silverstripe-cms-meta';

interface Props {
	className?: string
}


export function ReleaseLineFilter({className}: Props) {
	const {setFilter} = useActions(ReduxActions);
	const {filter} = useSelector((state: RootState) => state.filters);
  const classes = useStyles();

  return (
		<FormControl className={classnames(className, classes.root)}>
        <InputLabel color="secondary">Releases</InputLabel>
        <Select
          value={filter}
          onChange={(event) => setFilter(event.target.value as string)}
          input={<Input />}
          // renderValue={(selected) => (selected as CategoryFilterType[]).map(key => categories[key]).join(', ')}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="latestStable">Latest only</MenuItem>

          <ListSubheader>Silverstripe CMS</ListSubheader>
          {Object.keys(releases).filter(key => key.startsWith('Silverstripe CMS')).map((key) => (
            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}

          <ListSubheader>CWP</ListSubheader>
          {Object.keys(releases).filter(key => key.startsWith('CWP')).map((key) => (
            <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
    margin: theme.spacing(1),
    maxWidth: '100%'
  },
}));
