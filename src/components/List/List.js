import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import './_list.scss';

function List({ items = [], lastItemRef, loadMore }) {
  return (
    <>
      <ul className="message-list">
        {items.map((item, index) => {
          if (items.length === index + 3) {
            return (
              <li
                ref={lastItemRef}
                key={item.id + index}
                className="message-list__item"
              >
                <Card sx={{ maxWidth: 645, width: '90vw' }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="Author"
                        src={`http://message-list.appspot.com${item.author.photoUrl}`}
                        alt={item.author.name}
                      />
                    }
                    title={item.author.name}
                    subheader={item.updated}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.content}
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            );
          } else {
            return (
              <li key={item.id + index} className="message-list__item">
                <Card sx={{ maxWidth: 645, width: '90vw' }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="Author"
                        src={`http://message-list.appspot.com${item.author.photoUrl}`}
                        alt={item.author.name}
                      />
                    }
                    title={item.author.name}
                    subheader={item.updated}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.content}
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            );
          }
        })}
        {loadMore ? (
          <li
            className="message-list__skeleton"
            sx={{ maxWidth: 645, width: '90vw' }}
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
        ) : null}
      </ul>
    </>
  );
}

export default List;
