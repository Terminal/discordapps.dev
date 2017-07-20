/* eslint no-unused-vars: 0 */
/* globals $ bots Mustache */

const modalContent = document.getElementById('modalContent');

const modal = (id) => {
	const botinfo = bots.find(bot => bot.id === id);

	modalContent.innerHTML = Mustache.render(`
		<div class="modal-header">
			<h5 class="modal-title" id="modallabel">{{ #name }}{{ name }} - {{ /name }}{{ id }}</h5>
			<button type="button" class="close" data-dismiss="modal">
				<span>&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="media">
				<img class="d-flex mr-3 icon" src="{{ img }}" alt="Generic placeholder image">
				<div class="media-body">
					<h5 class="mt-0">{{ #name }}{{ name }} - {{ /name }}{{ id }}</h5>
					{{ shortDesc }}
				</div>
			</div>
			{{{ html }}}
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		</div>
	`, botinfo);

	$('#modal').modal('show');
};
