$(document).ready(function () {
    $('#stable').DataTable({
        ajax:{
            url:"/api/services/all",
            dataSrc: ""
        },
        dom:'Bfrtip',
        buttons:[
            'pdf',
            'excel',
            {
                text:'Add Service',
                className: 'btn btn-primary',
                action: function(e, dt, node, config){
                    $("#sform").trigger("reset");
                    $('#serviceModal').modal('show');
                }
            }
        ],
        columns: [
        
            {data: 'id'},
            {data: 'description'},
            {   data:null,
                render: function (data, type, row){
                    console.log(data.service_image)
                    return '<img src="public/images/${data.service_image}" width="50" height="60">';
                }
            },
            {data: 'cost_price'},
            {data: 'sell_price'},

            {data: null,
                render: function (data, type, row) {
                    return "<a href='#' class = 'editBtn' id='editbtn' data-id=" + data.id + "><i class='fa-solid fa-pen-to-square' aria-hidden='true' style='font-size:24px' ></i></a><a href='#' class='deletebtn' data-id=" + data.id + "><i class='fa-sharp fa-solid fa-trash' style='font-size:24px; color:red'></a></i>";
                },
            },
        ],
        
    })

    //post
$("#serviceSubmit").on("click", function (e) {
    e.preventDefault();
    var data = $("#sform")[0];
    console.log(data);

    let formData = new FormData(data);

    console.log(formData);
    for (var pair of formData.entries()){
        console.log(pair[0] + ',' + pair[1]);
    }

    $.ajax({
        type: "POST",
        url: "/api/services/store",
        data:formData,
        contentType: false,
        processData: false,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        dataType:"json", 

        success:function(data){
               console.log(data);
               $("#serviceModal").modal("hide");

               var $stable = $('#stable').DataTable();
               $stable.row.add(data.service).draw(false); 
        },

        error:function (error){
            console.log(error);
        }
    })
});

});
