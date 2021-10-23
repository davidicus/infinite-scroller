import React, { useState, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}
// export function swipeDetect(el, callback) {
//   var touchsurface = el,
//     swipedir,
//     startX,
//     startY,
//     dist,
//     distX,
//     distY,
//     threshold = 150, //required min distance traveled to be considered swipe
//     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 300, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function (swipedir) {};

//   touchsurface.addEventListener(
//     'touchstart',
//     function (e) {
//       var touchobj = unify(e);
//       swipedir = 'none';
//       dist = 0;
//       startX = touchobj.pageX;
//       startY = touchobj.pageY;
//       startTime = new Date().getTime(); // record time when finger first makes contact with surface
//       e.preventDefault();
//     },
//     false
//   );

//   touchsurface.addEventListener(
//     'mousedown',
//     function (e) {
//       var touchobj = unify(e);
//       swipedir = 'none';
//       dist = 0;
//       startX = touchobj.pageX;
//       startY = touchobj.pageY;
//       startTime = new Date().getTime(); // record time when finger first makes contact with surface
//       e.preventDefault();
//     },
//     false
//   );

//   touchsurface.addEventListener(
//     'touchmove',
//     function (e) {
//       e.preventDefault(); // prevent scrolling when inside DIV
//     },
//     false
//   );

//   touchsurface.addEventListener(
//     'mousemove',
//     function (e) {
//       e.preventDefault(); // prevent scrolling when inside DIV
//     },
//     false
//   );

//   touchsurface.addEventListener(
//     'touchend',
//     function (e) {
//       var touchobj = unify(e);
//       distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
//       distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
//       elapsedTime = new Date().getTime() - startTime; // get time elapsed
//       if (elapsedTime <= allowedTime) {
//         // first condition for awipe met
//         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
//           // 2nd condition for horizontal swipe met
//           swipedir = distX < 0 ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
//         } else if (
//           Math.abs(distY) >= threshold &&
//           Math.abs(distX) <= restraint
//         ) {
//           // 2nd condition for vertical swipe met
//           swipedir = distY < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
//         }
//       }
//       handleswipe(swipedir);
//       e.preventDefault();
//     },
//     false
//   );

//   touchsurface.addEventListener(
//     'mouseup',
//     function (e) {
//       var touchobj = unify(e);
//       distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
//       distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
//       elapsedTime = new Date().getTime() - startTime; // get time elapsed
//       if (elapsedTime <= allowedTime) {
//         // first condition for awipe met
//         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
//           // 2nd condition for horizontal swipe met
//           swipedir = distX < 0 ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
//         } else if (
//           Math.abs(distY) >= threshold &&
//           Math.abs(distX) <= restraint
//         ) {
//           // 2nd condition for vertical swipe met
//           swipedir = distY < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
//         }
//       }
//       handleswipe(swipedir);
//       e.preventDefault();
//     },
//     false
//   );
// }

// export function handleTouchStart(e) {
//   let touchobj = unify(e);
//   swipedir = 'none';
//   dist = 0;
//   startX = touchobj.pageX;
//   startY = touchobj.pageY;
//   startTime = new Date().getTime(); // record time when finger first makes contact with surface
//   e.preventDefault();
// }

const SwipeAndDismiss = ({ Element = 'li', children, className }) => {
  const elementRef = useRef({});
  const [height, setHeight] = useState();
  const [dismissed, setDismissed] = useState(false);
  const [swipedir, setSwipedir] = useState();
  const startX = useRef(0);
  const startY = useRef(0);
  const [dist, setDist] = useState(0);
  const distX = useRef(0);
  const distY = useRef(0);
  const threshold = 150; //required min distance traveled to be considered swipe
  const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
  const allowedTime = 600; // maximum time allowed to travel that distance
  const startTime = useRef(0);
  const active = useRef(false); // swipe is an action so dragging should happen
  const [scrollTop, setScrollTop] = useState(0);
  const [ycord, setYcord] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // if the swipe is to the right dismiss
    if (swipedir && swipedir === 'right') {
      setDismissed(true);
    }
  }, [swipedir]);

  useEffect(() => {
    const onScroll = (e) => setScrollTop(e.target.documentElement.scrollTop);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  useEffect(() => {
    if (ycord < -500) {
      setHidden(true);
    }
  }, [ycord]);

  const observer = useRef();
  const cardItem = useCallback((node) => {
    let onScroll;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      // if (entries[0].isIntersecting) {
      //   setHidden(false);
      // } else {
      //   setHidden(true);
      // }
    });
    if (node) {
      setHeight(node.getBoundingClientRect().height);
      setYcord(node.getBoundingClientRect().y);
      onScroll = (e) => {
        setScrollTop(e.target.documentElement.scrollTop);
        setYcord(node.getBoundingClientRect().y);
      };
      window.addEventListener('scroll', onScroll);
      observer.current?.observe(node);
    } else {
      window.removeEventListener('scroll', onScroll);
      observer.current?.disconnect();
    }
  }, []);

  function handleTouchStart(e) {
    let touchObj = unify(e);
    setSwipedir('none');
    setDist(0);
    startX.current = touchObj.pageX;
    startY.current = touchObj.pageY;
    startTime.current = new Date().getTime(); // record time when finger first makes contact with surface
    if (touchObj.target.tagName === 'DIV' || e.changedTouches) {
      active.current = true;
    }
    console.log(startX.current);
  }

  function handleTouchMove(e) {
    let touchObj = unify(e);
    distX.current = touchObj.pageX - startX.current;
    if (active.current && distX.current > 0) {
      setDist(distX.current);
    }
  }

  function handleTouchEnd(e) {
    var touchObj = unify(e);
    distX.current = touchObj.pageX - startX.current; // get horizontal dist traveled by finger while in contact with surface
    distY.current = touchObj.pageY - startY.current; // get vertical dist traveled by finger while in contact with surface
    // get time elapsed
    if (new Date().getTime() - startTime.current <= allowedTime) {
      // first condition for awipe met
      if (
        Math.abs(touchObj.pageX - startX.current) >= threshold &&
        Math.abs(touchObj.pageY - startY.current) <= restraint
      ) {
        // 2nd condition for horizontal swipe met
        setSwipedir(touchObj.pageX - startX.current < 0 ? 'left' : 'right'); // if dist traveled is negative, it indicates left swipe
        setDist(0);
      } else if (
        Math.abs(touchObj.pageY - startY.current) >= threshold &&
        Math.abs(touchObj.pageX - startX.current) <= restraint
      ) {
        // 2nd condition for vertical swipe met
        setSwipedir(touchObj.pageY - startY.current < 0 ? 'up' : 'down'); // if dist traveled is negative, it indicates up swipe
        distX.current = 0;
      } else {
        setDist(0);
      }
    } else {
      setDist(0);
    }
    active.current = false;
  }

  return (
    <Element
      ref={cardItem}
      className={classnames({
        [className]: className,
        'swipe-active': active.current,
        'swipe-out': dismissed,
        [`${className}--hidden`]: hidden,
      })}
      style={{ '--x-dist': dist, '--height': height, '--ycord': ycord }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      {children}
    </Element>
  );
};

export default SwipeAndDismiss;
