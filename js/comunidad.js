
import { getUser, message } from './global.js'


// const baseUrl = "https://test.backchakruk.quinto.site/"
const baseUrl = "http://149.50.131.196:8080/chakruk-0.0.1-SNAPSHOT/"
// const baseUrl = "http://localhost:8080/"

// --> Setea a la posicion inicial el paginado de comentarios al caragr la pagina
sessionStorage.setItem('chacrukCommentsByTimePage', 1)
sessionStorage.setItem('chacrukCommentsByPopularPage', 1)
// <-------------------------------------------

const sectionDiv = document.querySelector('.sections')

// --> Crea la variable de ID de comentario en la session
if (sessionStorage.getItem('chacrukCommentId') === null) {
    sessionStorage.setItem('chacrukCommentId', -1)
}
// <-------------------------------------------

let commentOpened = false

// --> Muestra comentario indivudual seleccionado
if (parseInt(sessionStorage.getItem('chacrukCommentId')) != -1 && window.location.href.includes('comunidad')) {
    while (sectionDiv.firstChild) {
        sectionDiv.removeChild(sectionDiv.lastChild)
    }

    getOneComment(parseInt(sessionStorage.getItem('chacrukCommentId')))

    commentOpened = true
}
// <-------------------------------------------

const nav = document.getElementsByClassName('comments__navItem')
const section = document.getElementsByClassName('comments__sec')

if (nav.length !== 0) {
    nav[0].style.backgroundColor = 'rgba(32, 32, 32, 0.93)'
    section[0].style.display = 'flex'
}

const more = document.getElementById('moreComment')

// --> Seleccion de seccion
for (let i = 0; i < nav.length; i++) {
    nav[i].onclick = () => {
        show(nav[i].id)

        if (i === 0) {
            more.style.display = 'block'
        } else {
            more.style.display = 'none'
        }
    }
}

function show(id) {
    let secId = 'comments__' + id

    for (let i = 0; i < section.length; i++) {
        console.log(secId);
        if (section[i].id === secId) {
            section[i].style.display = 'flex'
            nav[i].style.backgroundColor = 'rgba(32, 32, 32, 0.93)'
        } else {
            section[i].style.display = 'none'
            nav[i].style.backgroundColor = 'black'
        }
    }
}
// <-------------------------------------------

const addComment = document.querySelector('.addComment')

const newThread = document.getElementById('newThread')

// --> Modal para crear comentario
if (newThread !== null) {
    newThread.onclick = () => {
        addComment.style.display = 'flex'

        const onlyReply = document.getElementsByClassName('onlyReply')

        document.querySelector('.btnName').innerHTML = 'CREAR COMENTARIO'

        for (let i = 0; i < onlyReply.length; i++) {
            onlyReply[i].style.display = 'block'
        }

        const counter = document.querySelector('.addCommentCount')
        document.getElementById('commentArea').oninput = () => {
            counter.innerHTML = (255 - document.getElementById('commentArea').value.length) + '/255'
            if ((255 - document.getElementById('commentArea').value.length) < 0) {
                counter.style.color = 'red'
            } else {
                counter.style.color = 'white'
            }
        }
    }
}

const closeNewThread = document.querySelector('.addComment__close')
closeNewThread.onclick = () => {
    addComment.style.display = 'none'
}

const createComment = document.querySelector('#createComment')
createComment.onclick = () => {
    postComment()
}
// <-------------------------------------------

const recent = document.getElementById('comments__recent')
const popular = document.getElementById('comments__popular')


more.onclick = () => {
    getCommentsByTime()
}

// --> Muestra los comentarios en patalla
function showComments(comments, container) {
    for (let i = 0; i < comments.length; i++) {
        const comment = document.createElement('div')
        comment.className = 'comments__comment'

        container.appendChild(comment)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'comments__imgDiv'
        comment.appendChild(imgDiv)

        const img = document.createElement('img')
        img.src = './../img/' + comments[i].photo
        imgDiv.appendChild(img)

        const descDiv = document.createElement('div')
        descDiv.className = 'comments__descDiv'
        descDiv.onclick = () => {
            sessionStorage.setItem('chacrukCommentId', comments[i].id)
            getOneComment(comments[i].id)
        }
        comment.appendChild(descDiv)

        const title = document.createElement('h2')
        title.className = 'comments__title'
        title.innerHTML = comments[i].title

        const body = document.createElement('p')
        body.className = 'comments__body'
        body.innerHTML = comments[i].body

        const userData = document.createElement('p')
        userData.className = 'comments__userData'
        const text1 = document.createElement('i')
        text1.innerHTML = 'Por '
        const user = document.createElement('span')
        user.innerHTML = ' ' + comments[i].userName
        const text2 = document.createElement('i')
        text2.innerHTML = ', el ' + getDate(comments[i].created)

        userData.appendChild(text1)
        userData.appendChild(user)
        userData.appendChild(text2)

        descDiv.appendChild(title)
        descDiv.appendChild(body)
        descDiv.appendChild(userData)

        const actionDiv = document.createElement('div')
        actionDiv.className = 'comments__actionDiv'
        comment.appendChild(actionDiv)

        const actions = document.createElement('div')
        actions.className = 'comments__actions'

        const like = document.createElement('div')
        like.className = 'like'
        like.id = 'like-' + comments[i].id

        const likeImg = document.createElement('img')
        likeImg.className = 'likeImg-' + comments[i].id

        const likeNo = document.createElement('p')
        likeNo.className = 'likeNo-' + comments[i].id
        likeNo.innerHTML = comments[i].usersLike.length

        if (comments[i].usersLike.includes(sessionStorage.getItem('chakrukUser'))) {
            likeImg.src = './../img/likeIconOn.png'
            likeNo.style.color = '#D251FF'
        } else {
            likeImg.src = './../img/likeIcon.png'
            likeNo.style.color = 'white'
        }

        like.appendChild(likeImg)
        like.appendChild(likeNo)

        const reply = document.createElement('div')
        reply.className = 'reply'
        reply.id = 'reply-' + comments[i].id
        const replyImg = document.createElement('img')
        replyImg.src = './../img/replyIcon.png'
        reply.appendChild(replyImg)
        const replyNo = document.createElement('p')
        replyNo.className = 'replyNo'
        replyNo.innerHTML = replyNoValue()

        function replyNoValue() {
            if (comments[i].reply === undefined) {
                return 0
            } else {
                return comments[i].reply.length
            }
        }

        reply.appendChild(replyNo)

        actions.appendChild(like)
        actions.appendChild(reply)

        actionDiv.appendChild(actions)

        // const delComment = document.createElement('button')
        // delComment.className = 'admin'
        // delComment.innerHTML = 'ELIMINAR'
        // delComment.onclick = () => {
        //     deleteComment(comments[i].id)
        // }

        // actionDiv.appendChild(delComment)
    }

    getUser()
}
// <-------------------------------------------

// --> Formatea la fecha y hora de comentario
function getDate(time) {
    '2022-12-21T01:14:26.898604'
    const date = time.split('T')[0].split('-')
    const clock = time.split('T')[1].split('.')[0].split(':')

    return date[2] + '/' + date[1] + '/' + date[0] + ' ' + (clock[0][0] == 0 ? clock[0][1] : clock[0]) + ':' + clock[1]
}
// <-------------------------------------------

// --> Obtencion de comentarios por tiempo de creacion
async function getCommentsByTime() {
    let url

    if (JSON.parse(sessionStorage.getItem('chacrukCommentsByTimePage')) !== 1) {
        url = baseUrl + 'comments?page=' + JSON.parse(sessionStorage.getItem('chacrukCommentsByTimePage'))
    } else {
        url = baseUrl + 'comments'
    }
    await fetch(url, {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        if (parseInt(sessionStorage.getItem('chacrukCommentId')) !== -1 && commentOpened === false) {
                            openComment(parseInt(sessionStorage.getItem('chacrukCommentId')))
                        } else {
                            showComments(data.list, recent)
                            sessionStorage.setItem('chacrukCommentsByTimePage', JSON.parse(sessionStorage.getItem('chacrukCommentsByTimePage')) + 1)
                        }
                    })
            }
        });
}
// <-------------------------------------------

// --> Obtencion de comentarios por popularidad
async function getCommentsByPopular() {
    let url

    if (JSON.parse(sessionStorage.getItem('chacrukCommentsByPopularPage')) !== 1) {
        url = baseUrl + 'comments/popular' + JSON.parse(sessionStorage.getItem('chacrukCommentsByPopularPage'))
    } else {
        url = baseUrl + 'comments/popular'
    }

    await fetch(url, {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        if (parseInt(sessionStorage.getItem('chacrukCommentId')) !== -1 && commentOpened === false) {
                            openComment(parseInt(sessionStorage.getItem('chacrukCommentId')))
                        } else {
                            showComments(data, popular)
                            sessionStorage.setItem('chacrukCommentsByPopularPage', JSON.parse(sessionStorage.getItem('chacrukCommentsByPopularPage')) + 1)
                        }
                    })
            }
        });
}
// <-------------------------------------------

// --> Obtiene el comentario solicitado
async function getOneComment(id) {
    await fetch(baseUrl + 'comments/' + id, {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        console.log(data);
                        sessionStorage.setItem('chacrukCommentId', id)
                        while (sectionDiv.firstChild) {
                            sectionDiv.removeChild(sectionDiv.lastChild)
                        }
                        openComment(data)
                    })
            }
        });
}
// <-------------------------------------------

// --> Carga nuevo comentario al servidor
async function postComment() {
    const c = {
        title: document.querySelector('#title').value,
        body: document.querySelector('#commentArea').value
    }

    await fetch(baseUrl + 'comments', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        },
        body: JSON.stringify(c)
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                document.querySelector('.addComment').style.display = 'none'
                message('valid.comment', '')
            } else {
                document.querySelector('.addComment').style.display = 'none'
                message('error.comment', '')
            }
            response.json()
                .then((data) => {
                    console.log(data);
                })
        });
}
// <-------------------------------------------

// --> Muestra el comentario dado con sus respuestas
function openComment(commentData) {

    window.scroll({
        top: 0,
        behavior: 'smooth'
    });

    const back = document.createElement('h2')
    back.innerHTML = '← Volver'
    back.className = 'backBtn'

    back.onclick = () => {
        sessionStorage.setItem('chacrukCommentId', -1)
        window.location.href = '/pages/comunidad.html'
    }

    const commentdiv = document.createElement('div')
    commentdiv.className = 'comment'

    sectionDiv.appendChild(back)
    sectionDiv.appendChild(commentdiv)

    const comment = document.createElement('div')
    comment.className = 'comment__comment'
    commentdiv.appendChild(comment)

    const imgDiv = document.createElement('div')
    imgDiv.className = 'comment__imgDiv'
    comment.appendChild(imgDiv)

    const img = document.createElement('img')
    img.src = './../img/' + commentData.photo
    imgDiv.appendChild(img)

    const descDiv = document.createElement('div')
    descDiv.className = 'comment__descDiv'
    comment.appendChild(descDiv)

    const title = document.createElement('h2')
    title.className = 'comment__title'
    title.innerHTML = commentData.title

    const userData = document.createElement('p')
    userData.className = 'comment__userData'
    const text1 = document.createElement('i')
    text1.innerHTML = 'Por '
    const user = document.createElement('span')
    user.innerHTML = ' ' + commentData.userName
    const text2 = document.createElement('i')
    text2.innerHTML = ', el ' + getDate(commentData.created)

    userData.appendChild(text1)
    userData.appendChild(user)
    userData.appendChild(text2)

    descDiv.appendChild(title)
    descDiv.appendChild(userData)

    const bodyArray = commentData.body.split('\n')
    for (let i = 0; i < bodyArray.length; i++) {
        const body = document.createElement('p')
        body.className = 'comment__body'
        body.innerHTML = bodyArray[i]
        descDiv.appendChild(body)
    }

    const actionDiv = document.createElement('div')
    actionDiv.className = 'comment__actionDiv'
    comment.appendChild(actionDiv)

    const actions = document.createElement('div')
    actions.className = 'comment__actions'

    const like = document.createElement('div')
    like.className = 'likeIcon'
    like.id = 'like-comment' + commentData.id

    const likeImg = document.createElement('img')
    likeImg.className = 'likeImg-comment' + commentData.id

    const likeNo = document.createElement('p')
    likeNo.className = 'likeNo-comment' + commentData.id
    likeNo.innerHTML = commentData.usersLike.length

    if (commentData.usersLike.includes(sessionStorage.getItem('chakrukUser'))) {
        likeImg.src = './../img/likeIconOn.png'
        likeNo.style.color = '#D251FF'
    } else {
        likeImg.src = './../img/likeIcon.png'
        likeNo.style.color = 'white'
    }

    const likeList = document.createElement('ul')
    likeList.className = 'likeList'

    like.onclick = () => {
        console.log(likeImg.src);
        if (!likeImg.src.includes('likeIconOn')) {
            likeImg.src = './../img/likeIconOn.png'
            likeNo.innerHTML = parseInt(likeNo.innerHTML) + 1
            likeNo.style.color = '#D251FF'

            const newLike = document.createElement('li')
            newLike.className = 'liUser'
            newLike.innerHTML = sessionStorage.getItem('chakrukUser')

            likeList.appendChild(newLike)
        } else {
            likeImg.src = './../img/likeIcon.png'
            likeNo.innerHTML = parseInt(likeNo.innerHTML) - 1
            likeNo.style.color = 'white'

            const li = document.getElementsByClassName('liUser')
            console.log(li);
            for (let k = 0; k < li.length; k++) {
                console.log(li[k].innerHTML);
                if (li[k].innerHTML === sessionStorage.getItem('chakrukUser')) {
                    console.log(sessionStorage.getItem('chakrukUser'));
                    li[k].remove()
                }
            }
        }
        console.log(commentData.id, 'com');
        makeLike('comment', commentData.id)
    }

    like.appendChild(likeImg)
    like.appendChild(likeNo)
    like.appendChild(likeList)

    for (let i = 0; i < commentData.usersLike.length; i++) {
        const likeUser = document.createElement('li')
        likeUser.innerHTML = commentData.usersLike[i]

        likeList.appendChild(likeUser)
    }

    like.onmouseover = () => {
        if (likeImg.src.includes('likeIconOn')) {
            likeList.style.display = 'block'
        }
    }

    like.onmouseleave = () => {
        likeList.style.display = 'none'
    }

    const reply = document.createElement('div')
    reply.className = 'replyIcon'
    reply.id = 'reply-' + commentData.id
    const replyImg = document.createElement('img')
    replyImg.src = './../img/replyIcon.png'
    reply.appendChild(replyImg)
    const replyNo = document.createElement('p')
    replyNo.className = 'replyNo'
    replyNo.innerHTML = replyNoValue()

    function replyNoValue() {
        if (commentData.reply === undefined) {
            return 0
        } else {
            return commentData.reply.length
        }
    }

    reply.appendChild(replyNo)

    actions.appendChild(like)
    actions.appendChild(reply)

    actionDiv.appendChild(actions)

    const delComment = document.createElement('div')
    delComment.className = 'btn admin del del' + commentData.userName
    const buttonDel = document.createElement('button')

    buttonDel.onclick = () => {
        // deleteReply(commentData.id)
        deleteComment(commentData.id)
    }
    delComment.appendChild(buttonDel)
    const spanDel = document.createElement('span')
    spanDel.innerHTML = 'ELIMINAR'
    buttonDel.appendChild(spanDel)

    let clDel = ['top', 'left', 'bottom', 'right']
    for (let j = 0; j < clDel.length; j++) {
        const div = document.createElement('div')
        div.className = clDel[j]
        buttonDel.appendChild(div)
    }

    actionDiv.appendChild(delComment)

    const btn = document.createElement('div')
    btn.className = 'btn'
    btn.style.display = 'none'
    if (sessionStorage.getItem("chacrukToken")) {
        // console.log(sessionStorage.getItem('chacrukToken'));
        btn.style.display = 'block'
    }

    const button = document.createElement('button')
    button.onclick = () => {
        const onlyReply = document.getElementsByClassName('onlyReply')

        for (let i = 0; i < onlyReply.length; i++) {
            onlyReply[i].style.display = 'block'
        }

        document.querySelector('.btnName').innerHTML = 'CARGAR RESPUESTA'
        openReply(commentData.userName, commentData.id)
    }
    btn.appendChild(button)
    const span = document.createElement('span')
    span.innerHTML = 'RESPONDER'
    button.appendChild(span)

    let cl = ['top', 'left', 'bottom', 'right']
    for (let j = 0; j < cl.length; j++) {
        const div = document.createElement('div')
        div.className = cl[j]
        button.appendChild(div)
    }

    actionDiv.appendChild(btn)

    const replyDiv = document.createElement('div')
    replyDiv.className = 'comment__replyDiv'
    commentdiv.appendChild(replyDiv)

    if (commentData.reply !== undefined) {
        for (let i = 0; i < commentData.reply.length; i++) {
            const commentdiv = document.createElement('div')
            commentdiv.className = 'reply ' + commentData.reply[i].userName
            replyDiv.appendChild(commentdiv)

            const comment = document.createElement('div')
            comment.className = 'reply__comment'
            commentdiv.appendChild(comment)

            const imgDiv = document.createElement('div')
            imgDiv.className = 'reply__imgDiv'
            comment.appendChild(imgDiv)

            const img = document.createElement('img')
            img.src = './../img/' + commentData.reply[i].photo
            imgDiv.appendChild(img)

            const descDiv = document.createElement('div')
            descDiv.className = 'reply__descDiv'
            comment.appendChild(descDiv)

            const title = document.createElement('h2')
            title.className = 'reply__title'
            title.innerHTML = 'Re: ' + commentData.reply[i].userReceiver

            const userData = document.createElement('p')
            userData.className = 'reply__userData'
            const text1 = document.createElement('i')
            text1.innerHTML = 'Por '
            const user = document.createElement('span')
            user.innerHTML = ' ' + commentData.reply[i].userName
            const text2 = document.createElement('i')
            text2.innerHTML = ', el ' + getDate(commentData.reply[i].created)

            userData.appendChild(text1)
            userData.appendChild(user)
            userData.appendChild(text2)

            descDiv.appendChild(title)
            descDiv.appendChild(userData)
            const bodyArray = commentData.reply[i].body.split('\n')
            for (let i = 0; i < bodyArray.length; i++) {
                const body = document.createElement('p')
                body.className = 'comment__body'
                body.innerHTML = bodyArray[i]
                descDiv.appendChild(body)
            }

            const actionDiv = document.createElement('div')
            actionDiv.className = 'reply__actionDiv'
            comment.appendChild(actionDiv)

            const actions = document.createElement('div')
            actions.className = 'reply__actions'

            const like = document.createElement('div')
            like.className = 'likeIcon'
            like.id = 'like-reply' + commentData.reply[i].id

            const likeImg = document.createElement('img')
            likeImg.className = 'likeImg-reply' + commentData.reply[i].id

            const likeNo = document.createElement('p')
            likeNo.className = 'likeNo-reply' + commentData.reply[i].id
            likeNo.innerHTML = commentData.reply[i].usersLike.length

            if (commentData.reply[i].usersLike.includes(sessionStorage.getItem('chakrukUser'))) {
                likeImg.src = './../img/likeIconOn.png'
                likeNo.style.color = '#D251FF'
            } else {
                likeImg.src = './../img/likeIcon.png'
                likeNo.style.color = 'white'
            }

            const likeList = document.createElement('ul')
            likeList.className = 'likeList'

            for (let j = 0; j < commentData.reply[i].usersLike.length; j++) {
                const likeUser = document.createElement('li')
                likeUser.className = 'liUser'
                likeUser.innerHTML = commentData.reply[i].usersLike[j]

                likeList.appendChild(likeUser)
            }

            like.appendChild(likeImg)
            like.appendChild(likeNo)
            like.appendChild(likeList)

            like.onclick = () => {
                console.log(likeImg.src);
                if (!likeImg.src.includes('likeIconOn')) {
                    likeImg.src = './../img/likeIconOn.png'
                    likeNo.innerHTML = parseInt(likeNo.innerHTML) + 1
                    likeNo.style.color = '#D251FF'

                    const newLike = document.createElement('li')
                    newLike.className = 'liUser'
                    newLike.innerHTML = sessionStorage.getItem('chakrukUser')

                    likeList.appendChild(newLike)
                } else {
                    likeImg.src = './../img/likeIcon.png'
                    likeNo.innerHTML = parseInt(likeNo.innerHTML) - 1
                    likeNo.style.color = 'white'

                    const li = document.getElementsByClassName('liUser')
                    console.log(li);
                    for (let k = 0; k < li.length; k++) {
                        console.log(li[k].innerHTML);
                        if (li[k].innerHTML === sessionStorage.getItem('chakrukUser')) {
                            console.log(sessionStorage.getItem('chakrukUser'));
                            li[k].remove()
                        }
                    }
                }

                makeLike('reply', commentData.reply[i].id)
            }

            like.onmouseover = () => {
                if (likeImg.src.includes('likeIconOn')) {
                    likeList.style.display = 'block'
                }
            }

            like.onmouseleave = () => {
                likeList.style.display = 'none'
            }

            const reply = document.createElement('div')
            reply.className = 'replyIcon'
            reply.id = 'reply-' + commentData.reply[i].id

            actions.appendChild(like)
            actions.appendChild(reply)

            actionDiv.appendChild(actions)

            const delComment = document.createElement('div')
            delComment.className = 'btn admin del del' + commentData.reply[i].userName
            const buttonDel = document.createElement('button')
            buttonDel.onclick = () => {
                deleteReply(commentData.reply[i].id)
            }
            delComment.appendChild(buttonDel)
            const spanDel = document.createElement('span')
            spanDel.innerHTML = 'ELIMINAR'
            buttonDel.appendChild(spanDel)

            let clDel = ['top', 'left', 'bottom', 'right']
            for (let j = 0; j < clDel.length; j++) {
                const div = document.createElement('div')
                div.className = clDel[j]
                buttonDel.appendChild(div)
            }

            actionDiv.appendChild(delComment)

            const btn = document.createElement('div')
            btn.className = 'btn'
            btn.style.display = 'none'
            if (sessionStorage.getItem("chacrukToken")) {
                btn.style.display = 'block'
            }
            const button = document.createElement('button')
            button.onclick = () => {
                openReply(commentData.reply[i].userName, commentData.id)
            }
            btn.appendChild(button)
            const span = document.createElement('span')
            span.innerHTML = 'RESPONDER'
            button.appendChild(span)

            let cl = ['top', 'left', 'bottom', 'right']
            for (let j = 0; j < cl.length; j++) {
                const div = document.createElement('div')
                div.className = cl[j]
                button.appendChild(div)
            }

            actionDiv.appendChild(btn)

        }
    }

    getUser()
}
// <-------------------------------------------

// --> Carga respuesta de comentario al servidor
async function uploadReply(userReceiver, body, id) {

    console.log(body);

    const r = {
        userReceiver: userReceiver,
        body: body
    }

    await fetch(baseUrl + 'reply/' + id, {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        },
        body: JSON.stringify(r)
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                document.querySelector('.addComment').style.display = 'none'
                message('valid.comment', '')
            }
            response.json()
                .then((data) => {
                    console.log(data);
                })
        });
}
// <-------------------------------------------

// --> Modal de Respuestas
function openReply(userReceiver, id) {
    window.scroll({
        top: 800,
        behavior: 'auto'
    });

    const onlyReply = document.getElementsByClassName('onlyReply')

    for (let i = 0; i < onlyReply.length; i++) {
        onlyReply[i].style.display = 'none'
    }

    const counter = document.querySelector('.addCommentCount')

    document.getElementById('commentArea').oninput = () => {
        counter.innerHTML = (255 - document.getElementById('commentArea').value.length) + '/255'
        if ((255 - document.getElementById('commentArea').value.length) < 0) {
            counter.style.color = 'red'
        } else {
            counter.style.color = 'white'
        }
    }

    document.querySelector('.btnName').innerHTML = 'CARGAR RESPUESTA'
    document.querySelector('#createComment').onclick = () => {
        uploadReply(userReceiver, document.getElementById('commentArea').value, id)
    }
    addComment.style.display = 'flex'
}
// <-------------------------------------------

// --> Elimina comentario determinado
async function deleteComment(id) {
    await fetch(baseUrl + 'comments/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                message('valid.delete', '')
            } else {
                message('error.delete', '')
            }
        });
}
// <-------------------------------------------

// --> Elimina respuesta determinada
async function deleteReply(id) {
    await fetch(baseUrl + 'reply/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                message('valid.delete', '')
            } else {
                message('error.delete', '')
            }
        });
}
// <-------------------------------------------

// --> Funcion para like y dislike
function makeLike(element, id) {
    let url

    if (element === 'comment') {
        url = baseUrl + 'comments/' + id
    } else if (element === 'reply') {
        url = baseUrl + 'reply/like/' + id
    }

    console.log(url);

    fetch(url, {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log(element, 'correct like');
            } else {
                console.log(element, 'error');
            }
        });
}
// <-------------------------------------------

getCommentsByTime()
getCommentsByPopular()