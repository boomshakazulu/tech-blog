const commentFormHandler = async (event) => {
  event.preventDefault();
  //grabs text from comment body
  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  //get id from url
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  //posts the text to the db
  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //reloads page if successfull else shows an error
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
