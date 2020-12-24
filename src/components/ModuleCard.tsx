import { makeStyles, Theme, Card, CardContent, Grid, CardHeader, Avatar } from "@material-ui/core";
import * as React from "react";
import { Favourite } from "./Favourite";
import classnames from "classnames";
import {data as ssData} from "silverstripe-cms-meta";

interface Props {
  name: string
  children: React.ReactNode
  url: string
  className?: string
}

export function ModuleCard({name, children, url, className}: Props) {
  const classes = useStyles();
  const meta = ssData.find(({repo}) => repo === name);
  const displayName = meta?.name || name;
  const [ , subheader, title] = displayName.match(/(.+)\/(.+)/) as string[];
  const headerProps = {
    avatar: <Avatar>{displayName.substring(0,1).toUpperCase()}</Avatar>,
    action: <Favourite name={name} />,
    subheader,
    title,
    className: classes.header
  };
	return (
		<Grid item xs={6} sm={4} md={3}>
			<a href={url} style={{textDecoration: 'none'}}>
				<Card className={classnames(classes.box, className)}>
          <CardHeader {...headerProps}></CardHeader>
					<CardContent>
						{children}
					</CardContent>
				</Card>
			</a>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: 'left'
  },
  box: {
		borderRadius: 8,
		textDecoration: 'none',
	},

	text: {
		color: "white",
	},

	modTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
    "& > :first-child": {
      flexGrow: 1
    }
  }

}));
