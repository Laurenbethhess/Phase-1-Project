document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    randomDogs()

    const dogCollection = document.querySelector('#dog-collection')
    const newCard = document.querySelector('.card')
    const newCardFormImg = document.querySelector('#new-img')
    const randomButton = document.querySelector('#random')
    let likesNum = 0

    randomButton.addEventListener('click', () => {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(resp => resp.json())
        .then(data => {
            createDog(data.message)
        })
    })

    newCardFormImg.addEventListener('submit', e => {
        e.preventDefault()
        createDog(e.target.comment.value)
        newCardFormImg.reset()
    })

    function randomDogs() {
        fetch('https://dog.ceo/api/breed/hound/walker/images/random')
        .then(resp => resp.json())
        .then(data => {
            const randomDog = document.createElement('img')
            randomDog.src = data.message
            randomDog.className = 'image-size'
            const randomDogName = document.createElement('h3')
            randomDogName.textContent = 'Dog of the Day'
            randomDogName.style = "font-style:italic"
            let randomDogDiv = document.querySelector('#random-dog')
            randomDogDiv.append(randomDog, randomDogName)
            randomDog.addEventListener('mouseover', (e) => {
              if (randomDog !== data.message) {
                    e.target.src = 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
                }
                setTimeout(() => {
                    e.target.src = data.message;
                  }, 1000)
            })
        })
    }

    function addComment(form, input) {
        const commentList = document.createElement('ul')
        form.append(commentList)
        console.log(form)
        const li = document.createElement('li')
        li.textContent = input.value + ' '
        commentList.append(li)
        form.reset()
        //add comment delete button//
        const deleteButton = document.createElement('btn')
        deleteButton.textContent = ' X'
        deleteButton.className = 'delete-button'
        li.append(deleteButton)
        deleteButton.addEventListener('click', () => {
            li.remove()
        })
    }

    function fetchDogs() {
        // fetch('https://dog.ceo/api/breed/hound/walker/images')
        fetch('https://dog.ceo/api/breed/hound/walker/images')
        .then(resp => resp.json())
        .then(data => {
            data.message.forEach(dog => {
                if (dog !== 'https://images.dog.ceo/breeds/hound-walker/n02089867_1079.jpg'
                && dog!== 'https://images.dog.ceo/breeds/hound-walker/n02089867_1082.jpg' 
                && dog!== 'https://images.dog.ceo/breeds/hound-walker/n02089867_1029.jpg') {
                createDog(dog)
                }
            })
        })
    }

    function createDog(dog) {
        //create card div//
        const card = document.createElement('div')
        card.className = 'card'
        //create image//
        const image = document.createElement('img')
        image.src = dog
        image.className = 'image-size'
        card.append(image)
        //create likes container//
        const likesContainer = document.createElement('div')
        const likes = document.createElement('span')
        likes.className = 'likes'
        likes.textContent = '0 likes '
        likesContainer.append(likes)
        //add likesButton//
        const likesButton = document.createElement('btn')
        likesButton.textContent = '♥'
        likesButton.className = 'heart'
        likesContainer.append(likesButton)
        card.append(likesContainer)
        //create event listener
        let likesNum = 0
        likesButton.addEventListener('click', () => {
            likesNum++
            likes.textContent = `${likesNum} likes `
        })
        //create form//
        const form = document.createElement('form')
        //add input field//
        const input = document.createElement('input')
        input.id = 'input'
        input.type = 'text'
        input.name = 'myInput'
        input.value = ''
        input.style = "font-style:italic"
        input.placeholder = 'Add a comment...'
        form.append(input)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            addComment(form, input)
        })
        card.append(form)
        //add submit button//
        const submitButton = document.createElement('btn')
        submitButton.type = 'submit'
        submitButton.textContent = ' submit'
        submitButton.classList = 'comment-button'
        submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            addComment(form, input)
        })
        form.append(submitButton)
        //add card delete button//
        const deleteButton = document.createElement('btn')
        deleteButton.textContent = 'Delete Card'
        deleteButton.className = 'delete-button'
        card.append(deleteButton)
        deleteButton.addEventListener('click', () => {
            card.remove()
        })

        dogCollection.prepend(card)
    }

})

