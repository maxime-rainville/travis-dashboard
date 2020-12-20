import { makeStyles, Theme, Button } from "@material-ui/core";
import * as React from "react";
import { useFavourite } from "../selectors/useFavourite";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

interface Props {
  name: string
}

export function Favourite({name}: Props) {
  const classes = useStyles();
  const {isFavourite, toggle} = useFavourite(name);
  const Ico = isFavourite ? StarIcon : StarBorderIcon;

	return (
		<Button className={classes.root} onClick={(event) => {event.preventDefault(); toggle();}} >
      <Ico fontSize="small"/>
    </Button>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		minWidth: 0
	},
}));
