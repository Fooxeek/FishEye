let totalLikes = 0;
const totalLikesObservers = [];

export function getTotalLikes(media) {
  totalLikes = 0;
  media.forEach((mediaItem) => {
    totalLikes += mediaItem.likes;
  });
  notifyObservers();
  return totalLikes;
}

export function updateTotalLikes(likes) {
  totalLikes += likes;
  notifyObservers();
}

export function addObserver(observer) {
  totalLikesObservers.push(observer);
}

function notifyObservers() {
  totalLikesObservers.forEach((observer) => {
    observer(totalLikes);
  });
}
