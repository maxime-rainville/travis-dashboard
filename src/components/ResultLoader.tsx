import { CircularProgress, Typography } from "@material-ui/core";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import { makeStyles } from "@material-ui/styles";
import * as React from "react";


interface Props {
  loading: boolean,
  results: any[] | boolean,
  children: React.ReactNode
}

function NoResult() {
  return (
    <Typography variant="h1" style={{textAlign: 'center'}} >
      <SentimentDissatisfiedIcon style={{fontSize: '6rem'}} />
      <br />Oh no! There's no results.
    </Typography>
  );
}

export function ResultLoader({loading, children, results}: Props) {
  const classes = useStyles();

  const empty = Array.isArray(results) ? results.length === 0 : !results;
	return (
    <>
    {
      loading || empty ?
        <div className={classes.root}>
          {loading ? <CircularProgress size={100} /> : <NoResult /> }
        </div>
        : children
    }
    </>
  );
}

const useStyles = makeStyles({
	root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
	},
});
