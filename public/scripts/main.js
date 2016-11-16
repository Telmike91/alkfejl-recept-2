console.log( $('li') );
console.log( $('[class|=col]'));
console.log( $('.list-group > .list-group-item:nth-child(1)')) // > child selector
console.log( $('.list-group').children('.list-group-item') ) // > child selector

const $li = $('.list-group-item').eq(2);
// const $heading = $li.parent().prev();
const $heading = $li.closest('.panel').find('.panel-heading');
console.log( $heading.contents().filter( function() {
    return this.nodeType === 3;
}).text().trim() )

const $panels = $('.panel');
$panels.each(function () {
    const $panel = $(this);
    const db = $panel.find('.list-group-item').length;
    $panel.find('.panel-heading span').before(`(${db})`);    
})  

$headings = $('.panel-heading')
$headings.on('click', function(e) {
    // console.log(this);
    const $ul = $(this).next();
    $ul.slideToggle();
})

// JQUERY ELÉGGÉ OUTDATED