
function myConfirm(question) {
    // return Promise.resolve(confirm(question))
    let _resolve;
    let _reject;
    const $modal = $(".confirm-modal")
    $modal.modal('show');
    $modal.find(".modal-ok").on('click', function(e) {
        _resolve(true)
    })

    $modal.find(".modal-cancel").on('click', function(e) {
        _resolve(false)
    })

    return new Promise(function(resolve, reject) {
        _resolve = resolve;
        _reject = reject;
    })
}

$('#btnDelete').on('click', function (e) {
    e.preventDefault();
    myConfirm("Biztos törölni szeretnéd").then(response => {
        if (response) {
            const url = '/ajax' + $(this).attr('href');
            console.log(url);
            ajaxDelete(url)
                .then(data => {
                    location.assign('/');
                })
                .catch(xhr => {
                    $('.help-block').text(xhr.responseText)
                })
        }
    })

    /*    if (confirm("Biztos törölni szeretné?")) {
            const url = '/ajax' + $(this).attr('href');
            console.log(url);
            ajaxDelete(url)
                .then(data => {
                    location.assign('/');
                })
                .catch(xhr => {
                    $('.help-block').text(xhr.responseText)
                })
        }*/
})

function ajaxDelete(url) {
    const headers = {
        'csrf-token': $('[name="_csrf"]').val()
    }
    return Promise.resolve(
        $.ajax({
            url: url,
            method: 'DELETE',
            dataType: 'json',
            headers
        })
    )
}