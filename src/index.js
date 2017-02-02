/**
 * Created by 1nept on 2017-01-31.
 */

let init = function() {
    console.log('init');

    interact('.draggable')
        .draggable({
            snap: {
                targets: [
                    { x: 20, y: 450, range: 50 }
                ],
                endOnly: true
            },
            autoScroll: true,
            // call this function on every dragmove event
            onmove: dragMoveListener

        });
    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    window.dragMoveListener = dragMoveListener;


    let state;
    let auth_containers;
    let auth_components;
    let post_containers;
    let post_components;

    state = {
        current : 'default',
        username : null,
        post_id : null
    };
    /*
     current : 'default','modify','login','signup'
     */

    auth_containers = {
        auth_login_and_signup : document.getElementById('auth_login_and_signup'),
        auth_ok_and_no : document.getElementById('auth_ok_and_no'),
        auth_id_and_password : document.getElementById('auth_id_and_password'),
        auth_logout_and_remove : document.getElementById('auth_logout_and_remove')
    };
    auth_components = {
        auth_user : document.getElementById('auth_user'),
        auth_login : document.getElementById('auth_login'),
        auth_signup : document.getElementById('auth_signup'),
        auth_ok : document.getElementById('auth_ok'),
        auth_no : document.getElementById('auth_no'),
        auth_id : document.getElementById('auth_id'),
        auth_password : document.getElementById('auth_password'),
        auth_logout : document.getElementById('auth_logout'),
        auth_delete : document.getElementById('auth_delete'),
        auth_message : document.getElementById('auth_message')
    };
    post_containers = {
        post_list : document.getElementById('post_list'),
        post_write : document.getElementById('post_write'),
        post_modify_and_delete : document.getElementById('post_modify_and_delete')
    };
    post_components = {
        post_username : document.getElementById('post_username'),
        post_title : document.getElementById('post_title'),
        post_content : document.getElementById('post_content'),
        post_modify : document.getElementById('post_modify'),
        post_delete : document.getElementById('post_delete'),
        post_write_save : document.getElementById('post_write_save'),
        post_write_title : document.getElementById('post_write_title'),
        post_write_content : document.getElementById('post_write_content')
    };

    //function
    let authentificate;
    let loadPostList;
    let showTheData;
    let makePost;

    authentificate = () => {
        $.get('/auth',(username) => {
            if(!username) {
                auth_containers.auth_login_and_signup.style.display = 'block';
                post_containers.post_write.style.display='none';
                loadPostList();
                return null
            } else {
                state.username = username;
                auth_components.auth_user.innerHTML = state.username;
                post_containers.post_write.style.display = 'block';
                loadPostList();
            }
        });
    };

    loadPostList = () => {
        post_components.post_write_title.innerHTML = '';
        post_components.post_write_content.innerHTML = '';
        while(post_containers.post_list.hasChildNodes()) {
            post_containers.post_list.removeChild(post_containers.post_list.lastChild);
        }
        $.get('getList', (posts) => {
            for (let post of posts) {
                makePost(post);
            }
        });
    };

    showTheData = (post) => {
        post_components.post_write_title.value='';
        post_components.post_write_content.value='';

        post_components.post_username.innerHTML = post.username;
        post_components.post_title.innerHTML = post.title;
        post_components.post_content.innerHTML = post.content;

        state.post_id = post._id;

        if(post.username === state.username) {
            post_components.post_modify.style.display='block';
            post_components.post_delete.style.display='block';
        } else{
            post_components.post_modify.style.display='none';
            post_components.post_delete.style.display='none';
        }

    };

    makePost = (post) => {
        let new_li = document.createElement('li');
        new_li.innerHTML = post.title + '  -  '+post.username;
        new_li.id = post._id;

        new_li.className = 'draggable';
        if(post.username === state.username) {
            new_li.className += ' li_mine';
        }

        new_li.onclick = () => {
            $.get('get/' + new_li.id, (post) => {
                showTheData(post);
            })};

        post_containers.post_list.appendChild(new_li);
    };

    post_components.post_write_content.addEventListener('keyup', (e) => {if(e.keyCode==13){post_components.post_write_save.onclick();}});
    auth_components.auth_password.addEventListener('keypress', (e) => {if(e.keyCode==13){e.preventDefault(); auth_components.auth_ok.onclick();}});


    authentificate();

    auth_components.auth_login.onclick = () => {
        state.current = 'login';
        auth_containers.auth_id_and_password.style.display = 'block';
        auth_containers.auth_ok_and_no.style.display = 'block';
        auth_containers.auth_login_and_signup.style.display = 'none';
    };
    auth_components.auth_signup.onclick = () => {
        state.current = 'signup';
        auth_containers.auth_id_and_password.style.display = 'block';
        auth_containers.auth_ok_and_no.style.display = 'block';
        auth_containers.auth_login_and_signup.style.display = 'none';
    };
    auth_components.auth_ok.onclick = () => {
        let username_and_password = {
            username : auth_components.auth_id.value,
            password : auth_components.auth_password.value
        };
        if (state.current === 'login') {
            $.post('login',username_and_password,(err) => {
                if(err !== 'success') {
                    auth_components.auth_message.innerHTML= err;
                    auth_components.auth_message.style.visibility='visible';
                    setTimeout(function() {
                        auth_components.auth_message.style.visibility='hidden';
                    },1000);
                } else {
                    window.location.reload(true);
                }
            })
        } else if (state.current === 'signup') {
            $.post('signup',username_and_password,(err) => {
                if(err !=='success') {
                    auth_components.auth_message.innerHTML= err;
                    auth_components.auth_message.style.visibility='visible';
                    setTimeout(function() {
                        auth_components.auth_message.style.visibility='hidden';
                    },1000);
                } else {
                    state.current = 'default';
                    auth_components.auth_message.innerHTML = '회원가입 완료';
                    auth_containers.auth_id_and_password.style.display='none';
                    auth_containers.auth_ok_and_no.style.display='none';
                    auth_components.auth_message.style.visibility='visible';
                    setTimeout(function() {
                        auth_components.auth_message.style.visibility='hidden';
                        auth_containers.auth_login_and_signup.style.display='block';
                    },1000);
                }
            })
        }
    };
    auth_components.auth_no.onclick = () => {
        state.current = 'default';
        auth_containers.auth_id_and_password.style.display='none';
        auth_containers.auth_logout_and_remove.style.display='none';
        auth_containers.auth_ok_and_no.style.display='none';
        auth_containers.auth_login_and_signup.style.display='block';
    };
    auth_components.auth_logout.onclick = () => {
        $.get('logout',() => {
            window.location.reload(true);
        })
    };
    auth_components.auth_delete.onclick = () => {
        $.post('account/delete',{'username':state.username},() => {
            window.location.reload(true);
        })
    };
    post_components.post_delete.onclick = () => {
        $.post('delete',{_id:state.post_id},(post) => {
            post_containers.post_list.removeChild(document.getElementById(post._id));
            post_components.post_delete.style.display = 'none';
            post_components.post_modify.style.display = 'none';
            post_components.post_title.innerHTML = '';
            post_components.post_username.innerHTML = '';
            post_components.post_content.innerHTML = '';
        });
    };
    auth_components.auth_user.onclick = () => {
        if(auth_containers.auth_logout_and_remove.style.display === 'block')
            auth_containers.auth_logout_and_remove.style.display = 'none';
        else
            auth_containers.auth_logout_and_remove.style.display = 'block';
    };
    post_components.post_modify.onclick = () => {
        post_components.post_modify.style.display='none';
        state.current = 'modify';
        $.get('get/' + state.post_id, (post) => {
            post_components.post_write_title.value = post.title;
            post_components.post_write_content.value = post.content;
        });
        post_components.post_write_save.innerHTML = '확인';
    };
    post_components.post_write_save.onclick = () => {
        let write_title_value = post_components.post_write_title.value;
        let write_content_value = post_components.post_write_content.value;

        post_components.post_write_title.value = '';
        post_components.post_write_content.value = '';

        let obj = {
            _id:state.post_id,
            title:write_title_value,
            content:write_content_value,
            username:state.username
        };
        if(state.current === 'modify') {
            $.post('modify',obj, (post) => {
                document.getElementById(post._id).innerHTML = post.title + '  -  '+post.username;
                state.current = 'default';
                showTheData(post);
                post_components.post_write_save.innerHTML = '글쓰기';
            });
        } else {
            $.post('save',obj, (post) => {
                makePost(post);
                state.post_id = post._id;
                showTheData(post);
            });
        }
    };


    //

    //

}();