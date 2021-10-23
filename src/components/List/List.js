import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import SwipeAndDismiss from '../SwipeAndDismiss/SwipeAndDismiss';

export default function List({ items = [], lastItemRef }) {
  return (
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
      </li>
    </ul>
  );
}
