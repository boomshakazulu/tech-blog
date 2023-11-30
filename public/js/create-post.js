const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('textarea[name="post-title"]')
    .value.trim();
  const post_text = document
    .querySelector('textarea[name="content"]')
    .value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content: post_text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
