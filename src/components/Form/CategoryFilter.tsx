import { makeStyles, FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../actions";
import * as ReduxActions from "../../actions/filter";
import { RootState } from "../../reducers";
import { CategoryFilterType } from "../../reducers/filters";
import classnames from "classnames";

interface Props {
	className?: string
}


const categories: {[key in CategoryFilterType]: string} = {
	core: 'Core',
	supported: 'Supported',
	unsupported: 'Unsupported',
	nonmodule: 'Non-module'
}
export function CategoryFilter({className}: Props) {
	const {setCategoryFilter} = useActions(ReduxActions);
	const {categoryFilters} = useSelector((state: RootState) => state.filters);
  const classes = useStyles();

  if (!categoryFilters) {
    return null;
  }

  return (
		<FormControl className={classnames(className, classes.root)}>
        <InputLabel id="demo-mutiple-checkbox-label" color="secondary">Category</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={categoryFilters}
          onChange={(event) => setCategoryFilter(event.target.value)}
          input={<Input />}
          renderValue={(selected) => (selected as CategoryFilterType[]).map(key => categories[key]).join(', ')}
        >
          {Object.keys(categories).map((key) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={categoryFilters.indexOf(key as CategoryFilterType) > -1} />
              <ListItemText primary={categories[(key as CategoryFilterType)]} />
            </MenuItem>
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
