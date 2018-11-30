const htmlBody = document.body.innerHTML
document.body.innerHTML = `<!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>`;
document.body.innerHTML += htmlBody