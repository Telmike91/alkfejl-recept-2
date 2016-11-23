function collectIngredients() {
    const ingredients = [];
    $('.smart-ingredient').each(function () {
        $this = $(this)
        const amount = $this.find('.smart-ingredient-amount').val()
        const name = $this.find('.smart-ingredient-name').val()
        ingredients.push({ amount, name });
    })
    return ingredients
        //.map(({ingredient}) => `${ingredient.amount} ${ingredient.name}`)
        .map(({ amount, name }) => `${amount} ${name}`)
        .join('\n');

}

function parseIngredients(text) {
    return text.split('\n').map(line => {
        const index = line.indexOf(' ');
        const amount = line.substr(0, index);
        const name = line.substr(index + 1);
        return { amount, name };
    });    
}

function insertIngredientRow(ingr, $textarea) {
    const $row = $(`
    <div class="form-group smart-ingredient">
        <div class="col-md-3">
            <input required class="form-control pattern="^\\S*$" placeholder="1kg" smart-ingredient-amount" value="${ingr.amount}" type="text">
        </div>
        <div class="col-md-7">
            <input required class="form-control smart-ingredient-name" value="${ingr.name}" type="text">
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-danger btn-block">
                <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    `)

    //const $removeButton = $row.find('button');
    //$('form').validator('update')
    //$removeButton.on('click', function (e) {
    //    $(this).closest('.smart-ingredient').remove();
    //})
   // $row.insertBefore($textarea)
}

const $textarea = $('#ingredients');
$textarea.hide()

$textarea.closest('.form-group').on('click', 'button', function (e) {
    $('form').validator('update')
    $(this).closest('.smart-ingredient').remove();
})
const ingredients = parseIngredients( $textarea.val() );

ingredients.forEach(ingredient => insertIngredientRow(ingredient, $textarea));

$addButton = $(`
<button type="button" class="btn btn-success btn-block">
  <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
</button>
`)
 .insertAfter($textarea)
 .on('click', function (e) {
    insertIngredientRow({amount: '', name: ''}, $textarea);
    $('form').validator('update')
});

$('form').on('submit', function (e) {    
    $textarea.val ( collectIngredients());
})