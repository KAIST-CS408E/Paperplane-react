export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const contentEmbededHTML = (content) => {
  const figureRegex = /(?!<a class="embed-F\d+">)fig\.?(?:ure)?\s*(\d+)(?!<\/a>)/gi;
  const equationRegex = /(?!<a class="embed-E\d+">)eq\.?(?:uation)?\s*(\d+)(?!<\/a>)/gi;

  return content
    .replace(figureRegex, (match, number) => `<a class="embed-F${number}" style="text-decoration: underline;">${match}</a>`)
    .replace(equationRegex, (match, number) => `<a class="embed-E${number}" style="text-decoration: underline;">${match}</a>`);
};

export const popUpModalOnClick = (document, paper, showModal) => {
  const addModalListener = (item) => {
    return (link) => {
      link.addEventListener('click', () => showModal(item));
    };
  };

  paper.figures.forEach((figure) => {
    const imageLinks = document.querySelectorAll(`a[class="embed-${figure.number}"]`);
    imageLinks.forEach(addModalListener(figure));
  });

  paper.equations.forEach((equation) => {
    const equationLinks = document.querySelectorAll(`a[class="embed-${equation.number}"]`);
    equationLinks.forEach(addModalListener(equation));
  });
};
