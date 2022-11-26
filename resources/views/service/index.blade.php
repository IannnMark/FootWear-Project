@include('layouts.master')
<br>
<div id="services" class="container">
     <button type="button" class="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#serviceModal"  >add<span  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
  <div  class="table-responsive">
    <table id="stable" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Service ID</th>
          <th>Description</th>
          <th>Image</th>
          <th>Sell Price</th>
          <th>Cost Price</th>
          <th>Action</th>
          </tr>
      </thead>
      <tbody id="sbody">
      </tbody>
    </table>
  </div>
</div>

<div class="modal fade" id="serviceModal" role="dialog" style="display:none">
  <div class="modal-dialog modal-lg" >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Service</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <form id="sform" method="#" action="#" enctype="multipart/form-data">

             <div class="form-group">
                  <label for="desc" class="control-label">Description</label>
                  <input type="text" class="form-control" id="description" name="description"  >
             </div>

             <div class="form-group"> 
                <label for="sell" class="control-label">Sell price</label>
                <input type="text" class="form-control " id="sell_price" name="sell_price">
              </div>

              <div class="form-group"> 
                <label for="cost" class="control-label">Cost Price</label>
                <input type="text" class="form-control " id="cost_price" name="cost_price" >
              </div>

              <div class="form-group"> 
                <label for="image" class="control-label">Image</label>
                <input type="file" class="form-control" id="uploads" name="uploads" />
               </div>
            </form>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button id="serviceSubmit" type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
  </div>
</div>

