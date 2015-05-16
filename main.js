

// iTEM CONSTRUCTOR CLASS
var Item = function(title, cost) {
	this.title = title;
	this.cost = cost;
};
// iTEM RENDER METHOD
Item.prototype.render = function () {
	var self = this;
	if(this.el === undefined){
		this.el = $('#item-tpl')
		.clone()
		.attr('id', null);
	}
	this.el.find('.item-title').text(this.title);
	this.el.find('.item-cost').text(this.cost);
	
	//  here is where you added things with rob
	this.el.find('.remove-btn').attr('data-name', self.title);
	console.log(this);
	this.el.find('.remove-btn').on('click',function (){
	var itemNameRemove = $(this).data('name');
	self.category.removeItem(itemNameRemove);

		// self.remove.bind(self)()
	});
	return this.el;
};

// REMOVE METHOD FOR ITEMS 
Item.prototype.remove = function () {
	this.el.remove();
};

// cATEGORY CONSTRUCTOR CLASS
var Category = function (title) {
	this.title = title;
	this.items = [];
};

// ADD ITEM METHOD
Category.prototype.addItem = function (item) {
	this.items.push(item);
	item.category = this;
	this.render();
};
Category.prototype.removeItem = function (name) {
	this.items = this.items.filter(function(item, i) {
		return item.title !== name;
			
	});
	this.render();
};

// Category render method
Category.prototype.render = function () {
	if(this.el === undefined) {
		this.el = $('#category-with-items-tpl')
		.clone()
		.attr('id', null);
	
	var originalCategory = this;
	
	this.el.find('.new-item-form').on('submit', function (e) {
		e.preventDefault();
		var newTitle = originalCategory.el.find('.new-item-title').val();
		var newCost =originalCategory.el.find('.new-item-cost').val(); 
		var newItem = new Item(newTitle, newCost);
		originalCategory.addItem(newItem);
		// THIS RESETS THE VALUES IN THE TEXT BOXES TO place holder text
		$('.new-item-title').val('');
		$('.new-item-cost').val('');

	});
		
}

this.el.find('.category-title').text(this.title);
this.el.find('.item-container').empty();
for(var i = 0; i < this.items.length; i++) {
	this.el.find('.item-container').append(this.items[i].render());
}
return this.el;
};






$(document).on('ready', function() {
 
// Ok so learned bunches today
// This is a delegated event on the the document. Before I had the event listener on the element itself. This means that the event was being run multiple times and wierd stuf was happening.  
// 
// Now the event is delegated up to the document and it only happens once
// Here below lies the code syntax for how to do that, Balla!
//
// 
 $(document).on('submit','.new-category', function (e) {
    e.preventDefault();
    // So 'this' relates to this specific form submit and then .find finds the category name value
    // With out $(this).find, if there were multiple categories, then the value of '.category-name would be an array. On submit the machine would not know which value to select. 
    // $(this).find selects this submit event and the val() of '.category name'
    var name = $(this).find('.category-name').val();
    var tempCategory = new Category(name);
    $('body').append(tempCategory.render());
    // Resets value to place holder text
    $('.category-name').val('');
});

// Here is the event handler for the add category button
// On Click of the add category button, a new-category form is appended 
$('.add-category-button').on('click', function (e) {
	e.preventDefault();
	$('body').append('<form class="new-category">' +
  						'<h4>Enter a category</h4>' +
  						'<input class="category-name" type="text" placeholder="Category name...">' +
  						'<input type="submit">' +
					 '</form>');
});

// visual hard coded
var turtleCareSupplies = new Category('Turtle Care Supplies');
$('body').append(turtleCareSupplies.render());
var turtleWash = new Item('Turtle Wash', '$12.98');
$('body').append(turtleWash.render());
// on document ready closing tags
});

