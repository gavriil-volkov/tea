const deleteEntry = document.getElementById('deleteEntry')
const delBut = document.getElementById('deleteButton')
const delBlock = document.getElementById('deleteBlock')
const noBut = document.getElementById('noButton')

delBut.addEventListener('click', () => {
  delBlock.style = 'display: block'
})

noBut.addEventListener('click', () => {
  delBlock.style = 'display: none'
})

if (deleteEntry) {
  deleteEntry.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const entryId = ev.target.entryId.value;
    console.log(entryId);
    const res = await fetch('/entry', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: entryId })
    })
    window.location.assign('/')
  })
} 

