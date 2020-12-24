// prettier-ignore
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useHistory } from 'react-router-dom';
import classnames from "classnames";


interface Props {
  Icon: React.ElementType,
  route: string,
  title: string
}

export function RouterListItem({Icon, route, title}: Props) {
  const classes = useStyles();
  const history = useHistory();

  const props = {
    onClick: () => history.push(route),
    className: classnames({[classes.active]: history.location.pathname === route})
  }

	return (
				<ListItem button {...props}>
					<ListItemIcon>
						<Icon />
					</ListItemIcon>
					<ListItemText primary={title} />
				</ListItem>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  active: {
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.light
    }
  }
}));
