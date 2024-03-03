const DECISION_THRESHOLD = 100
let isAnimating = false
let pullDeltaX = 0

function checkModelFeatured(event) {
    let modelCard = document.querySelectorAll('.swipe-model')[0]
    let likeOfBtn = document.querySelector('.model-option.like-of')

    if (modelCard && modelCard.classList.contains('featured')) {
        let featuredCardUrl = modelCard.dataset.url;
        if (featuredCardUrl) {
            likeOfBtn.style.display = 'flex'
            likeOfBtn.setAttribute('href', featuredCardUrl)
        }
    }else{
        likeOfBtn.style.display = 'none'
        likeOfBtn.setAttribute('href', '#')
    }
}
document.addEventListener('DOMContentLoaded', checkModelFeatured)

function startDrag(event) {
    let likeBtn = document.querySelector('.model-option.like')
    let likeOfBtn = document.querySelector('.model-option.like-of')
    let passBtn = document.querySelector('.model-option.pass')
    
    if (isAnimating) return
    
    const actualCard = event.target.closest('.swipe-model')
    if (!actualCard) return
    
    let nextCardElement = actualCard.nextElementSibling;

    const startX = event.pageX ?? event.touches[0].pageX

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })

    function checkNextCard() {
        if (nextCardElement && nextCardElement.classList.contains('featured')) {
            let featuredCardUrl = nextCardElement.dataset.url;
            if (featuredCardUrl) {
                likeOfBtn.style.display = 'flex'
                likeOfBtn.setAttribute('href', featuredCardUrl)
            }
        }else{
            likeOfBtn.style.display = 'none'
            likeOfBtn.setAttribute('href', '#')
        }
    }

    function openActualFeaturedUrl() {
        if (actualCard.classList.contains('featured')) {
            let featuredCardUrl = actualCard.dataset.url;
            if (featuredCardUrl) {
                window.open(featuredCardUrl);
            }
        }
    }

    function onMove(event) {
        const currentX = event.pageX ?? event.touches[0].pageX

        pullDeltaX = currentX - startX

        if (pullDeltaX === 0) return

        isAnimating = true

        const deg = pullDeltaX / 14

        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`

        actualCard.style.cursor = 'grabbing'

        const opacity = Math.abs(pullDeltaX) / 100
        const goLike = pullDeltaX > 0
        let scale = opacity + 1;
        if (scale > 1.3) {
            scale = 1.3;
        }

        const buttonScaleEl = goLike
        ? document.querySelector('.model-option.like')
        : document.querySelector('.model-option.pass')

        buttonScaleEl.style.transform = 'scale(' + scale + ')';
        
        const choiceEl = goLike
            ? actualCard.querySelector('.choice.like')
            : actualCard.querySelector('.choice.nope')

        choiceEl.style.opacity = opacity
    }

    function onEnd(event) {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)

        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if (decisionMade) {
            const goLike = pullDeltaX >= 0

            checkNextCard();

            if (goLike) {
                // Logica cuando se da Like
                console.log('swipe like');
                openActualFeaturedUrl();
            }else{
                // Logica cuando se da Pass
                console.log('swipe pass');
            }

            actualCard.classList.add(goLike ? 'go-right' : 'go-left')
            actualCard.addEventListener('transitionend', () => {
                actualCard.remove()
            })
        } else {
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')

            document.querySelectorAll('.model-option').forEach(choice => {
                choice.style.transform = 'scale(' + 1 + ')';
            })
            actualCard.querySelectorAll('.choice').forEach(choice => {
                choice.style.opacity = 0
            })
        }

        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')

            pullDeltaX = 0
            isAnimating = false
        })

        document
        .querySelectorAll(".model-option")
        .forEach((el) => (el.style.transform = 'scale(' + 1 + ')'));

        actualCard
        .querySelectorAll(".choice")
        .forEach((el) => (el.style.opacity = 0));
        
    }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })

const optionsWrapper = document.querySelector('.model-options-wrapper')
optionsWrapper.addEventListener('click', (e) => {
    let target = e.target;
    let firstModelCard = document.querySelectorAll('.swipe-model')[0]
    if (firstModelCard) {
        if (target.classList.contains('pass')) {
            console.log('pass btn');
            firstModelCard.remove()
            checkModelFeatured()
        }
        if (target.classList.contains('like')) {
            console.log('like btn');
            firstModelCard.remove()
            checkModelFeatured()
        }
        if (target.classList.contains('like-of')) {
            console.log('like Of');
            firstModelCard.remove()
            checkModelFeatured()
        }
    }
})