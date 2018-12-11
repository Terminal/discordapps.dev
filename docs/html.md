# HTML

## Modals
This button opens the "invite-modal" modal, as seen in the ID of the element.
```html
<button type="button" id="invite-modal-button" onclick="openModal(this)">Click!</button>
```

A modal looks a bit like this.
Elements with the `ls-exit-modal` class act as an exit button.
```html
<div id="invite-modal" class="modal modal--close">
  <div class="modal-content">
    <span class="close ls-exit-modal">×</span>
    <h1>Invite</h1>
    <p>Invite my baguette bot!</p>
  </div>
</div>
```
