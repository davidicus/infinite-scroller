import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Utility to return the right object from the touch/ mouse event
function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

const propTypes = {
  /** Type of element that this component should render as wrapper */
  Element: PropTypes.string,
  /** Callback to update message list when one has been dismissed */
  handleDismissal: PropTypes.func,
};

export default function SwipeAndDismiss({
  Element,
  children,
  className,
  handleDismissal,
}) {
  // Set the custom property to be able to animate the height on dismissal
  const [height, setHeight] = React.useState();
  // Swipe passed all requirements to register a right swipe
  const [dismissed, setDismissed] = React.useState(false);
  // The direction of the swipe
  const [swipedir, setSwipedir] = React.useState();
  // How far the swipe was (update state to trigger a render)
  const [dist, setDist] = React.useState(0);
  // Actively swiping so dragging should happen
  const [active, setActive] = React.useState(false);
  // Swipe calculations starting point
  const startX = React.useRef(0);
  const startY = React.useRef(0);
  const distX = React.useRef(0);
  const distY = React.useRef(0);
  // Time calculations starting point
  const startTime = React.useRef(0);
  // Required min distance traveled to be considered swipe
  const threshold = 150;
  // Maximum distance allowed at the same time in perpendicular direction
  const restraint = 100;
  // Maximum time allowed to travel that distance
  const allowedTime = 1000;

  React.useEffect(() => {
    // if the swipe is to the right dismiss
    if (swipedir && swipedir === 'right') {
      setDismissed(true);
    }
  }, [swipedir]);

  // Use callback ref to be able to set height variable
  // eslint-disable-next-line
  const cardItem = React.useCallback((node) => {
    if (node) {
      setHeight(node.getBoundingClientRect().height);
    }
  });

  // Start drag caclulations
  function handleTouchStart(e) {
    let touchObj = unify(e);
    // Zero out the values
    setSwipedir('none');
    setDist(0);
    // Set starting coordinate values
    startX.current = touchObj.pageX;
    startY.current = touchObj.pageY;
    // Record time when finger first makes contact
    startTime.current = new Date().getTime();
    // Make sure we still allow for text to be highlighted by checking target on non touch
    if (touchObj.target.tagName === 'DIV' || e.changedTouches) {
      setActive(true);
    }
  }

  // Update components position during swipe
  function handleTouchMove(e) {
    let touchObj = unify(e);
    distX.current = touchObj.pageX - startX.current;
    if (active && distX.current > 0) {
      setDist(distX.current);
    }
  }

  function handleTouchEnd(e) {
    var touchObj = unify(e);
    // No longer actively swiping
    setActive(false);
    // Get horizontal dist traveled by finger while in contact with surface
    distX.current = touchObj.pageX - startX.current;
    // Get vertical dist traveled by finger while in contact with surface
    distY.current = touchObj.pageY - startY.current;
    // Get time elapsed
    if (new Date().getTime() - startTime.current <= allowedTime) {
      // Swipe timing condition met
      if (
        Math.abs(touchObj.pageX - startX.current) >= threshold &&
        Math.abs(touchObj.pageY - startY.current) <= restraint
      ) {
        // Distance and threshold tolerances met for horiztonal swipe
        // if dist traveled is negative, it indicates left swipe
        setSwipedir(touchObj.pageX - startX.current < 0 ? 'left' : 'right');
        setDist(window.innerWidth + 100);
      } else if (
        Math.abs(touchObj.pageY - startY.current) >= threshold &&
        Math.abs(touchObj.pageX - startX.current) <= restraint
      ) {
        // Distance and threshold tolerances met for vertical swipe
        // if dist traveled is negative, it indicates up swipe
        setSwipedir(touchObj.pageY - startY.current < 0 ? 'up' : 'down');
        distX.current = 0;
      } else {
        // Did not meet requirements to be considered swipe reset position back to 0
        setDist(0);
      }
    } else {
      // Did not meet requirements to be considered swipe reset position back to 0
      setDist(0);
    }
  }

  return (
    <Element
      ref={cardItem}
      className={classnames({
        [className]: className,
        'swipe--active': active,
        'swipe--out': dismissed,
      })}
      style={{
        '--x-dist': dist,
        '--height': height,
        willChange:
          dismissed || active ? 'transform, max-height, opacity' : null,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTransitionEnd={() => (dismissed ? handleDismissal() : null)}
    >
      {children}
    </Element>
  );
}

SwipeAndDismiss.propTypes = propTypes;
SwipeAndDismiss.defaultProps = {
  Element: 'li',
};
