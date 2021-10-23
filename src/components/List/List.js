import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import SwipeAndDismiss from '../../utils/swipe';
import './_list.scss';

function List({ items = [], lastItemRef, loadMore }) {
  return (
    <>
      <ul className="message-list">
        {items.map((item, index) => {
          if (items.length === index + 3) {
            return (
              <SwipeAndDismiss key={item.id} className="message-list__item">
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
              <SwipeAndDismiss key={item.id} className="message-list__item">
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
        {/* <li
          className="message-list__skeleton"
          sx={{
            maxWidth: 645,
            width: '90vw',
            display: loadMore ? 'block' : 'none',
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
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
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
        </li> */}
      </ul>
    </>
  );
}

export default List;
