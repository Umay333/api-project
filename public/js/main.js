const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteArtwork)
})

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addOneLike)
})

async function deleteArtwork() {
    console.log('asd')
    const aName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('deleteArtwork', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'artistName': aName,
                'artworkName': pName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function addOneLike() {
    const aName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'artistName': aName,
                'artworkName': pName,
                'likes': tLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }

}
