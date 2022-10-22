import { getPictures, page, query } from './js/pixabay';
import {
  notifyNotFound,
  notifyInfo,
  notifySuccess,
  notifyEmpty,
  notifyError,
} from './js/notifli';

import { makeMarkup } from './js/markup';

const formRef = document.querySelector('form#search-form');
const container = document.querySelector('div.gallery');
const loadMoreBtnRef = document.querySelector('button.load-more');

loadMoreBtnRef.disabled = true;
formRef.addEventListener('submit', onSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMore);

async function onSubmit(evt) {
  evt.preventDefault();
  loadMoreBtnRef.disabled = true;
  const currentQuery = evt.target.elements.searchQuery.value.trim();
  if (!currentQuery) {
    notifyEmpty();
    return;
  }
  try {
    const { hits, totalHits, total } = await getPictures(currentQuery);
    if (hits.length === 0) {
      notifyNotFound();
      return;
    }
    notifySuccess(total);
    const markup = hits.map(makeMarkup).join('');
    container.innerHTML = markup;
    if (totalHits > 40) {
      loadMoreBtnRef.disabled = false;
    }
  } catch (error) {
    console.log(error);
    notifyError();
  }
}

async function onLoadMore() {
  const { total, hits } = await getPictures(query);
  const markup = hits.map(makeMarkup).join('');
  container.insertAdjacentHTML('beforeend', markup);
  const totalPagesLeft = total / 40 - page;
  checkIfMorePics(totalPagesLeft);
}

function checkIfMorePics(pages) {
  if (pages <= 0) {
    loadMoreBtnRef.disabled = true;
    notifyInfo();
  }
}
