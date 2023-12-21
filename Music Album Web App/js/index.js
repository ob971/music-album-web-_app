document.addEventListener("DOMContentLoaded", function() {
    const albumList = document.getElementById("album-list");
    const createAlbumForm = document.getElementById("create-album-form");

    // Fetch albums from the API
    fetch("https://jsonplaceholder.typicode.com/albums")
        .then(response => response.json())
        .then(albums => {
            albums.forEach(album => {
                createAlbumCard(album);
            });
        })
        .catch(error => console.log(error));

    createAlbumForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const albumTitleInput = document.getElementById("album-title");
        const albumPhotoUrlInput = document.getElementById("album-photo-url");

        const albumTitle = albumTitleInput.value.trim();
        const albumPhotoUrl = albumPhotoUrlInput.value.trim();

        if (albumTitle !== "" && albumPhotoUrl !== "") {
            const newAlbum = {
                title: albumTitle,
                url: albumPhotoUrl
            };

            // Perform API call or create operation here
            // ...

            albumTitleInput.value = "";
            albumPhotoUrlInput.value = "";

            createAlbumCard(newAlbum, true); // Pass true to insert at the top
        } else {
            const errorElement = document.createElement("p");
            errorElement.classList.add("form-error");
            errorElement.textContent = "Please fill in all fields.";
            createAlbumForm.appendChild(errorElement);
        }
    });

    function createAlbumCard(album, insertAtTop = false) {
        const card = document.createElement("div");
        card.classList.add("card", "album-card");
        card.setAttribute("data-id", album.id);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const albumImage = document.createElement("div");
        albumImage.classList.add("card-image");
        const img = document.createElement("img");
        img.src = album.url;
        albumImage.appendChild(img);

        const albumTitle = document.createElement("h3");
        albumTitle.classList.add("title");
        albumTitle.textContent = album.title;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "is-danger", "is-small");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteAlbum(album.id);
            card.remove();
        });

        const editButton = document.createElement("button");
        editButton.classList.add("button", "is-primary", "is-small");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            editAlbum(album.id);
        });

        cardContent.appendChild(albumImage);
        cardContent.appendChild(albumTitle);
        cardContent.appendChild(deleteButton);
        cardContent.appendChild(editButton);

        card.appendChild(cardContent);

        if (insertAtTop) {
            albumList.insertBefore(card, albumList.firstChild);
        } else {
            albumList.appendChild(card);
        }
    }

    function deleteAlbum(albumId) {
        console.log(`Deleting album with ID: ${albumId}`);
        // Perform API call or delete operation here
    }

    function editAlbum(albumId) {
        const newTitle = prompt("Enter the new title for the album:");

        if (newTitle !== null) {
            console.log(`Editing album with ID: ${albumId} to have a new title: ${newTitle}`);

            const albumTitleElement = document.querySelector(`.album-card[data-id="${albumId}"] .title`);
            if (albumTitleElement) {
                albumTitleElement.textContent = newTitle;
            }
        }
    }
});
