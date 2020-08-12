function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery Found!!!')
    }
    // select the elements we need
    // if we want to grab many elements,transform them into arry and loop through then later we can use "Array.from(gallery.querySelectorAll('img'))";
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    // A function to close modal
    function handleClickOutside(e) {
        // Refer the ("e.currentTarget" === the outsider) into ("e.target")
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }
    
    // A function to open the modal
    function openModal() {  
        if (modal.matches('.open')) {
            return;
        }
        //  Adding the open class to show the modal
        modal.classList.add('open');
        // Event listener to escape when the outsider is clicked
        window.addEventListener('keyup', hanEscapeButon);
        // Acitvate the escape handleClickOutside function when the key is clicked
        modal.addEventListener("click", handleClickOutside);
        // Acitvate the showNextImage function when the nextButton is clicked
        nextButton.addEventListener("click", showNextImage);
        // Acitvate the showPreviousImage function when the pervousButton is clicked
        prevButton.addEventListener("click", showPreviousImage);
    }

    function closeModal() {
         //  Removing the open class to show the modal
        modal.classList.remove('open');
        // Remove the event listener to escape when the keyup is clicked
        window.removeEventListener('keyup', hanEscapeButon);
         // Remove  the event listener from handleClickOutside function
        modal.removeEventListener("click", handleClickOutside);
         // Remove  the event listener from showNextImage function
        nextButton.removeEventListener("click", showNextImage);
        // Remove  the event listener from showPreviousImage function
        prevButton.removeEventListener("click", showPreviousImage);
    }

    // A fuction to show the next image
    function showNextImage(e) {
        // Refer to the next image
        // If there is no nextSibling then go the galler and grab the firstElementChild
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    // A function to show the previous image
    function showPreviousImage(e) {
        // Refer to the previous image
        showImage(currentImage.previousElementSibling || gallery.lastElementChild)
    }

    function showImage(el) {
        if (!el) {
            console.info('no image to show');
            return;
        }
        // update the modal with this info
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    function hanEscapeButon(e) {
        if (e.key === 'Escape') return closeModal();
        if (e.key === 'ArrowRight') return showNextImage();
        if (e.key === 'ArrowLeft') return showPreviousImage();
        };

    // This is a simple way of writing a function and passing it inside an eventListener
    // Instead of writing this 
    // function handleClick = (e) => {
    //      return e.event.currentTarget;
    // }
    // Listen the evet evry click event on the image

    images.forEach(image => {
        image.addEventListener('click', e => showImage(event.currentTarget));
    });
    images.forEach(image => {
        image.addEventListener('keyup', e => {
            // when that is Keyup , check is it is an enter
            if (e.key === 'Enter') {
                // if it was show   
                showImage(e.currentTarget);
            }
        });
    })
}

const gallery1 = Gallery(document.querySelector('.gallery1')); 
const gallery2 = Gallery(document.querySelector('.gallery2')); 
const gallery3 = Gallery(document.querySelector('.gallery3')); 