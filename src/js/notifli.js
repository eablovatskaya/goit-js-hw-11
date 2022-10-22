import Notiflix from 'notiflix';

function notifySuccess(total) {
  Notiflix.Notify.success(`${total} images found.`);
}
function notifyInfo() {
  Notiflix.Notify.info('This is all we could find for your request.');
}

function notifyEmpty() {
  Notiflix.Notify.failure('Please specify your request');
}
function notifyError() {
  Notiflix.Notify.failure('Something went wrong. Please retry');
}
function notifyNotFound() {
  Notiflix.Notify.failure(
    'No images found for your request. Please try again.'
  );
}

export { notifyNotFound, notifyInfo, notifySuccess, notifyEmpty, notifyError };
