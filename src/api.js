function _fetch(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

export function fetchParkingLots() {
  return _fetch("http://localhost:3000/parkingLots");
}

export function fetchParkingLotDetail(id) {
  return _fetch(`http://localhost:3000/parkingLots/${id}/`);
}

export function fetchParkingLotComment(id) {
  return _fetch(`http://localhost:3000/parkingLots/${id}/comments`);
}

export function fetchAllComments() {
  return _fetch("http://localhost:3000/comments");
}

export function saveRating(id, origRating, currNumRating, rating) {
  // console.log(currNumRating + 1);
  // console.log(origRating);
  return fetch(`http://localhost:3000/parkingLots/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      Rating: (origRating * currNumRating + rating) / (currNumRating + 1),
      NumRating: currNumRating + 1,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveComment(body, parkingLotId) {
  return fetch("http://localhost:3000/comments/", {
    method: "POST",
    body: JSON.stringify({
      body: body,
      parkingLotId: parkingLotId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteComment(commentId) {
  return fetch(`http://localhost:3000/comments/${commentId}`, {
    method: "DELETE",
  });
}
