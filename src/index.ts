// Импортируем стили
import './style.css';

interface IProduct {
    title: string
    img: string
    desc: string
    done: boolean
}
const products: IProduct[] = [
    {   
        title: 'cat',
        img: "img/cat.jpg",
        desc:'my cat',
        done:false
    }
]

function getBtn (title: string) {
    const btn = document.createElement('button')
    btn.classList.add('btn')
    btn.textContent = title
    return btn
}

function getUl () {
    const list = document.createElement('ul')
    list.classList.add('list')
    return list
}

function getLi (product: IProduct, handleDelete: () => void) {
    const card = document.createElement('li')
    card.classList.add('card')

    const cardImage = document.createElement('img')
    cardImage.classList.add('card__img')
    cardImage.src = product.img

    let cardBody = document.createElement('div')
    cardBody.classList.add('card__body')

    const cardTitle =  document.createElement('h2')
    cardTitle.classList.add('card__title')
    cardTitle.textContent = product.title

    const cardDesc = document.createElement('p')
    cardDesc.classList.add('card__desc')
    cardDesc.textContent = product.desc

    let btnGroup = document.createElement('div')
    btnGroup.classList.add('card__btn-group')

    const btnDel = document.createElement('button')
    btnDel.textContent = 'Delete'
    btnDel.onclick = () => {
        handleDelete()
    }

    const btnImp = document.createElement('button')
    // Задаем начальный текст кнопки в зависимости от состояния
    btnImp.textContent = product.done ? 'UnImportant' : 'Important'
    // Если продукт изначально важный, добавляем класс подсветки
    if (product.done) {
        card.classList.add('important')
    }

    btnImp.onclick = () => {
        // Переключаем класс подсветки
        card.classList.toggle('important')
        
        // Проверяем наличие класса через classList.contains (а не просто contains)
        const isImportant = card.classList.contains('important')
        
        // Записываем состояние в данные продукта (product.done, а не card.done)
        product.done = isImportant
        
        // Обновляем текст кнопки
        btnImp.textContent = isImportant ? 'UnImportant' : 'Important'
    }

    btnGroup.append(btnDel, btnImp)
    cardBody.append(cardTitle, cardDesc)
    card.append(cardImage, cardBody, btnGroup)
    return card
}

const btn = getBtn('Add a new Notify')
btn.onclick = () => {
    const titleVal = prompt('введите заметку') || ''
    const imageVal = prompt('введите путь к img') || ''
    const descVal = prompt('введите описание') || ''

    products.push({
        title: titleVal,
        img: imageVal,
        desc: descVal,
        done: false
    })
    render(products)
}

const render = (products: IProduct[] ) => {
    list.innerHTML = ''

    const handleDelete = (product: IProduct) => {
        const index = products.indexOf(product)
        if (index != -1) {
            products.splice(index, 1)
            render(products)
        }
    }

    products.forEach(product => {
        const newCard = getLi(product, () => handleDelete(product))
        list.append(newCard)
    })
}

const list = getUl()
document.body.append(btn, list)

// Первоначальный рендер списка при загрузке страницы
render(products)