import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import SwipeAndDismiss from '../SwipeAndDismiss/SwipeAndDismiss';

const propTypes = {
  /** Message list to render */
  items: PropTypes.array,
  /** Ref to place on last item to trigger call for more items */
  lastItemRef: PropTypes.func,
  /** String that let's us know we have more messages to call */
  loadMore: function (props, propName) {
    const { propName: data } = props;
    if (data === undefined) return;
    if (typeof data !== 'string' && data !== null) {
      return new Error(`${propName} must either be a string or null`);
    }
  },
  /** Callback to update message list when one has been dismissed */
  handleDismissal: PropTypes.func,
};
export default function List({
  items,
  lastItemRef,
  loadMore,
  handleDismissal,
}) {
  function removeOnDismisall(id) {
    handleDismissal((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <ul className="message-list">
      {items.map((item, index) => {
        // Add ref callback to one of the last items to trigger another fetch
        if (items.length - 5 === index) {
          return (
            <SwipeAndDismiss
              key={item.id}
              className="message-list__item"
              handleDismissal={() => removeOnDismisall(item.id)}
            >
              <Card ref={lastItemRef} sx={{ maxWidth: 645, width: '90vw' }}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="Author"
                      src={`http://message-list.appspot.com${item.author.photoUrl}`}
                      alt={item.author.name}
                    />
                  }
                  title={item.author.name}
                  subheader={new Intl.DateTimeFormat('en', {
                    dateStyle: 'full',
                    timeStyle: 'long',
                  }).format(new Date(item.updated))}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </SwipeAndDismiss>
          );
        } else {
          return (
            <SwipeAndDismiss
              key={item.id}
              className="message-list__item"
              handleDismissal={() => removeOnDismisall(item.id)}
            >
              <Card sx={{ maxWidth: 645, width: '90vw' }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ background: '#eee' }}
                      aria-label="Author"
                      src={`http://message-list.appspot.com${item.author.photoUrl}`}
                      alt={item.author.name}
                    />
                  }
                  title={item.author.name}
                  subheader={new Intl.DateTimeFormat('en', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }).format(new Date(item.updated))}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </SwipeAndDismiss>
          );
        }
      })}
      {
        // if there are no more page tokens then we finished loading our messages
        loadMore !== null ? (
          <li
            className="message-list__skeleton"
            sx={{
              maxWidth: 645,
              width: '90vw',
            }}
          >
            <Card sx={{ maxWidth: 645, width: '90vw' }}>
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                }
                title={
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                }
                subheader={
                  <Skeleton animation="wave" height={10} width="40%" />
                }
              />
              <CardContent>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </CardContent>
            </Card>
          </li>
        ) : null
      }
    </ul>
  );
}

List.propTypes = propTypes;
List.defaultProps = {
  items: [],
};
