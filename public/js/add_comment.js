const addButton = document.getElementById('addComment');
const addForm = document.getElementById('addForm');
if (addButton) {
  addButton.addEventListener('click', (event) => {
    event.preventDefault()
    // console.log(addButton, "!!!!!!!!!!!!!!!!!!!!!");
    addForm.style = 'display: block';
    addButton.style = 'display: none';
  })
}
if (addForm) {
  addForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const comment = ev.target.comment.value;
    const entryId = ev.target.entryId.value;
    // console.log(comment, "===========>>>>>>>>>>>>>");
    // console.log(entryId, "===========>>>>>>>>>>>>>");
    const res = await fetch('/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment, entryId })
    })
    window.location.assign(`/card/${entryId}`)
  })
} 
