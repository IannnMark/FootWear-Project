$(document).ready(function () {
    $("#ctable").DataTable({
        ajax: {
            url: "/api/customer/all",
            dataSrc: "",
        },
        dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
        buttons: [
            {
                extend: "pdf",
                className: "btn btn-success glyphicon glyphicon-file",
            },
            {
                extend: "excel",
                className: "btn btn-success glyphicon glyphicon-list-alt",
            },
             {
                text: "Add Customer",
                className: "btn btn-success",
                action: function (e, dt, node, config) {
                    $("#cform").trigger("reset");
                    $("#customerModal").modal("show");
                },
            },
        
        ],
        columns: [
            {
                data: "id",
            },
            {
                data: "fname",
            },
            {
                data: "lname",
            },

            {
                data: "address",
            },
            {
                data: "town",
            },
            {
                data: "city",
            },
             {
                data: "phone",
            },
            {
                data: null,
                render: function (data, type, JsonResultRow, row) {
                    return `<img src= ${data.customer_image} "height="100px" width="100px">`;
                },
            },
              {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='editBtn' id='editbtn' data-id=" +
                        data.id +
                        "><i class='fa-solid fa-pen' aria-hidden='true' style='font-size:24px' ></i></a><a href='#' class='deletebtn' data-id=" + data.id + "><i class='fa-solid fa-trash-can' style='font-size:24px; color:red; margin-left:15px;'></a></i>";
                },
            },
        ],
    });

     $("#customerSubmit").on("click", function (e) {
        e.preventDefault();
        var data = $("#cform")[0];
        console.log(data);
        let formData = new FormData(data);
        console.log(formData);
        for (var pair of formData.entries()) {
            console.log(pair[0] + "," + pair[1]);
        }

        $.ajax({
            type: "POST",
            url: "/api/customer/store",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#customerModal").modal("hide");
                var $ctable = $("#ctable").DataTable();
                $ctable.row.add(data.customer).draw(false);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });


     $("#ctable tbody").on("click", "a.editBtn", function (e) {
        e.preventDefault();
        $("#customerModal").modal("show");
        var id = $(this).data("id");

        $.ajax({
            type: "GET",
            url: "/api/customer/" + id + "/edit",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#id").val(data.id);
                $("#fname").val(data.fname);
                $("#lname").val(data.lname);
                $("#address").val(data.address);
                $("#town").val(data.town);
                $("#city").val(data.city);
                $("#phone").val(data.phone);
            },
            error: function (error) {
                console.log("error");
            },
        });
    });

    $("#customerUpdate").on("click", function (e) {
        e.preventDefault();
        // var id = $(e.relatedTarget).attr("data-id");
        var id = $("#id").val();
        console.log(id);

        var crow = $("tr td:contains(" + id + ")").closest("tr");
        var table = $("#ctable").DataTable();
        var data = $("#cform")[0];
        console.log(data);
        let formData = new FormData(data);

        $.ajax({
            type: "PUT",
            url: "/api/customer/" + id,
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#customerModal").modal("hide");
                // table.row(crow).data(data).invalidate().draw(false);
                table.ajax.reload();
            },
            error: function (error) {
                console.log(error);
            },
        });
    });


    // $("#customer").hide();
    // $("#customers").on("click", function (e) {
    //     e.preventDefault();
    //     // $("#products").hide("slow");
    //     $("#customers").show();

    //     $.ajax({
    //         type: "GET",
    //         url: "/api/customer",
    //         dataType: "json",
    //         success: function (data) {
    //             console.log(data);
    //             $.each(data, function (key, value) {
    //                 console.log(value);
    //                 var id = value.id;
    //                 var tr = $("<tr>");
    //                 tr.append($("<td>").html(value.id));
    //                 tr.append($("<td>").html(value.fname));
    //                 tr.append($("<td>").html(value.lname));
    //                 tr.append($("<td>").html(value.address));
    //                 tr.append($("<td>").html(value.town));
    //                 tr.append($("<td>").html(value.city));
    //                 tr.append($("<td>").html(value.phone));
    //                 tr.append($("<td>").html(value.customer_image));
    //                 tr.append(
    //                     "<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#customerModal' id='editbtn' data-id=" +
    //                         id +
    //                         "><i class='fa fa-pencil' aria-hidden='true' style='font-size:24px' ></a></i></td>"
    //                 );
    //                 tr.append(
    //                     "<td><a href='#'  class='deletebtn' data-id=" +
    //                         id +
    //                         "><i  class='fa fa-trash' style='font-size:24px; color:red' ></a></i></td>"
    //                 );

    //                 $("#cbody").append(tr);
    //             });
    //         },
    //         error: function () {
    //             console.log("AJAX load did not work");
    //             alert("error");
    //         },
    //     });
    // });

    
    



    });