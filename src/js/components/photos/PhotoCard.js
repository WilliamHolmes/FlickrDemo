import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format as formatDate } from 'date-fns';
import _ from 'underscore';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/OpenInNew';

import { Strings } from '../../constants';

const styles = theme => ({
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11
  },
  chipRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0px !important'
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  cardsRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    maxWidth: 300,
    minWidth: 265,
    margin: 5
  },
  cardHeader: {
    content: {
      title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '220px'
      }
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardActions: {
    minHeight: '64px'
  },
  chipActions: {
    display: 'flex'
  },
  collapseContent: {
    paddingTop: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    },
    alignSelf: 'flex-end'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  title: {
    display: 'none',
    wordBreak: 'break-word',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
});

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    _.bindAll(this, 'handleExpandClick');
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  openImage(url) {
    const win = window.open('');
    win.opener = null;
    win.location = url;
  }

  render() {
    const { photo, classes } = this.props;
    const { id, iconurls: { default: avatarURL } = {}, datetaken, farm, owner, ownername = '', secret, server, tags = '', title }  = photo;
    const allTags = _.compact(tags.split(' '));
    let chips;
    let chipsButton;
    if (!_.isEmpty(allTags)) {
      chips = (
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent className={classes.collapseContent}>
            <Divider className={classes.divider} />
            <CardActions className={classes.chipActions} disableActionSpacing>
              <CardContent className={classes.chipRoot}>
                {allTags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />)}
              </CardContent>
            </CardActions>
          </CardContent>
        </Collapse>
      );
      chipsButton = (
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: this.state.expanded
          })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label={'Show more'}
        >
          <Tooltip
            enterDelay={200}
            leaveDelay={200}
            classes={{ tooltip: classes.lightTooltip }}
            title={`${this.state.expanded ? Strings.tags.HIDE : Strings.tags.SHOW}`}
            placement={'top'}
          >
            <ExpandMoreIcon />
          </Tooltip>
        </IconButton>
      );
    }

    const imageURL = _.template(Strings.templates.PHOTO_URL)({ farm, server, id, secret })
    const flickrURL = _.template(Strings.templates.FLICKR_URL)({ id, owner });

    return (
      <Card key={id} className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar src={avatarURL} className={classes.avatar}>
              {ownername.charAt(0).toUpperCase()}
            </Avatar>
          )}
          className={classes.cardHeader}
          title={ownername}
          subheader={`${formatDate(new Date(datetaken), 'MMMM D, YYYY')}`}
          action={(
            <IconButton>
              <LinkIcon onClick={() => this.openImage(flickrURL)} />
            </IconButton>
          )}
        />
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={title}
        />
        <CardActions className={classes.cardActions}>
          <Typography className={classes.title} component='p' align={'left'}>
            {title}
          </Typography>
          {chipsButton}
        </CardActions>
        {chips}
      </Card>
    )
  }
}

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoCard);
