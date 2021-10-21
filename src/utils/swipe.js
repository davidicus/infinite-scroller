import React, { useState, useRef, useEffect } from 'react';
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

const SwipeAndDismiss = ({
  Element = 'li',
  children,
  className,
  handleSwipeCb,
}) => {
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
  const active = useRef(false);

  useEffect(() => {
    if (swipedir && swipedir !== 'none') {
      handleswipe(swipedir);
    }
  }, [swipedir]);

  useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef.current?.getBoundingClientRect().height);
    }
  }, []);

  function handleswipe(swipedir, index) {
    console.log('Swiper is swiping ', swipedir);
    if (swipedir === 'right') {
      setDismissed(true);
    }
  }

  function handleTouchStart(e) {
    // if (!e.changedTouches) {
    //   e.currentTarget.style.visibility = 'hidden';
    // }
    let touchObj = unify(e);
    setSwipedir('none');
    setDist(0);
    startX.current = touchObj.pageX;
    startY.current = touchObj.pageY;
    startTime.current = new Date().getTime(); // record time when finger first makes contact with surface
    // e.preventDefault();
    if (touchObj.target.tagName === 'DIV' || e.changedTouches) {
      active.current = true;
    }
    console.log(startX.current);
  }

  function handleTouchMove(e) {
    // e.preventDefault(); // prevent scrolling when inside DIV
    let touchObj = unify(e);
    distX.current = touchObj.pageX - startX.current;
    if (active.current && distX.current > 0) {
      setDist(distX.current);
      // console.log(e.target.tagName);
    }
  }

  function handleTouchEnd(e) {
    // if (!e.changedTouches) {
    //   e.currentTarget.style.visibility = 'visible';
    // }
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
    // e.preventDefault();
  }

  return (
    <Element
      ref={elementRef}
      className={classnames({
        [className]: className,
        'swipe-active': active.current,
        'swipe-out': dismissed,
      })}
      style={{ '--x-dist': dist, '--height': height }}
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

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
  swipedir contains either "none", "left", "right", "top", or "down"
  if (swipedir =='left')
      alert('You just swiped left!')
})
*/