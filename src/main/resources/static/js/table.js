$(document).ready(getAllUsers());

//список
function getAllUsers() {
    $("#table").empty();
    $.ajax({
        type: 'POST',
        url: '/rest/admin/users',
        timeout: 3000,
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                $("#table").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.lastName),
                    $('<td>').append($('<span>')).text(user.age),
                    $('<td>').append($('<span>')).text(user.email),
                    $('<td>').append($('<span>')).text(user.roles),
                    $('<td>').append($('<button>').text("Edit").attr({
                        "type": "button",
                        "class": "btn btn-primary edit",
                        "data-toggle": "modal",
                        "data-target": "#myModal",

                    })
                        .data("user", user)),
                    $('<td>').append($('<button>').text("Delete").attr({
                        "type": "button",
                        "class": "btn btn-danger delete",
                        "data-toggle": "modal",
                        "data-target": "#myModalDelete",
                    })
                        .data("user", user))
                    )
                );
            });
        }
    });
}

//редактирование
$(document).on("click", ".edit", function () {
    let user = $(this).data('user');

    $('#firstNameInput').val(user.username);
    $('#lastNameInput').val(user.lastName);
    $('#emailInput').val(user.email);
    $('#idInput').val(user.id);
    $('#ageInput').val(user.age);
    $('#roleInput').val(user.roles);

});

$(document).on("click", ".editUser", function () {
    let formData = $(".formEditUser").serializeArray();
    $.ajax({
        type: 'POST',
        url: '/rest/admin/update',
        data: formData,
        timeout: 100,
        success: function () {
            getAllUsers();
        }
    });
});

//удаление
$(document).on("click", ".delete", function () {
    let user = $(this).data('user');

    $('#firstName').val(user.username);
    $('#lastName').val(user.lastName);
    $('#email').val(user.email);
    $('#id').val(user.id);
    $('#age').val(user.age);

    $(document).on("click", ".deleteUser", function () {
        $.ajax({
            type: 'POST',
            url: '/rest/admin/remove',
            data: {id: $('#id').val()},
            timeout: 100,
            success: function () {
                getAllUsers();
            }
        });
    });
})

//добавление
$('.addUser').click(function () {
    $('#usersTable').trigger('click');
    let formData = $(".formAddUser").serializeArray();
    $.ajax({
        type: 'POST',
        url: '/rest/admin/addUser',
        data: formData,
        timeout: 100,
        success: function () {

            $('.formAddUser')[0].reset();
            getAllUsers()
        }
    })
});

//юзер
$(document).ready(getUser());
function getUser() {
    $("#userTable").empty();
    $.ajax({
        type: 'POST',
        url: '/rest/user/getUser',
        timeout: 3000,
        error: function() {
            $('#blockMenuforUser').hide();
        },
        success: function (data) {
            console.log(data);
            $.each(data, function (i, user) {
                if(user.roles == "USER") {
                    $('#menuUser').trigger('click');
                    $('#main2').trigger('click');
                    $('#blockMenuforAdmin').hide();
                }
                $("#userTable").append($('<tr>').append(
                    $('<td>').append($('<span>')).text(user.id),
                    $('<td>').append($('<span>')).text(user.username),
                    $('<td>').append($('<span>')).text(user.lastName),
                    $('<td>').append($('<span>')).text(user.age),
                    $('<td>').append($('<span>')).text(user.email),
                    $('<td>').append($('<span>')).text(user.roles),
                    )
                );
            });
        }
    });
}


