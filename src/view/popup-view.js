import AbstractParentClass from './abstract-parent-class-view';


const createPopupTemplate = (values) => (
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${values.images}" alt="">

          <p class="film-details__age">${values.age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${values.title} </h3>
              <p class="film-details__title-original">original: ${values.originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${values.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${values.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${values.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${values.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${values.release}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${values.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${values.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${values.genre}</span>
                <span class="film-details__genre"></span>
                <span class="film-details__genre"></span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${values.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${values.isWatchList? 'film-details__control-button--active' : ''}  film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${values.isHistory? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${values.isFavorite? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${values.comments}</span></h3>

        <ul class="film-details__comments-list">

        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`);


export default class PopupView extends AbstractParentClass {
  #value = null;

  constructor(value) {
    super();
    this.#value = value;
  }

  get template() {
    return createPopupTemplate(this.#value);
  }

  onCloseButton = (callback) => {

    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickTheCross);
    window.addEventListener('keydown', this.#closeESC);


  }

  #closeClickTheCross = (evt) => {
    evt.preventDefault();
    this.element.remove();
    document.body.classList.remove('hide-overflow');
    window.removeEventListener('keydown', this.#closeESC);

  }

  #closeESC = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc' ) {
      this.element.remove();
      document.body.classList.remove('hide-overflow');
    }
    window.removeEventListener('keydown', this.#closeESC);

  }

  onClickWatchList = (callback) => {

    this._callback.clickWatchList = callback;

    this.element.querySelector('#watchlist').addEventListener('click', this.#clickHandlerWatchList );

  }

  #clickHandlerWatchList = (evt) => {

    evt.preventDefault();

    this._callback.clickWatchList();
  }

   onClickWatched = (callback) => {

     this._callback.clickWatched = callback;

     this.element.querySelector('#watched').addEventListener('click', this.#clickHandlerWatched);

   }

  #clickHandlerWatched = (evt) => {

    evt.preventDefault();

    this._callback.clickWatched();
  }

   onClickFavorite = (callback) => {

     this._callback.clickFavorite = callback;

     this.element.querySelector('#favorite').addEventListener('click', this.#clickHandlerFavorite );

   }

  #clickHandlerFavorite = (evt) => {

    evt.preventDefault();

    this._callback.clickFavorite();
  }

}

