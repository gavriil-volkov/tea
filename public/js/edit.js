// document.getElementById('editButton').addEventListener('click', async (event) => {
//   event.preventDefault();
//   const resp = await fetch('/card/:id/edit');
//   const result = await resp.text();
//   const cont1 = document.getElementById('cont1');
//   cont1.innerHTML = result;
// });

const editForm = document.getElementById('editForm');
if (editForm) {
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const splitHref = window.location.href.split('/');
    const id = splitHref[splitHref.length - 1];
    const title = event.target.title.value;
    const description = event.target.description.value;
    const location = event.target.location.value;
    const response = await fetch(`/getentry/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, location, id }) });
    const parsedResponse = await response.text();
    window.location = `/card/${id}`;
  });
}
