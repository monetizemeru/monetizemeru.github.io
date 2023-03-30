/**
 * Common
 */
let stack_bottomleft = {'dir1': 'up', 'dir2': 'right', 'firstpos1': 0, 'firstpos2': 0, 'spacing1': 5, 'spacing2': 5};
function notification(type, title, text, state, cssClass){
  let pinStatus = (state === undefined);
  new PNotify({
    text: text,
    type: type,
    title: title,
    addclass: cssClass,
    stack: stack_bottomleft,
    buttons: {closer: true, sticker: false, labels: {close: 'закрыть'}, closer_hover: false},
    styling: 'brighttheme',
    hide: pinStatus,
    width: '100%',
    icon: false,
  });
}
